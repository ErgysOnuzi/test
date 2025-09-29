import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { adminAuth } from '@/lib/adminAuth'

interface MenuItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  isAvailable: boolean
}

interface GalleryImage {
  id: number
  imageUrl: string
  title: string
  description?: string
}

export default function AdminPage() {
  const { locale } = useParams<{ locale: string }>()
  const currentLocale = locale || 'de'
  const isGerman = currentLocale === 'de'
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'events' | 'bookings' | 'reservations' | 'feedback' | 'contact'>('menu')
  
  // Translations
  const t = {
    // Header
    adminTitle: isGerman ? 'La Cantina Admin' : 'La Cantina Admin',
    welcome: isGerman ? 'Willkommen' : 'Welcome',
    logout: isGerman ? 'Abmelden' : 'Log Out',
    loading: isGerman ? 'Lädt...' : 'Loading...',
    accessRequired: isGerman ? 'Zugang erforderlich' : 'Access Required',
    pleaseLogin: isGerman ? 'Bitte melden Sie sich an, um auf das Admin-Panel zuzugreifen.' : 'Please log in to access the admin panel.',
    login: isGerman ? 'Anmelden' : 'Log In',
    
    // Navigation tabs
    tabs: {
      menu: isGerman ? 'Speisekarten-Verwaltung' : 'Menu Management',
      gallery: isGerman ? 'Galerie-Verwaltung' : 'Gallery Management', 
      events: isGerman ? 'Veranstaltungs-Verwaltung' : 'Events Management',
      bookings: isGerman ? 'Veranstaltungsanmeldungen' : 'Event Bookings',
      reservations: isGerman ? 'Reservierungen' : 'Reservations',
      feedback: isGerman ? 'Bewertungen & Feedback' : 'Feedback & Reviews',
      contact: isGerman ? 'Kontaktnachrichten' : 'Contact Messages'
    },
    
    // Common actions
    actions: {
      edit: isGerman ? 'Bearbeiten' : 'Edit',
      delete: isGerman ? 'Löschen' : 'Delete',
      create: isGerman ? 'Erstellen' : 'Create',
      update: isGerman ? 'Aktualisieren' : 'Update',
      cancel: isGerman ? 'Abbrechen' : 'Cancel',
      confirm: isGerman ? 'Bestätigen' : 'Confirm',
      approve: isGerman ? 'Genehmigen' : 'Approve',
      reply: isGerman ? 'Antworten' : 'Reply',
      save: isGerman ? 'Speichern' : 'Save'
    },
    
    // Menu management
    menu: {
      title: isGerman ? 'Speisekarten-Artikel' : 'Menu Items',
      addNew: isGerman ? 'Neuen Artikel hinzufügen' : 'Add New Item',
      editItem: isGerman ? 'Artikel bearbeiten' : 'Edit Menu Item',
      addItem: isGerman ? 'Neuen Artikel hinzufügen' : 'Add New Menu Item',
      itemTitle: isGerman ? 'Artikel-Titel' : 'Item Title',
      description: isGerman ? 'Beschreibung' : 'Description',
      price: isGerman ? 'Preis' : 'Price',
      category: isGerman ? 'Kategorie' : 'Category',
      selectCategory: isGerman ? 'Kategorie auswählen' : 'Select Category',
      available: isGerman ? 'Verfügbar' : 'Available',
      unavailable: isGerman ? 'Nicht verfügbar' : 'Unavailable'
    },
    
    // Gallery management
    gallery: {
      title: isGerman ? 'Galerie-Bilder' : 'Gallery Images',
      uploadImage: isGerman ? 'Bild hochladen' : 'Upload Image',
      editImage: isGerman ? 'Bild bearbeiten' : 'Edit Gallery Image',
      uploadNew: isGerman ? 'Neues Bild hochladen' : 'Upload New Image',
      imageTitle: isGerman ? 'Bild-Titel' : 'Image Title',
      imageUrl: isGerman ? 'Bild-URL' : 'Image URL',
      descriptionOptional: isGerman ? 'Beschreibung (optional)' : 'Description (optional)',
      upload: isGerman ? 'Hochladen' : 'Upload'
    },
    
    // Events management
    events: {
      title: isGerman ? 'Veranstaltungs-Verwaltung' : 'Events Management',
      createNew: isGerman ? 'Neue Veranstaltung erstellen' : 'Create New Event',
      editEvent: isGerman ? 'Veranstaltung bearbeiten' : 'Edit Event',
      createNewEvent: isGerman ? 'Neue Veranstaltung erstellen' : 'Create New Event',
      titleEnglish: isGerman ? 'Veranstaltungstitel (Englisch)' : 'Event Title (English)',
      titleGerman: isGerman ? 'Veranstaltungstitel (Deutsch)' : 'Event Title (German)',
      descriptionEnglish: isGerman ? 'Beschreibung (Englisch)' : 'Description (English)',
      descriptionGerman: isGerman ? 'Beschreibung (Deutsch)' : 'Description (German)',
      pricePerPerson: isGerman ? 'Preis pro Person' : 'Price per person',
      maxAttendees: isGerman ? 'Max. Teilnehmer' : 'Max attendees',
      attendees: isGerman ? 'Teilnehmer' : 'attendees'
    },
    
    // Bookings management
    bookings: {
      title: isGerman ? 'Veranstaltungsanmeldungen-Verwaltung' : 'Event Bookings Management',
      totalBookings: isGerman ? 'Anmeldungen gesamt' : 'Total Bookings',
      noBookings: isGerman ? 'Noch keine Veranstaltungsanmeldungen' : 'No Event Bookings Yet',
      noBookingsDesc: isGerman ? 'Veranstaltungsanmeldungen erscheinen hier, sobald Kunden sich für Veranstaltungen registrieren.' : 'Event bookings will appear here once customers start registering for events.',
      booking: isGerman ? 'Anmeldung' : 'Booking',
      customerDetails: isGerman ? 'Kundendaten' : 'Customer Details',
      bookingDetails: isGerman ? 'Anmeldungsdetails' : 'Booking Details',
      guests: isGerman ? 'Gäste' : 'Guests',
      event: isGerman ? 'Veranstaltung' : 'Event',
      perPerson: isGerman ? 'Pro Person' : 'Per person',
      specialRequests: isGerman ? 'Besondere Wünsche' : 'Special Requests',
      none: isGerman ? 'Keine' : 'None',
      confirmBooking: isGerman ? 'Anmeldung bestätigen' : 'Confirm Booking',
      cancelBooking: isGerman ? 'Anmeldung stornieren' : 'Cancel Booking',
      deleteBooking: isGerman ? 'Anmeldung löschen' : 'Delete Booking',
      confirmed: isGerman ? 'Bestätigt' : 'Confirmed',
      pending: isGerman ? 'Ausstehend' : 'Pending',
      cancelled: isGerman ? 'Storniert' : 'Cancelled'
    },
    
    // Reservations management
    reservations: {
      title: isGerman ? 'Reservierungen-Verwaltung' : 'Reservations Management',
      allStatus: isGerman ? 'Alle Status' : 'All Status',
      guest: isGerman ? 'Gast' : 'Guest',
      dateTime: isGerman ? 'Datum & Zeit' : 'Date & Time',
      guests: isGerman ? 'Gäste' : 'Guests',
      status: isGerman ? 'Status' : 'Status',
      actions: isGerman ? 'Aktionen' : 'Actions'
    },
    
    // Feedback management
    feedback: {
      title: isGerman ? 'Bewertungen & Feedback' : 'Feedback & Reviews',
      allRatings: isGerman ? 'Alle Bewertungen' : 'All Ratings',
      stars: isGerman ? 'Sterne' : 'Stars',
      suggestions: isGerman ? 'Vorschläge' : 'Suggestions'
    },
    
    // Contact management
    contact: {
      title: isGerman ? 'Kontaktnachrichten' : 'Contact Messages',
      allMessages: isGerman ? 'Alle Nachrichten' : 'All Messages',
      unread: isGerman ? 'Ungelesen' : 'Unread',
      replied: isGerman ? 'Beantwortet' : 'Replied',
      new: isGerman ? 'Neu' : 'New',
      markReplied: isGerman ? 'Als beantwortet markieren' : 'Mark Replied',
      subject: isGerman ? 'Betreff' : 'Subject',
      message: isGerman ? 'Nachricht' : 'Message'
    },
    
    // Success/Error messages
    messages: {
      deleteConfirm: isGerman ? 'Sind Sie sicher, dass Sie dies löschen möchten?' : 'Are you sure you want to delete this?',
      deleteEventConfirm: isGerman ? 'Sind Sie sicher, dass Sie diese Veranstaltung löschen möchten? Alle zugehörigen Anmeldungen werden ebenfalls gelöscht.' : 'Are you sure you want to delete this event? All associated bookings will also be deleted.',
      deleteBookingConfirm: isGerman ? 'Sind Sie sicher, dass Sie diese Anmeldung löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.' : 'Are you sure you want to delete this booking? This action cannot be undone.',
      itemCreated: isGerman ? 'Artikel erfolgreich erstellt!' : 'Menu item created successfully!',
      itemUpdated: isGerman ? 'Artikel erfolgreich aktualisiert!' : 'Menu item updated successfully!',
      imageUploaded: isGerman ? 'Bild erfolgreich hochgeladen!' : 'Gallery image uploaded successfully!',
      imageUpdated: isGerman ? 'Bild erfolgreich aktualisiert!' : 'Gallery image updated successfully!',
      eventCreated: isGerman ? 'Veranstaltung erfolgreich erstellt!' : 'Event created successfully!',
      eventUpdated: isGerman ? 'Veranstaltung erfolgreich aktualisiert!' : 'Event updated successfully!',
      reservationDeleted: isGerman ? 'Reservierung erfolgreich gelöscht!' : 'Reservation deleted successfully!',
      reservationStatusUpdated: isGerman ? 'Reservierungsstatus erfolgreich aktualisiert!' : 'Reservation status updated successfully!',
      feedbackDeleted: isGerman ? 'Feedback erfolgreich gelöscht!' : 'Feedback deleted successfully!',
      feedbackApproved: isGerman ? 'Feedback erfolgreich genehmigt!' : 'Feedback approved successfully!',
      messageDeleted: isGerman ? 'Nachricht erfolgreich gelöscht!' : 'Message deleted successfully!',
      messageMarkedReplied: isGerman ? 'Nachricht als beantwortet markiert!' : 'Message marked as replied!',
      error: isGerman ? 'Fehler' : 'Error',
      unknownError: isGerman ? 'Unbekannter Fehler' : 'Unknown error'
    }
  }
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [reservations, setReservations] = useState<any[]>([])
  const [feedbackList, setFeedbackList] = useState<any[]>([])
  const [contactMessages, setContactMessages] = useState<any[]>([])
  const [eventBookings, setEventBookings] = useState<any[]>([])
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  // Check authentication using our new cookie-based system
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await adminAuth.checkAuth()
        if (authenticated) {
          // Get user info from session endpoint  
          const response = await fetch('/api/admin/session', {
            credentials: 'include'
          })
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
          }
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenuItems()
      fetchGalleryImages()
      fetchEvents()
      fetchEventBookings()
      fetchReservations()
      fetchFeedback()
      fetchContactMessages()
    }
  }, [isAuthenticated])

  // Handle logout
  const handleLogout = async () => {
    await adminAuth.logout()
    window.location.href = '/de/admin/login'
  }

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      const data = await response.json()
      setGalleryImages(data)
    } catch (error) {
      console.error('Failed to fetch gallery images:', error)
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  const fetchEventBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings', {
        credentials: 'include'
      })
      const data = await response.json()
      setEventBookings(data)
    } catch (error) {
      console.error('Failed to fetch event bookings:', error)
    }
  }

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations')
      const data = await response.json()
      setReservations(data)
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    }
  }

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/feedback')
      const data = await response.json()
      setFeedbackList(data)
    } catch (error) {
      console.error('Failed to fetch feedback:', error)
    }
  }

  const fetchContactMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      setContactMessages(data)
    } catch (error) {
      console.error('Failed to fetch contact messages:', error)
    }
  }

  const updateBookingStatus = async (bookingId: number, status: 'confirmed' | 'cancelled' | 'pending') => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update booking status')
      }

      // Refresh bookings and events to show updated data
      await fetchEventBookings()
      await fetchEvents()
      
      console.log(`Booking ${bookingId} status updated to ${status}`)
    } catch (error) {
      console.error('Error updating booking status:', error)
      alert(`Failed to update booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Admin CRUD functions
  const deleteMenuItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return
    try {
      const response = await fetch(`/api/admin/menu/${itemId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to delete menu item')
      await fetchMenuItems()
      console.log(`Menu item ${itemId} deleted successfully`)
    } catch (error) {
      console.error('Error deleting menu item:', error)
      alert(`Failed to delete menu item: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deleteGalleryImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to delete image')
      await fetchGalleryImages()
      console.log(`Gallery image ${imageId} deleted successfully`)
    } catch (error) {
      console.error('Error deleting gallery image:', error)
      alert(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deleteEvent = async (eventId: number) => {
    if (!confirm('Are you sure you want to delete this event? All associated bookings will also be deleted.')) return
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to delete event')
      await fetchEvents()
      await fetchEventBookings()
      console.log(`Event ${eventId} deleted successfully`)
    } catch (error) {
      console.error('Error deleting event:', error)
      alert(`Failed to delete event: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const deleteBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete booking')
      }

      // Refresh bookings and events to show updated data
      await fetchEventBookings()
      await fetchEvents()
      
      console.log(`Booking ${bookingId} deleted successfully`)
    } catch (error) {
      console.error('Error deleting booking:', error)
      alert(`Failed to delete booking: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Reservation CRUD functions
  const deleteReservation = async (reservationId: number) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return
    try {
      const response = await fetch(`/api/admin/reservations/${reservationId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to delete reservation')
      await fetchReservations()
      alert('Reservation deleted successfully!')
    } catch (error) {
      console.error('Error deleting reservation:', error)
      alert(`Failed to delete reservation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const updateReservationStatus = async (reservationId: number, status: 'confirmed' | 'cancelled' | 'pending') => {
    try {
      const response = await fetch(`/api/admin/reservations/${reservationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      })
      if (!response.ok) throw new Error('Failed to update reservation status')
      await fetchReservations()
      alert(`Reservation status updated to ${status}!`)
    } catch (error) {
      console.error('Error updating reservation status:', error)
      alert(`Failed to update reservation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Feedback CRUD functions
  const deleteFeedback = async (feedbackId: number) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to delete feedback')
      await fetchFeedback()
      alert('Feedback deleted successfully!')
    } catch (error) {
      console.error('Error deleting feedback:', error)
      alert(`Failed to delete feedback: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const approveFeedback = async (feedbackId: number) => {
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}/approve`, {
        method: 'PATCH',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to approve feedback')
      await fetchFeedback()
      alert('Feedback approved successfully!')
    } catch (error) {
      console.error('Error approving feedback:', error)
      alert(`Failed to approve feedback: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Contact CRUD functions
  const deleteContactMessage = async (messageId: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    try {
      const response = await fetch(`/api/admin/contact/${messageId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to delete message')
      await fetchContactMessages()
      alert('Message deleted successfully!')
    } catch (error) {
      console.error('Error deleting message:', error)
      alert(`Failed to delete message: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const markMessageAsReplied = async (messageId: number) => {
    try {
      const response = await fetch(`/api/admin/contact/${messageId}/reply`, {
        method: 'PATCH',
        credentials: 'include'
      })
      if (!response.ok) throw new Error('Failed to mark message as replied')
      await fetchContactMessages()
      alert('Message marked as replied!')
    } catch (error) {
      console.error('Error updating message:', error)
      alert(`Failed to update message: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">{t.accessRequired}</h1>
          <p className="text-muted-foreground mb-6">{t.pleaseLogin}</p>
          <a 
            href="/api/login"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t.login}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Tailwind scrollbar hiding - works with Vite */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground">{t.adminTitle}</h1>
              {user && (
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                  {t.welcome}, {(user as any).firstName || (user as any).email || 'User'}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-muted-foreground/20 hover:bg-muted/50"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {/* Mobile Navigation Tabs - Horizontal Scroll */}
          <nav className="flex overflow-x-auto space-x-1 sm:space-x-4 lg:space-x-8 scrollbar-hide py-2">
            {[
              { id: 'menu', label: t.tabs.menu, icon: '🍝', shortLabel: isGerman ? 'Menü' : 'Menu' },
              { id: 'gallery', label: t.tabs.gallery, icon: '📸', shortLabel: isGerman ? 'Galerie' : 'Gallery' },
              { id: 'events', label: t.tabs.events, icon: '🎉', shortLabel: isGerman ? 'Events' : 'Events' },
              { id: 'bookings', label: t.tabs.bookings, icon: '🎫', shortLabel: isGerman ? 'Buchungen' : 'Bookings' },
              { id: 'reservations', label: t.tabs.reservations, icon: '📅', shortLabel: isGerman ? 'Reservierungen' : 'Reservations' },
              { id: 'feedback', label: t.tabs.feedback, icon: '⭐', shortLabel: 'Feedback' },
              { id: 'contact', label: t.tabs.contact, icon: '📧', shortLabel: 'Contact' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 flex items-center space-x-1 sm:space-x-2 py-3 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors rounded-t-lg ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground hover:bg-muted/50'
                }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'menu' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{t.menu.title}</h2>
              <button 
                onClick={() => {setEditingItem(null); setShowMenuModal(true)}}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                {t.menu.addNew}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif font-semibold text-lg text-card-foreground">{item.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isAvailable ? t.menu.available : t.menu.unavailable}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">€{item.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <button
                      onClick={() => {setEditingItem(item); setShowMenuModal(true)}}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      {t.actions.edit}
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      {t.actions.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{t.gallery.title}</h2>
              <button 
                onClick={() => {setEditingItem(null); setShowGalleryModal(true)}}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                {t.gallery.uploadImage}
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-32 sm:h-48 object-cover"
                  />
                  <div className="p-2 sm:p-4">
                    <h3 className="font-medium text-card-foreground mb-2 text-sm sm:text-base line-clamp-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 hidden sm:block">{image.description}</p>
                    )}
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
                      <button
                        onClick={() => {setEditingItem(image); setShowGalleryModal(true)}}
                        className="text-xs sm:text-sm bg-blue-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
                      >
                        {t.actions.edit}
                      </button>
                      <button
                        onClick={() => deleteGalleryImage(image.id)}
                        className="text-xs sm:text-sm bg-red-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
                      >
                        {t.actions.delete}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{t.events.title}</h2>
              <button 
                onClick={() => {setEditingItem(null); setShowEventModal(true)}}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                {t.events.createNew}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-card rounded-lg border p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif font-semibold text-lg text-card-foreground">{event.title_en}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      €{event.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description_en}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-primary font-medium">
                      {new Date(event.event_date).toLocaleDateString()}
                    </span>
                    <span className="text-muted-foreground">
                      {event.current_attendees}/{event.max_attendees} {t.events.attendees}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t space-y-2 sm:space-y-0">
                    <button
                      onClick={() => {setEditingItem(event); setShowEventModal(true)}}
                      className="text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                      {t.actions.edit}
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
                    >
                      {t.actions.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{t.bookings.title}</h2>
              <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                {t.bookings.totalBookings}: {eventBookings.length}
              </div>
            </div>
            
            {eventBookings.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-card rounded-lg border border-dashed">
                <div className="text-4xl sm:text-6xl mb-4">🎫</div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{t.bookings.noBookings}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{t.bookings.noBookingsDesc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {eventBookings.map((booking) => {
                  const event = events.find(e => e.id === booking.eventId)
                  return (
                    <div key={booking.id} className="bg-card p-4 sm:p-6 rounded-lg border">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {event ? event.title_en : `Event ID: ${booking.eventId}`}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t.bookings.booking} #{booking.id} • {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status === 'confirmed' ? t.bookings.confirmed :
                             booking.status === 'pending' ? t.bookings.pending :
                             t.bookings.cancelled}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            €{booking.totalAmount}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">{t.bookings.customerDetails}</p>
                          <p className="text-muted-foreground">{booking.name}</p>
                          <p className="text-muted-foreground">{booking.email}</p>
                          <p className="text-muted-foreground">{booking.phone}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{t.bookings.bookingDetails}</p>
                          <p className="text-muted-foreground">{t.bookings.guests}: {booking.guests}</p>
                          <p className="text-muted-foreground">
                            {t.bookings.event}: {event ? new Date(event.event_date).toLocaleDateString() : 'Unknown'}
                          </p>
                          <p className="text-muted-foreground">
                            {t.bookings.perPerson}: €{event ? event.price : booking.totalAmount / booking.guests}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{t.bookings.specialRequests}</p>
                          <p className="text-muted-foreground">
                            {booking.specialRequests || t.bookings.none}
                          </p>
                        </div>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
                          >
                            {t.bookings.confirmBooking}
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm w-full sm:w-auto"
                          >
                            {t.bookings.cancelBooking}
                          </button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm w-full sm:w-auto"
                          >
                            {t.bookings.cancelBooking}
                          </button>
                          <button 
                            onClick={() => deleteBooking(booking.id)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm w-full sm:w-auto"
                          >
                            {t.bookings.deleteBooking}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reservations' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Reservations Management</h2>
              <div className="flex space-x-4">
                <select className="border border-muted-foreground/20 rounded-lg px-3 py-2 text-sm">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Guest</th>
                      <th className="text-left p-4 font-medium text-foreground">Date & Time</th>
                      <th className="text-left p-4 font-medium text-foreground">Guests</th>
                      <th className="text-left p-4 font-medium text-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.slice(0, 10).map((reservation) => (
                      <tr key={reservation.id} className="border-t hover:bg-muted/20">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-foreground">{reservation.name}</div>
                            <div className="text-sm text-muted-foreground">{reservation.email}</div>
                            <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="font-medium">{reservation.date}</div>
                            <div className="text-muted-foreground">{reservation.time}</div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{reservation.guests}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col space-y-1">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {setEditingItem(reservation); setShowReservationModal(true)}}
                                className="text-primary hover:text-primary/80 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteReservation(reservation.id)}
                                className="text-red-600 hover:text-red-500 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                            {reservation.status === 'pending' && (
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-500 text-xs font-medium"
                                >
                                  Confirm
                                </button>
                                <button 
                                  onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-500 text-xs font-medium"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Feedback & Reviews</h2>
              <div className="flex space-x-4">
                <select className="border border-muted-foreground/20 rounded-lg px-3 py-2 text-sm">
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbackList.map((feedback) => (
                <div key={feedback.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-card-foreground">{feedback.name}</h3>
                      <p className="text-sm text-muted-foreground">{feedback.email}</p>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{feedback.experience}</p>
                  {feedback.suggestions && (
                    <p className="text-muted-foreground text-xs mb-4 line-clamp-2">
                      <strong>Suggestions:</strong> {feedback.suggestions}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => approveFeedback(feedback.id)}
                        className="text-green-600 hover:text-green-500 font-medium"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => deleteFeedback(feedback.id)}
                        className="text-red-600 hover:text-red-500 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Contact Messages</h2>
              <div className="flex space-x-4">
                <select className="border border-muted-foreground/20 rounded-lg px-3 py-2 text-sm">
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {contactMessages.map((message) => (
                <div key={message.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-card-foreground">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="text-sm font-medium text-foreground mt-1">{message.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{message.message}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      New
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => markMessageAsReplied(message.id)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Mark Replied
                      </button>
                      <button 
                        onClick={() => deleteContactMessage(message.id)}
                        className="text-red-600 hover:text-red-500 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quick Create/Edit Modals */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)
              
              const itemData = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                price: parseFloat(formData.get('price') as string),
                category: formData.get('category') as string,
                isAvailable: true
              }
              
              try {
                const url = editingItem ? `/api/admin/menu/${editingItem.id}` : '/api/admin/menu'
                const method = editingItem ? 'PUT' : 'POST'
                
                const response = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify(itemData)
                })
                
                if (!response.ok) throw new Error('Failed to save menu item')
                
                await fetchMenuItems()
                setShowMenuModal(false)
                setEditingItem(null)
                alert(editingItem ? 'Menu item updated successfully!' : 'Menu item created successfully!')
              } catch (error) {
                alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
              }
            }}>
              <div className="space-y-4">
                <input 
                  name="title"
                  type="text" 
                  placeholder="Item Title" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.title || ''}
                  required
                />
                <textarea 
                  name="description"
                  placeholder="Description" 
                  className="w-full p-3 border rounded-lg h-24"
                  defaultValue={editingItem?.description || ''}
                  required
                />
                <input 
                  name="price"
                  type="number" 
                  placeholder="Price" 
                  step="0.01"
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.price || ''}
                  required
                />
                <select 
                  name="category"
                  className="w-full p-3 border rounded-lg" 
                  defaultValue={editingItem?.category || ''}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Antipasti">Antipasti</option>
                  <option value="Primi">Primi</option>
                  <option value="Secondi">Secondi</option>
                  <option value="Dolci">Dolci</option>
                  <option value="Bevande">Bevande</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowMenuModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Gallery Image' : 'Upload New Image'}
            </h3>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)
              
              const imageData = {
                title: formData.get('title') as string,
                imageUrl: formData.get('imageUrl') as string,
                description: formData.get('description') as string || ''
              }
              
              try {
                const url = editingItem ? `/api/admin/gallery/${editingItem.id}` : '/api/admin/gallery'
                const method = editingItem ? 'PUT' : 'POST'
                
                const response = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify(imageData)
                })
                
                if (!response.ok) throw new Error('Failed to save gallery image')
                
                await fetchGalleryImages()
                setShowGalleryModal(false)
                setEditingItem(null)
                alert(editingItem ? 'Gallery image updated successfully!' : 'Gallery image uploaded successfully!')
              } catch (error) {
                alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
              }
            }}>
              <div className="space-y-4">
                <input 
                  name="title"
                  type="text" 
                  placeholder="Image Title" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.title || ''}
                  required
                />
                <input 
                  name="imageUrl"
                  type="url" 
                  placeholder="Image URL" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.imageUrl || ''}
                  required
                />
                <textarea 
                  name="description"
                  placeholder="Description (optional)" 
                  className="w-full p-3 border rounded-lg h-24"
                  defaultValue={editingItem?.description || ''}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
                >
                  {editingItem ? 'Update' : 'Upload'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Event' : 'Create New Event'}
            </h3>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)
              
              const eventData = {
                title_en: formData.get('title_en') as string,
                title_de: formData.get('title_de') as string,
                description_en: formData.get('description_en') as string,
                description_de: formData.get('description_de') as string || '',
                event_date: formData.get('event_date') as string,
                price: parseFloat(formData.get('price') as string),
                max_attendees: parseInt(formData.get('max_attendees') as string),
                current_attendees: editingItem?.current_attendees || 0
              }
              
              try {
                const url = editingItem ? `/api/events/${editingItem.id}` : '/api/events'
                const method = editingItem ? 'PUT' : 'POST'
                
                const response = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify(eventData)
                })
                
                if (!response.ok) throw new Error('Failed to save event')
                
                await fetchEvents()
                setShowEventModal(false)
                setEditingItem(null)
                alert(editingItem ? 'Event updated successfully!' : 'Event created successfully!')
              } catch (error) {
                alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
              }
            }}>
              <div className="space-y-4">
                <input 
                  name="title_en"
                  type="text" 
                  placeholder="Event Title (English)" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.title_en || ''}
                  required
                />
                <input 
                  name="title_de"
                  type="text" 
                  placeholder="Event Title (German)" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.title_de || ''}
                  required
                />
                <textarea 
                  name="description_en"
                  placeholder="Description (English)" 
                  className="w-full p-3 border rounded-lg h-24"
                  defaultValue={editingItem?.description_en || ''}
                  required
                />
                <textarea 
                  name="description_de"
                  placeholder="Description (German)" 
                  className="w-full p-3 border rounded-lg h-24"
                  defaultValue={editingItem?.description_de || ''}
                />
                <input 
                  name="event_date"
                  type="datetime-local" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.event_date ? new Date(editingItem.event_date).toISOString().slice(0, 16) : ''}
                  required
                />
                <input 
                  name="price"
                  type="number" 
                  placeholder="Price per person" 
                  step="0.01"
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.price || ''}
                  required
                />
                <input 
                  name="max_attendees"
                  type="number" 
                  placeholder="Max attendees" 
                  className="w-full p-3 border rounded-lg"
                  defaultValue={editingItem?.max_attendees || ''}
                  required
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}