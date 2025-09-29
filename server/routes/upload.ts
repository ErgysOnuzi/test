import express, { Request, Response } from 'express'
import crypto from 'crypto'
import { 
  uploadMiddleware, 
  createImageUploadHandler,
  ImageProcessor,
} from '../services/imageUpload'
import { requireAuthWithCSRF } from './admin'

const router = express.Router()

// POST /api/upload/image - Secure image upload endpoint
router.post('/image', requireAuthWithCSRF, uploadMiddleware.single('image'), createImageUploadHandler(), async (req: Request & { processedImage?: any }, res: Response) => {
  try {
    const { processedImage } = req

    if (!processedImage) {
      return res.status(500).json({ error: 'Failed to process image' })
    }

    console.log(`📸 Image uploaded: ${processedImage.filename} (${processedImage.size} bytes, ${processedImage.width}x${processedImage.height})`)

    res.status(201).json({
      success: true,
      image: {
        filename: processedImage.filename,
        url: processedImage.url,
        size: processedImage.size,
        width: processedImage.width,
        height: processedImage.height,
      },
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    console.error('Upload route error:', error)
    res.status(500).json({ 
      error: 'Failed to upload image',
      traceId: crypto.randomUUID(),
    })
  }
})

// DELETE /api/upload/image/:filename - Delete uploaded image
router.delete('/image/:filename', requireAuthWithCSRF, async (req: Request, res: Response) => {
  try {
    const { filename } = req.params

    // Validate filename format (security check)
    if (!/^[0-9]+_[a-f0-9-]+_[a-f0-9]+\.webp$/i.test(filename)) {
      return res.status(400).json({ error: 'Invalid filename format' })
    }

    const deleted = await ImageProcessor.deleteImage(filename)
    
    if (!deleted) {
      return res.status(404).json({ error: 'Image not found' })
    }

    console.log(`🗑️ Image deleted: ${filename}`)
    res.json({
      success: true,
      message: 'Image deleted successfully'
    })
  } catch (error) {
    console.error('Delete image error:', error)
    res.status(500).json({ 
      error: 'Failed to delete image',
      traceId: crypto.randomUUID(),
    })
  }
})

export default router