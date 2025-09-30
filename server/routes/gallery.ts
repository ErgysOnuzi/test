import express from 'express'
import { db } from '../db'
import { gallery } from '../../shared/schema'
import { eq } from 'drizzle-orm'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth, requireAuthWithCSRF } from './admin'

// GET /api/gallery - Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await db.select().from(gallery).where(eq(gallery.isActive, true))
    
    // Transform to match expected API format
    const transformedImages = images.map(img => ({
      id: img.id,
      title: img.alt || '',
      description: img.description || '',
      imageUrl: img.imageUrl,
      category: img.category || 'atmosphere',
      altText: img.alt || '',
      uploadedAt: img.createdAt?.toISOString() || new Date().toISOString(),
      isVisible: img.isActive,
      sortOrder: img.sortOrder || 0
    }))
    
    console.log(`🖼️ Fetched ${transformedImages.length} gallery images`)
    res.json(transformedImages)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return res.status(500).json({ error: 'Failed to fetch gallery images' })
  }
})

// GET /api/gallery/:id - Get specific gallery image
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const images = await db.select().from(gallery).where(eq(gallery.id, parseInt(id)))
    
    if (images.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    const img = images[0]
    // Transform to match expected API format
    const transformedImage = {
      id: img.id,
      title: img.alt || '',
      description: img.description || '',
      imageUrl: img.imageUrl,
      category: img.category || 'atmosphere',
      altText: img.alt || '',
      uploadedAt: img.createdAt?.toISOString() || new Date().toISOString(),
      isVisible: img.isActive,
      sortOrder: img.sortOrder || 0
    }

    res.json(transformedImage)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return res.status(500).json({ error: 'Failed to fetch gallery image' })
  }
})

// POST /api/gallery - Upload new gallery image
router.post('/', requireAuthWithCSRF, async (req, res) => {
  try {
    const {
      imageUrl,
      description = '',
      altText = '',
      category = 'atmosphere',
      isVisible = true,
      sortOrder = 0
    } = req.body

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' })
    }

    const insertResult = await db.insert(gallery).values({
      imageUrl,
      description,
      alt: altText || `Image ${Date.now()}`,
      category,
      isActive: isVisible,
      sortOrder
    }).returning()

    const newImage = insertResult[0]
    
    // Transform to match expected API format
    const transformedImage = {
      id: newImage.id,
      title: newImage.alt || '',
      description: newImage.description || '',
      imageUrl: newImage.imageUrl,
      category: newImage.category || 'atmosphere',
      altText: newImage.alt || '',
      uploadedAt: newImage.createdAt?.toISOString() || new Date().toISOString(),
      isVisible: newImage.isActive,
      sortOrder: newImage.sortOrder || 0
    }

    console.log(`🖼️ Created gallery image: ${transformedImage.title}`)
    res.status(201).json(transformedImage)
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return res.status(500).json({ error: 'Failed to create gallery image' })
  }
})

// PUT /api/gallery/:id - Update gallery image
router.put('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const {
      imageUrl,
      description,
      altText,
      category,
      isVisible,
      sortOrder
    } = req.body

    // Build update object with only defined values and map field names
    const updateData: any = { updatedAt: new Date() }
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
    if (description !== undefined) updateData.description = description
    if (altText !== undefined) updateData.alt = altText
    if (category !== undefined) updateData.category = category
    if (isVisible !== undefined) updateData.isActive = isVisible
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder

    const updateResult = await db.update(gallery)
      .set(updateData)
      .where(eq(gallery.id, parseInt(id)))
      .returning()
    
    if (updateResult.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    const updatedImage = updateResult[0]
    
    // Transform to match expected API format
    const transformedImage = {
      id: updatedImage.id,
      title: updatedImage.alt || '',
      description: updatedImage.description || '',
      imageUrl: updatedImage.imageUrl,
      category: updatedImage.category || 'atmosphere',
      altText: updatedImage.alt || '',
      uploadedAt: updatedImage.createdAt?.toISOString() || new Date().toISOString(),
      isVisible: updatedImage.isActive,
      sortOrder: updatedImage.sortOrder || 0
    }

    console.log(`🖼️ Updated gallery image: ${transformedImage.title}`)
    res.json(transformedImage)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return res.status(500).json({ error: 'Failed to update gallery image' })
  }
})

// DELETE /api/gallery/:id - Delete gallery image
router.delete('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const deleteResult = await db.delete(gallery)
      .where(eq(gallery.id, parseInt(id)))
      .returning()
    
    if (deleteResult.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    console.log(`🖼️ Deleted gallery image ID: ${id}`)
    res.json({ message: 'Gallery image deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return res.status(500).json({ error: 'Failed to delete gallery image' })
  }
})

// PATCH /api/gallery/:id/toggle - Toggle gallery image visibility
router.patch('/:id/toggle', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    
    // First get the current state
    const currentImages = await db.select().from(gallery).where(eq(gallery.id, parseInt(id)))
    
    if (currentImages.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    const currentImage = currentImages[0]
    const newVisibility = !currentImage.isActive
    
    // Update the visibility
    const updateResult = await db.update(gallery)
      .set({ 
        isActive: newVisibility,
        updatedAt: new Date()
      })
      .where(eq(gallery.id, parseInt(id)))
      .returning()

    const updatedImage = updateResult[0]
    
    console.log(`🖼️ Toggled gallery image visibility: ${updatedImage.alt || 'Unknown'}`)
    res.json({
      success: true,
      message: `Gallery image ${updatedImage.isActive ? 'shown' : 'hidden'} successfully`
    })
  } catch (error) {
    console.error('Error toggling gallery image visibility:', error)
    return res.status(500).json({ error: 'Failed to update gallery image visibility' })
  }
})

export default router
