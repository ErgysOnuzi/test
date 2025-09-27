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
    res.status(500).json({ error: 'Failed to fetch menu items' })
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
    res.status(500).json({ error: 'Failed to fetch menu item' })
  }
})

export default router