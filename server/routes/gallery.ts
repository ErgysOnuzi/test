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
      title: image.alt || `Image ${image.id}`, // Use alt as title since gallery has no title field
      description: image.description || '',
      imageUrl: image.imageUrl || '', // Use imageUrl from Drizzle schema
      category: image.category || 'atmosphere',
      altText: image.alt || '', // Use alt from schema
      uploadedAt: image.createdAt, // Use createdAt from schema  
      isVisible: image.isActive !== undefined ? image.isActive : true, // Use isActive from schema
      sortOrder: image.sortOrder || 0,
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
    const [image] = await db.select().from(schema.gallery).where(eq(schema.gallery.id, parseInt(id)))
    
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    // Transform data to match expected format
    const transformedImage = {
      id: image.id,
      title: image.alt || `Image ${image.id}`, // Use alt as title since gallery has no title field
      description: image.description || '',
      imageUrl: image.imageUrl || '', // Fixed: use imageUrl from Drizzle schema
      category: image.category || 'atmosphere',
      altText: image.alt || '', // Fixed: use alt from schema
      uploadedAt: image.createdAt, // Fixed: use createdAt from schema
      isVisible: image.isActive !== undefined ? image.isActive : true, // Fixed: preserve actual isActive value
      sortOrder: image.sortOrder || 0,
    }

    res.json(transformedImage)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return res.status(500).json({ error: 'Failed to fetch gallery image' })
  }
})

// POST /api/gallery - Upload new gallery image
router.post('/', async (req, res) => {
  try {
    const {
      imageUrl,
      description,
      alt,
      category = 'atmosphere',
      isActive = true,
      sortOrder = 0
    } = req.body

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' })
    }

    const [newImage] = await db.insert(schema.gallery).values({
      imageUrl,
      description: description || '',
      alt: alt || '',
      category,
      isActive,
      sortOrder,
    }).returning()

    // Transform to match GET endpoint format
    const transformedImage = {
      id: newImage.id,
      title: newImage.alt || `Image ${newImage.id}`,
      description: newImage.description || '',
      imageUrl: newImage.imageUrl || '',
      category: newImage.category || 'atmosphere',
      altText: newImage.alt || '',
      uploadedAt: newImage.createdAt,
      isVisible: newImage.isActive !== undefined ? newImage.isActive : true,
      sortOrder: newImage.sortOrder || 0,
    }

    console.log(`📸 Uploaded new gallery image: ${newImage.alt || newImage.id}`)
    return res.status(201).json({
      success: true,
      image: transformedImage,
      message: 'Gallery image uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading gallery image:', error)
    return res.status(500).json({ error: 'Failed to upload gallery image' })
  }
})

// PUT /api/gallery/:id - Update gallery image
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      imageUrl,
      description,
      alt,
      category,
      isActive,
      sortOrder
    } = req.body

    const updateData: any = {}
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
    if (description !== undefined) updateData.description = description
    if (alt !== undefined) updateData.alt = alt
    if (category !== undefined) updateData.category = category
    if (isActive !== undefined) updateData.isActive = isActive
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder

    const [updatedImage] = await db
      .update(schema.gallery)
      .set(updateData)
      .where(eq(schema.gallery.id, parseInt(id)))
      .returning()

    if (!updatedImage) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    // Transform to match GET endpoint format
    const transformedImage = {
      id: updatedImage.id,
      title: updatedImage.alt || `Image ${updatedImage.id}`,
      description: updatedImage.description || '',
      imageUrl: updatedImage.imageUrl || '',
      category: updatedImage.category || 'atmosphere',
      altText: updatedImage.alt || '',
      uploadedAt: updatedImage.createdAt,
      isVisible: updatedImage.isActive !== undefined ? updatedImage.isActive : true,
      sortOrder: updatedImage.sortOrder || 0,
    }

    console.log(`📸 Updated gallery image: ${updatedImage.alt || updatedImage.id}`)
    return res.json({
      success: true,
      image: transformedImage,
      message: 'Gallery image updated successfully'
    })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return res.status(500).json({ error: 'Failed to update gallery image' })
  }
})

// DELETE /api/gallery/:id - Delete gallery image
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const [deletedImage] = await db
      .delete(schema.gallery)
      .where(eq(schema.gallery.id, parseInt(id)))
      .returning()

    if (!deletedImage) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    console.log(`🗑️ Deleted gallery image: ${deletedImage.alt || deletedImage.id}`)
    res.json({
      success: true,
      message: 'Gallery image deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return res.status(500).json({ error: 'Failed to delete gallery image' })
  }
})

// PATCH /api/gallery/:id/visibility - Toggle gallery image visibility
router.patch('/:id/visibility', async (req, res) => {
  try {
    const { id } = req.params
    const { isActive } = req.body

    const [updatedImage] = await db
      .update(schema.gallery)
      .set({ isActive })
      .where(eq(schema.gallery.id, parseInt(id)))
      .returning()

    if (!updatedImage) {
      return res.status(404).json({ error: 'Gallery image not found' })
    }

    // Transform to match GET endpoint format
    const transformedImage = {
      id: updatedImage.id,
      title: updatedImage.alt || `Image ${updatedImage.id}`,
      description: updatedImage.description || '',
      imageUrl: updatedImage.imageUrl || '',
      category: updatedImage.category || 'atmosphere',
      altText: updatedImage.alt || '',
      uploadedAt: updatedImage.createdAt,
      isVisible: updatedImage.isActive !== undefined ? updatedImage.isActive : true,
      sortOrder: updatedImage.sortOrder || 0,
    }

    console.log(`🔄 Toggled visibility for gallery image: ${updatedImage.alt || updatedImage.id} -> ${isActive}`)
    return res.json({
      success: true,
      image: transformedImage,
      message: `Gallery image ${isActive ? 'shown' : 'hidden'} successfully`
    })
  } catch (error) {
    console.error('Error toggling gallery image visibility:', error)
    return res.status(500).json({ error: 'Failed to update gallery image visibility' })
  }
})

export default router