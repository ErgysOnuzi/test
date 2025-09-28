import express from 'express'
import { inMemoryStorage } from '../inMemoryStorage'

const router = express.Router()

// GET /api/menu - Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = inMemoryStorage.getAllMenuItems()
    console.log(`📋 Fetched ${items.length} menu items`)
    res.json(items)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return res.status(500).json({ error: 'Failed to fetch menu items' })
  }
})

// GET /api/menu/:id - Get specific menu item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const item = inMemoryStorage.getMenuItemById(parseInt(id))
    
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    res.json(item)
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
      allergens = '',
      imageUrl = null
    } = req.body

    if (!title || !price || !category) {
      return res.status(400).json({ error: 'Title, price, and category are required' })
    }

    const newItem = inMemoryStorage.createMenuItem({
      title,
      titleDe: titleDe || title,
      titleEn: titleEn || title,
      description: description || '',
      descriptionDe: descriptionDe || description || '',
      descriptionEn: descriptionEn || description || '',
      price: parseFloat(price),
      category,
      categoryDe: categoryDe || category,
      categoryEn: categoryEn || category,
      isAvailable,
      allergens,
      imageUrl
    })

    console.log(`📋 Created menu item: ${newItem.title}`)
    res.status(201).json(newItem)
  } catch (error) {
    console.error('Error creating menu item:', error)
    return res.status(500).json({ error: 'Failed to create menu item' })
  }
})

// PUT /api/menu/:id - Update menu item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedItem = inMemoryStorage.updateMenuItem(parseInt(id), updateData)
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    console.log(`📋 Updated menu item: ${updatedItem.title}`)
    res.json(updatedItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return res.status(500).json({ error: 'Failed to update menu item' })
  }
})

// DELETE /api/menu/:id - Delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = inMemoryStorage.deleteMenuItem(parseInt(id))
    
    if (!deleted) {
      return res.status(404).json({ error: 'Menu item not found' })
    }

    console.log(`📋 Deleted menu item ID: ${id}`)
    res.json({ message: 'Menu item deleted successfully' })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return res.status(500).json({ error: 'Failed to delete menu item' })
  }
})

export default router