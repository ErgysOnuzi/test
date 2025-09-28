import express from 'express'
import { eq } from 'drizzle-orm'
import db, { schema } from '../../src/lib/db'

const router = express.Router()

// GET /api/menu - Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await db.select().from(schema.menuItems)
    
    // Transform data to match expected format
    const transformedItems = items.map((item: any) => ({
      id: item.id,
      title: item.title || '',
      titleDe: item.titleDe || item.title || '',
      titleEn: item.titleEn || item.title || '',
      description: item.description || '',
      descriptionDe: item.descriptionDe || item.description || '',
      descriptionEn: item.descriptionEn || item.description || '',
      price: item.price,
      category: item.category || '',
      categoryDe: item.categoryDe || item.category || '',
      categoryEn: item.categoryEn || item.category || '',
      isAvailable: item.isAvailable || false,
      allergens: item.allergens || '',
      imageUrl: item.imageUrl || null,
    }))

    console.log(`📋 Fetched ${transformedItems.length} menu items`)
    res.json(transformedItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return res.status(500).json({ error: 'Failed to fetch menu items' })
  }
})

// GET /api/menu/:id - Get specific menu item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [item] = await db.select().from(schema.menuItems).where(eq(schema.menuItems.id, parseInt(id)))
    
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    // Transform data to match expected format
    const transformedItem = {
      id: item.id,
      title: item.title || '',
      titleDe: item.titleDe || item.title || '',
      titleEn: item.titleEn || item.title || '',
      description: item.description || '',
      descriptionDe: item.descriptionDe || item.description || '',
      descriptionEn: item.descriptionEn || item.description || '',
      price: item.price,
      category: item.category || '',
      categoryDe: item.categoryDe || item.category || '',
      categoryEn: item.categoryEn || item.category || '',
      isAvailable: item.isAvailable || false,
      allergens: item.allergens || '',
      imageUrl: item.imageUrl || null,
    }

    res.json(transformedItem)
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return res.status(500).json({ error: 'Failed to fetch menu item' })
  }
})

// POST /api/menu - Create new menu item
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      isAvailable = true,
      titleDe,
      titleEn,
      descriptionDe,
      descriptionEn,
      categoryDe,
      categoryEn,
      allergens,
      imageUrl
    } = req.body

    if (!title || !price || !category) {
      return res.status(400).json({ error: 'Title, price, and category are required' })
    }

    const [newItem] = await db.insert(schema.menuItems).values({
      title,
      description: description || '',
      price: parseFloat(price),
      category,
      isAvailable,
      titleDe: titleDe || title,
      titleEn: titleEn || title,
      descriptionDe: descriptionDe || description || '',
      descriptionEn: descriptionEn || description || '',
      categoryDe: categoryDe || category,
      categoryEn: categoryEn || category,
      allergens: allergens || '',
      imageUrl: imageUrl || null,
    }).returning()

    // Transform to match GET endpoint format
    const transformedItem = {
      id: newItem.id,
      title: newItem.title || '',
      titleDe: newItem.titleDe || newItem.title || '',
      titleEn: newItem.titleEn || newItem.title || '',
      description: newItem.description || '',
      descriptionDe: newItem.descriptionDe || newItem.description || '',
      descriptionEn: newItem.descriptionEn || newItem.description || '',
      price: newItem.price,
      category: newItem.category || '',
      categoryDe: newItem.categoryDe || newItem.category || '',
      categoryEn: newItem.categoryEn || newItem.category || '',
      isAvailable: newItem.isAvailable || false,
      allergens: newItem.allergens || '',
      imageUrl: newItem.imageUrl || null,
    }

    console.log(`🍝 Created new menu item: ${newItem.title}`)
    return res.status(201).json({
      success: true,
      item: transformedItem,
      message: 'Menu item created successfully'
    })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return res.status(500).json({ error: 'Failed to create menu item' })
  }
})

// PUT /api/menu/:id - Update menu item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      price,
      category,
      isAvailable,
      titleDe,
      titleEn,
      descriptionDe,
      descriptionEn,
      categoryDe,
      categoryEn,
      allergens,
      imageUrl
    } = req.body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = parseFloat(price)
    if (category !== undefined) updateData.category = category
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable
    if (titleDe !== undefined) updateData.titleDe = titleDe
    if (titleEn !== undefined) updateData.titleEn = titleEn
    if (descriptionDe !== undefined) updateData.descriptionDe = descriptionDe
    if (descriptionEn !== undefined) updateData.descriptionEn = descriptionEn
    if (categoryDe !== undefined) updateData.categoryDe = categoryDe
    if (categoryEn !== undefined) updateData.categoryEn = categoryEn
    if (allergens !== undefined) updateData.allergens = allergens
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl

    const [updatedItem] = await db
      .update(schema.menuItems)
      .set(updateData)
      .where(eq(schema.menuItems.id, parseInt(id)))
      .returning()

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    // Transform to match GET endpoint format
    const transformedItem = {
      id: updatedItem.id,
      title: updatedItem.title || '',
      titleDe: updatedItem.titleDe || updatedItem.title || '',
      titleEn: updatedItem.titleEn || updatedItem.title || '',
      description: updatedItem.description || '',
      descriptionDe: updatedItem.descriptionDe || updatedItem.description || '',
      descriptionEn: updatedItem.descriptionEn || updatedItem.description || '',
      price: updatedItem.price,
      category: updatedItem.category || '',
      categoryDe: updatedItem.categoryDe || updatedItem.category || '',
      categoryEn: updatedItem.categoryEn || updatedItem.category || '',
      isAvailable: updatedItem.isAvailable || false,
      allergens: updatedItem.allergens || '',
      imageUrl: updatedItem.imageUrl || null,
    }

    console.log(`🍝 Updated menu item: ${updatedItem.title}`)
    return res.json({
      success: true,
      item: transformedItem,
      message: 'Menu item updated successfully'
    })
  } catch (error) {
    console.error('Error updating menu item:', error)
    return res.status(500).json({ error: 'Failed to update menu item' })
  }
})

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const [deletedItem] = await db
      .delete(schema.menuItems)
      .where(eq(schema.menuItems.id, parseInt(id)))
      .returning()

    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    console.log(`🗑️ Deleted menu item: ${deletedItem.title}`)
    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return res.status(500).json({ error: 'Failed to delete menu item' })
  }
})

// PATCH /api/menu/:id/availability - Toggle menu item availability
router.patch('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params
    const { isAvailable } = req.body

    const [updatedItem] = await db
      .update(schema.menuItems)
      .set({ isAvailable })
      .where(eq(schema.menuItems.id, parseInt(id)))
      .returning()

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    // Transform to match GET endpoint format
    const transformedItem = {
      id: updatedItem.id,
      title: updatedItem.title || '',
      titleDe: updatedItem.titleDe || updatedItem.title || '',
      titleEn: updatedItem.titleEn || updatedItem.title || '',
      description: updatedItem.description || '',
      descriptionDe: updatedItem.descriptionDe || updatedItem.description || '',
      descriptionEn: updatedItem.descriptionEn || updatedItem.description || '',
      price: updatedItem.price,
      category: updatedItem.category || '',
      categoryDe: updatedItem.categoryDe || updatedItem.category || '',
      categoryEn: updatedItem.categoryEn || updatedItem.category || '',
      isAvailable: updatedItem.isAvailable || false,
      allergens: updatedItem.allergens || '',
      imageUrl: updatedItem.imageUrl || null,
    }

    console.log(`🔄 Toggled availability for: ${updatedItem.title} -> ${isAvailable}`)
    return res.json({
      success: true,
      item: transformedItem,
      message: `Menu item ${isAvailable ? 'enabled' : 'disabled'} successfully`
    })
  } catch (error) {
    console.error('Error toggling menu item availability:', error)
    return res.status(500).json({ error: 'Failed to update menu item availability' })
  }
})

export default router