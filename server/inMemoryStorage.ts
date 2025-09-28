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
    this.loadSampleEvents()
  }

  private loadSampleEvents() {
    // Create authentic Italian restaurant events
    this.events = [
      {
        id: 1,
        title_de: "Italienische Weinverkostung",
        title_en: "Italian Wine Tasting Evening",
        description_de: "Entdecken Sie die besten italienischen Weine aus Toskana, Piemont und Venetien. Ein unvergesslicher Abend mit Weinexperten, begleitet von authentischen italienischen Appetizern.",
        description_en: "Discover the finest Italian wines from Tuscany, Piedmont, and Veneto. An unforgettable evening with wine experts, accompanied by authentic Italian appetizers and live music.",
        event_date: "2025-10-15T19:00:00",
        price: 45,
        max_attendees: 25,
        current_attendees: 12,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title_de: "Pasta-Kochkurs mit Chef Antonio",
        title_en: "Pasta Making Workshop with Chef Antonio",
        description_de: "Lernen Sie die Geheimnisse der handgemachten Pasta direkt von unserem Chefkoch Antonio. Inklusive 3-Gänge-Menü und italienischem Wein.",
        description_en: "Learn the secrets of handmade pasta directly from our head chef Antonio. Includes hands-on pasta making, 3-course meal, and Italian wine pairing.",
        event_date: "2025-10-22T18:30:00",
        price: 65,
        max_attendees: 16,
        current_attendees: 8,
        created_at: new Date().toISOString()
      }
    ]
    this.nextEventId = 3
    console.log(`✅ Loaded ${this.events.length} sample events`)
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

  private generateIntelligentMetadata(filename: string, index: number) {
    const lower = filename.toLowerCase()
    
    // Analyze filename patterns for intelligent categorization
    let category = 'restaurant'
    let title = ''
    let description = ''
    let altText = ''
    
    // Determine image type based on context clues
    if (lower.includes('food') || lower.includes('dish') || lower.includes('pizza') || lower.includes('pasta')) {
      category = 'food'
      title = `Authentic Italian Cuisine`
      description = `Fresh, handcrafted Italian dishes prepared with traditional recipes at La Cantina Berlin`
      altText = `Delicious Italian food served at La Cantina Berlin restaurant`
    } else if (lower.includes('interior') || lower.includes('dining') || lower.includes('table')) {
      category = 'interior'
      title = `Warm Italian Atmosphere`
      description = `Cozy dining area with authentic Italian ambiance and traditional decor`
      altText = `Interior view of La Cantina Berlin dining room with warm atmosphere`
    } else if (lower.includes('bar') || lower.includes('wine') || lower.includes('drink')) {
      category = 'bar'
      title = `Italian Wine & Bar`
      description = `Extensive selection of Italian wines and traditional aperitivos`
      altText = `Bar area at La Cantina Berlin with Italian wines and drinks`
    } else if (lower.includes('kitchen') || lower.includes('chef')) {
      category = 'kitchen'
      title = `Authentic Italian Kitchen`
      description = `Traditional Italian cooking methods and fresh ingredients`
      altText = `Kitchen at La Cantina Berlin where authentic Italian dishes are prepared`
    } else if (lower.includes('exterior') || lower.includes('outside') || lower.includes('front')) {
      category = 'exterior'
      title = `La Cantina Berlin Entrance`
      description = `Welcoming exterior of our authentic Italian restaurant in Berlin`
      altText = `Exterior view of La Cantina Berlin restaurant`
    } else {
      // Default restaurant atmosphere based on sequence
      const atmosphereTypes = [
        { title: 'Cozy Italian Dining', desc: 'Intimate dining space with warm lighting and traditional Italian charm', alt: 'Cozy dining atmosphere at La Cantina Berlin' },
        { title: 'Authentic Restaurant Interior', desc: 'Traditional Italian restaurant design with rustic elements and warm colors', alt: 'Authentic interior design at La Cantina Berlin' },
        { title: 'Italian Culinary Experience', desc: 'Experience the taste of Italy in the heart of Berlin', alt: 'Italian dining experience at La Cantina Berlin' },
        { title: 'Traditional Italian Ambiance', desc: 'Classic Italian restaurant atmosphere with attention to authentic details', alt: 'Traditional Italian restaurant ambiance in Berlin' },
        { title: 'Warm Restaurant Setting', desc: 'Inviting space where families and friends gather for authentic Italian meals', alt: 'Warm and inviting atmosphere at La Cantina Berlin' }
      ]
      
      const typeIndex = index % atmosphereTypes.length
      const type = atmosphereTypes[typeIndex]
      
      title = type?.title || `Restaurant Photo ${index + 1}`
      description = type?.desc || `Authentic Italian restaurant atmosphere at La Cantina Berlin`
      altText = type?.alt || `La Cantina Berlin restaurant photo ${index + 1}`
      category = 'atmosphere'
    }
    
    return { title, description, altText, category }
  }

  private loadGalleryData() {
    try {
      import('fs').then(({ readdirSync }) => {
        const galleryPath = resolve(process.cwd(), 'public/uploads/gallery')
        const imageFiles = readdirSync(galleryPath).filter(file => 
          /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        )
        
        this.galleryItems = imageFiles.map((filename, index) => {
          const metadata = this.generateIntelligentMetadata(filename, index)
          return {
            id: index + 1,
            title: metadata.title,
            description: metadata.description,
            imageUrl: `/uploads/gallery/${filename}`,
            category: metadata.category,
            altText: metadata.altText,
            uploadedAt: new Date().toISOString(),
            isVisible: true,
            sortOrder: index
          }
        })
        
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
      
      this.galleryItems = imageFiles.map((filename: string, index: number) => {
        const metadata = this.generateIntelligentMetadata(filename, index)
        return {
          id: index + 1,
          title: metadata.title,
          description: metadata.description,
          imageUrl: `/uploads/gallery/${filename}`,
          category: metadata.category,
          altText: metadata.altText,
          uploadedAt: new Date().toISOString(),
          isVisible: true,
          sortOrder: index
        }
      })
      
      this.nextGalleryId = this.galleryItems.length + 1
      console.log(`✅ Loaded ${this.galleryItems.length} gallery images with intelligent metadata`)
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