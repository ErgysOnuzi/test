// In-memory storage implementation for when database is not available
// This provides a working fallback for all restaurant data
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface MenuItem {
  id: number
  title: string
  titleDe: string
  titleEn: string
  description: string
  descriptionDe: string
  descriptionEn: string
  price: number
  category: string
  categoryDe: string
  categoryEn: string
  isAvailable: boolean
  allergens: string
  imageUrl: string | null
}

interface GalleryItem {
  id: number
  title: string
  description: string
  imageUrl: string
  category: string
  altText: string
  uploadedAt: string
  isVisible: boolean
  sortOrder: number
}

interface Event {
  id: number
  title_de: string
  title_en: string
  description_de: string
  description_en: string
  event_date: string
  price: number
  max_attendees: number
  current_attendees: number
  created_at: string
}

class InMemoryStorage {
  private menuItems: MenuItem[] = []
  private galleryItems: GalleryItem[] = []
  private events: Event[] = []
  private nextMenuId = 1
  private nextGalleryId = 1
  private nextEventId = 1

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // Load actual restaurant data from files
    this.loadMenuData()
    this.loadGalleryData()
    this.events = [] // No events data available
  }

  private loadMenuData() {
    try {
      const menuPath = resolve(process.cwd(), 'attached_assets/menu_items_1758762047242.json')
      const menuData = JSON.parse(readFileSync(menuPath, 'utf8'))
      
      this.menuItems = menuData.map((item: any) => ({
        id: item.id,
        title: item.title,
        titleDe: item.title_de || item.title,
        titleEn: item.title_en || item.title,
        description: item.description,
        descriptionDe: item.description_de || item.description,
        descriptionEn: item.description_en || item.description,
        price: item.price,
        category: item.category,
        categoryDe: item.category_de || item.category,
        categoryEn: item.category_en || item.category,
        isAvailable: item.is_available ?? true,
        allergens: item.allergens || '',
        imageUrl: item.image_url
      }))
      
      this.nextMenuId = Math.max(...this.menuItems.map(item => item.id)) + 1
      console.log(`✅ Loaded ${this.menuItems.length} authentic menu items`)
    } catch (error) {
      console.log('⚠️ Could not load menu data, using empty menu:', error)
      this.menuItems = []
    }
  }

  private loadGalleryData() {
    try {
      import('fs').then(({ readdirSync }) => {
        const galleryPath = resolve(process.cwd(), 'public/uploads/gallery')
        const imageFiles = readdirSync(galleryPath).filter(file => 
          /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        )
        
        this.galleryItems = imageFiles.map((filename, index) => ({
          id: index + 1,
          title: `Gallery Image ${index + 1}`,
          description: `Restaurant photo from La Cantina Berlin`,
          imageUrl: `/uploads/gallery/${filename}`,
          category: 'restaurant',
          altText: `La Cantina Berlin - Gallery Image ${index + 1}`,
          uploadedAt: new Date().toISOString(),
          isVisible: true,
          sortOrder: index
        }))
        
        this.nextGalleryId = this.galleryItems.length + 1
        console.log(`✅ Loaded ${this.galleryItems.length} gallery images from uploads folder`)
      }).catch(() => {
        // Fallback to synchronous loading
        this.loadGalleryDataSync()
      })
    } catch (error) {
      console.log('⚠️ Could not load gallery data, trying sync method')
      this.loadGalleryDataSync()
    }
  }

  private loadGalleryDataSync() {
    try {
      const { readdirSync } = require('fs')
      const galleryPath = resolve(process.cwd(), 'public/uploads/gallery')
      const imageFiles = readdirSync(galleryPath).filter((file: string) => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      )
      
      this.galleryItems = imageFiles.map((filename: string, index: number) => ({
        id: index + 1,
        title: `Gallery Image ${index + 1}`,
        description: `Restaurant photo from La Cantina Berlin`,
        imageUrl: `/uploads/gallery/${filename}`,
        category: 'restaurant',
        altText: `La Cantina Berlin - Gallery Image ${index + 1}`,
        uploadedAt: new Date().toISOString(),
        isVisible: true,
        sortOrder: index
      }))
      
      this.nextGalleryId = this.galleryItems.length + 1
      console.log(`✅ Loaded ${this.galleryItems.length} gallery images from uploads folder`)
    } catch (error) {
      console.log('⚠️ Could not load gallery data, using empty gallery:', error)
      this.galleryItems = []
    }
  }

  // Menu operations
  getAllMenuItems(): MenuItem[] {
    return this.menuItems
  }

  getMenuItemById(id: number): MenuItem | undefined {
    return this.menuItems.find(item => item.id === id)
  }

  createMenuItem(data: Omit<MenuItem, 'id'>): MenuItem {
    const newItem: MenuItem = {
      id: this.nextMenuId++,
      ...data
    }
    this.menuItems.push(newItem)
    return newItem
  }

  updateMenuItem(id: number, data: Partial<MenuItem>): MenuItem | null {
    const index = this.menuItems.findIndex(item => item.id === id)
    if (index === -1) return null
    
    this.menuItems[index] = { ...this.menuItems[index], ...data, id }
    return this.menuItems[index]
  }

  deleteMenuItem(id: number): boolean {
    const index = this.menuItems.findIndex(item => item.id === id)
    if (index === -1) return false
    
    this.menuItems.splice(index, 1)
    return true
  }

  // Gallery operations
  getAllGalleryItems(): GalleryItem[] {
    return this.galleryItems.filter(item => item.isVisible)
  }

  getGalleryItemById(id: number): GalleryItem | undefined {
    return this.galleryItems.find(item => item.id === id)
  }

  createGalleryItem(data: Omit<GalleryItem, 'id'>): GalleryItem {
    const newItem: GalleryItem = {
      id: this.nextGalleryId++,
      ...data
    }
    this.galleryItems.push(newItem)
    return newItem
  }

  updateGalleryItem(id: number, data: Partial<GalleryItem>): GalleryItem | null {
    const index = this.galleryItems.findIndex(item => item.id === id)
    if (index === -1) return null
    
    this.galleryItems[index] = { ...this.galleryItems[index], ...data, id }
    return this.galleryItems[index]
  }

  deleteGalleryItem(id: number): boolean {
    const index = this.galleryItems.findIndex(item => item.id === id)
    if (index === -1) return false
    
    this.galleryItems.splice(index, 1)
    return true
  }

  // Event operations
  getAllEvents(): Event[] {
    return this.events
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(event => event.id === id)
  }

  createEvent(data: Omit<Event, 'id'>): Event {
    const newEvent: Event = {
      id: this.nextEventId++,
      ...data
    }
    this.events.push(newEvent)
    return newEvent
  }

  updateEvent(id: number, data: Partial<Event>): Event | null {
    const index = this.events.findIndex(event => event.id === id)
    if (index === -1) return null
    
    this.events[index] = { ...this.events[index], ...data, id }
    return this.events[index]
  }

  deleteEvent(id: number): boolean {
    const index = this.events.findIndex(event => event.id === id)
    if (index === -1) return false
    
    this.events.splice(index, 1)
    return true
  }
}

// Export singleton instance
export const inMemoryStorage = new InMemoryStorage()