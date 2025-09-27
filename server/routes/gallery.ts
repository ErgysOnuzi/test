import express from 'express'
import { eq } from 'drizzle-orm'
import db, { schema } from '../../src/lib/db'

const router = express.Router()

// GET /api/gallery - Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await db.select().from(schema.gallery)
    
    // Transform data to match expected format - use proper field names from Drizzle schema
    const transformedImages = images.map((image: any) => ({
      id: image.id,
      title: image.title || '',
      titleDe: image.title_de || image.title || '',
      titleEn: image.title_en || image.title || '',
      description: image.description || '',
      descriptionDe: image.description_de || image.description || '',
      descriptionEn: image.description_en || image.description || '',
      imageUrl: image.imageUrl || '', // Use imageUrl from Drizzle schema
      category: image.category || 'atmosphere',
      altText: image.alt || '', // Use alt from schema
      uploadedAt: image.createdAt, // Use createdAt from schema  
      isVisible: image.isActive !== undefined ? image.isActive : true, // Use isActive from schema
    }))
    console.log(`🖼️ Fetched ${transformedImages.length} gallery images`)
    res.json(transformedImages)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    res.status(500).json({ error: 'Failed to fetch gallery images' })
  }
})

// GET /api/gallery/:id - Get specific gallery image
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [image] = await db.select().from(schema.gallery).where(eq(schema.gallery.id, parseInt(id)))
    
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    // Transform data to match expected format
    const transformedImage = {
      id: image.id,
      title: image.title || '',
      titleDe: image.title_de || image.title || '',
      titleEn: image.title_en || image.title || '',
      description: image.description || '',
      descriptionDe: image.description_de || image.description || '',
      descriptionEn: image.description_en || image.description || '',
      imageUrl: image.imageUrl || '', // Fixed: use imageUrl from Drizzle schema
      category: image.category || 'atmosphere',
      altText: image.alt || '', // Fixed: use alt from schema
      uploadedAt: image.createdAt, // Fixed: use createdAt from schema
      isVisible: image.isActive || true, // Fixed: use isActive from schema
    }

    res.json(transformedImage)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    res.status(500).json({ error: 'Failed to fetch gallery image' })
  }
})

export default router