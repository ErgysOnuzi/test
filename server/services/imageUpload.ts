import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import sharp from 'sharp'
import multer from 'multer'
import { Request, Response, NextFunction } from 'express'

// Image upload configuration
export const IMAGE_CONFIG = {
  maxFileSize: 2 * 1024 * 1024, // 2MB
  maxWidth: 2048,
  maxHeight: 2048,
  quality: 85,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'] as const,
  uploadDir: path.join(process.cwd(), 'uploads'),
}

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(IMAGE_CONFIG.uploadDir)
  } catch {
    await fs.mkdir(IMAGE_CONFIG.uploadDir, { recursive: true })
  }
}

// Magic byte signatures for image validation
const IMAGE_SIGNATURES = {
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF], // JPEG
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47], // PNG
  ],
  'image/webp': [
    [0x52, 0x49, 0x46, 0x46], // RIFF (WebP container)
  ],
} as const

// Validate file magic bytes
function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures = IMAGE_SIGNATURES[mimeType as keyof typeof IMAGE_SIGNATURES]
  if (!signatures) return false

  return signatures.some(signature => {
    if (buffer.length < signature.length) return false
    return signature.every((byte, index) => buffer[index] === byte)
  })
}

// Generate secure random filename
function generateSecureFilename(originalExtension: string): string {
  const uuid = crypto.randomUUID()
  const timestamp = Date.now()
  const random = crypto.randomBytes(4).toString('hex')
  return `${timestamp}_${uuid}_${random}.webp`
}

// Image validation and security checks
export class ImageValidator {
  static async validateFile(file: Express.Multer.File): Promise<{ isValid: boolean; error?: string }> {
    // Check file size
    if (file.size > IMAGE_CONFIG.maxFileSize) {
      return { isValid: false, error: `File too large. Maximum size is ${IMAGE_CONFIG.maxFileSize / (1024 * 1024)}MB` }
    }

    // Check MIME type
    if (!IMAGE_CONFIG.allowedMimeTypes.includes(file.mimetype as any)) {
      return { isValid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed' }
    }

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase()
    if (!IMAGE_CONFIG.allowedExtensions.includes(ext as any)) {
      return { isValid: false, error: 'Invalid file extension' }
    }

    // Magic byte validation
    if (!validateMagicBytes(file.buffer, file.mimetype)) {
      return { isValid: false, error: 'File content does not match declared type' }
    }

    // Additional sharp validation (will throw if corrupted)
    try {
      const metadata = await sharp(file.buffer).metadata()
      
      // Check dimensions
      if (metadata.width && metadata.width > IMAGE_CONFIG.maxWidth) {
        return { isValid: false, error: `Image width too large. Maximum is ${IMAGE_CONFIG.maxWidth}px` }
      }
      
      if (metadata.height && metadata.height > IMAGE_CONFIG.maxHeight) {
        return { isValid: false, error: `Image height too large. Maximum is ${IMAGE_CONFIG.maxHeight}px` }
      }

      // Check for suspicious metadata or embedded content
      if (metadata.exif && metadata.exif.length > 1024) {
        console.warn('Image contains large EXIF data, will be stripped')
      }

    } catch (error) {
      return { isValid: false, error: 'Invalid or corrupted image file' }
    }

    return { isValid: true }
  }
}

// Image processing service
export class ImageProcessor {
  static async processImage(file: Express.Multer.File): Promise<{ 
    filename: string; 
    path: string; 
    size: number; 
    width: number; 
    height: number; 
  }> {
    await ensureUploadDir()

    const filename = generateSecureFilename(path.extname(file.originalname))
    const filepath = path.join(IMAGE_CONFIG.uploadDir, filename)

    // Process image: convert to WebP, strip EXIF, optimize
    const processedBuffer = await sharp(file.buffer)
      .webp({ 
        quality: IMAGE_CONFIG.quality,
        effort: 4, // Better compression
      })
      .resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .removeAlpha() // Remove alpha channel if not needed
      .toBuffer()

    // Get processed image metadata
    const metadata = await sharp(processedBuffer).metadata()

    // Save processed image
    await fs.writeFile(filepath, processedBuffer)

    return {
      filename,
      path: filepath,
      size: processedBuffer.length,
      width: metadata.width || 0,
      height: metadata.height || 0,
    }
  }

  static async deleteImage(filename: string): Promise<boolean> {
    try {
      const filepath = path.join(IMAGE_CONFIG.uploadDir, filename)
      await fs.unlink(filepath)
      return true
    } catch (error) {
      console.error('Failed to delete image:', error)
      return false
    }
  }
}

// Multer configuration for memory storage
export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: IMAGE_CONFIG.maxFileSize,
    files: 1,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!IMAGE_CONFIG.allowedMimeTypes.includes(file.mimetype as any)) {
      cb(new Error('Invalid file type'))
      return
    }
    cb(null, true)
  },
})

// Express middleware for secure image upload
export function createImageUploadHandler() {
  return async (req: Request & { file?: Express.Multer.File; processedImage?: any }, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      // Validate the uploaded file
      const validation = await ImageValidator.validateFile(req.file)
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error })
      }

      // Process the image
      const processedImage = await ImageProcessor.processImage(req.file)

      // Add processed image info to request
      req.processedImage = {
        filename: processedImage.filename,
        path: processedImage.path,
        size: processedImage.size,
        width: processedImage.width,
        height: processedImage.height,
        url: `/uploads/${processedImage.filename}`,
      }

      next()
    } catch (error: any) {
      console.error('Image upload error:', error)
      res.status(500).json({ 
        error: 'Failed to process image',
        traceId: crypto.randomUUID(),
      })
    }
  }
}