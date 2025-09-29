import express from 'express'
import { inMemoryStorage } from '../inMemoryStorage'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth } from './admin'

// GET /api/gallery - Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = inMemoryStorage.getAllGalleryItems()
    console.log(`🖼️ Fetched ${images.length} gallery images`)
    res.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return res.status(500).json({ error: 'Failed to fetch gallery images' })
  }
})

// GET /api/gallery/:id - Get specific gallery image
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const image = inMemoryStorage.getGalleryItemById(parseInt(id))
    
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    res.json(image)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return res.status(500).json({ error: 'Failed to fetch gallery image' })
  }
})

// POST /api/gallery - Upload new gallery image
router.post('/', requireAuth, async (req, res) => {
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

    const newImage = inMemoryStorage.createGalleryItem({
      title: altText || `Image ${Date.now()}`,
      description,
      imageUrl,
      category,
      altText,
      uploadedAt: new Date().toISOString(),
      isVisible,
      sortOrder
    })

    console.log(`🖼️ Created gallery image: ${newImage.title}`)
    res.status(201).json(newImage)
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return res.status(500).json({ error: 'Failed to create gallery image' })
  }
})

// PUT /api/gallery/:id - Update gallery image
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedImage = inMemoryStorage.updateGalleryItem(parseInt(id), updateData)
    
    if (!updatedImage) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    console.log(`🖼️ Updated gallery image: ${updatedImage.title}`)
    res.json(updatedImage)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return res.status(500).json({ error: 'Failed to update gallery image' })
  }
})

// DELETE /api/gallery/:id - Delete gallery image
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deleted = inMemoryStorage.deleteGalleryItem(parseInt(id))
    
    if (!deleted) {
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
router.patch('/:id/toggle', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const image = inMemoryStorage.getGalleryItemById(parseInt(id))
    
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    const updatedImage = inMemoryStorage.updateGalleryItem(parseInt(id), {
      isVisible: !image.isVisible
    })

    console.log(`🖼️ Toggled gallery image visibility: ${updatedImage?.title}`)
    res.json({
      success: true,
      message: `Gallery image ${updatedImage?.isVisible ? 'shown' : 'hidden'} successfully`
    })
  } catch (error) {
    console.error('Error toggling gallery image visibility:', error)
    return res.status(500).json({ error: 'Failed to update gallery image visibility' })
  }
})

export default router