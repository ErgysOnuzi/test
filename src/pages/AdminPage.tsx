import React, { useState, useEffect } from 'react'
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'events' | 'bookings' | 'reservations' | 'feedback' | 'contact'>('menu')
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
  const [editingItem, setEditingItem] = useState<any>(null)

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Access Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to access the admin panel.</p>
          <a 
            href="/api/login"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-serif font-bold text-foreground">La Cantina Admin</h1>
              {user && (
                <span className="text-sm text-muted-foreground">
                  Welcome, {(user as any).firstName || (user as any).email || 'User'}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'menu', label: 'Menu Management', icon: '🍝' },
              { id: 'gallery', label: 'Gallery Management', icon: '📸' },
              { id: 'events', label: 'Events Management', icon: '🎉' },
              { id: 'bookings', label: 'Event Bookings', icon: '🎫' },
              { id: 'reservations', label: 'Reservations', icon: '📅' },
              { id: 'feedback', label: 'Feedback & Reviews', icon: '⭐' },
              { id: 'contact', label: 'Contact Messages', icon: '📧' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Menu Items</h2>
              <button 
                onClick={() => {setEditingItem(null); setShowMenuModal(true)}}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add New Item
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.slice(0, 12).map((item) => (
                <div key={item.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif font-semibold text-lg text-card-foreground">{item.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
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
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Gallery Images</h2>
              <button 
                onClick={() => {setEditingItem(null); setShowGalleryModal(true)}}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Upload Image
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.slice(0, 12).map((image) => (
                <div key={image.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-card-foreground mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{image.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {setEditingItem(image); setShowGalleryModal(true)}}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteGalleryImage(image.id)}
                        className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
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

        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Events Management</h2>
              <button 
                onClick={() => {setEditingItem(null); setShowEventModal(true)}}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create New Event
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 12).map((event) => (
                <div key={event.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
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
                      {event.current_attendees}/{event.max_attendees} attendees
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <button
                      onClick={() => {setEditingItem(event); setShowEventModal(true)}}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Event Bookings Management</h2>
              <div className="text-sm text-muted-foreground">
                Total Bookings: {eventBookings.length}
              </div>
            </div>
            
            {eventBookings.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-dashed">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Event Bookings Yet</h3>
                <p className="text-muted-foreground">Event bookings will appear here once customers start registering for events.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {eventBookings.map((booking) => {
                  const event = events.find(e => e.id === booking.eventId)
                  return (
                    <div key={booking.id} className="bg-card p-6 rounded-lg border">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {event ? event.title_en : `Event ID: ${booking.eventId}`}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Booking #{booking.id} • {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          <span className="text-lg font-bold text-primary">
                            €{booking.totalAmount}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Customer Details</p>
                          <p className="text-muted-foreground">{booking.name}</p>
                          <p className="text-muted-foreground">{booking.email}</p>
                          <p className="text-muted-foreground">{booking.phone}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Booking Details</p>
                          <p className="text-muted-foreground">Guests: {booking.guests}</p>
                          <p className="text-muted-foreground">
                            Event: {event ? new Date(event.event_date).toLocaleDateString() : 'Unknown'}
                          </p>
                          <p className="text-muted-foreground">
                            Per person: €{event ? event.price : booking.totalAmount / booking.guests}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Special Requests</p>
                          <p className="text-muted-foreground">
                            {booking.specialRequests || 'None'}
                          </p>
                        </div>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="mt-4 flex space-x-2">
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Confirm Booking
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                        <div className="mt-4 flex space-x-2">
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Cancel Booking
                          </button>
                          <button 
                            onClick={() => deleteBooking(booking.id)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                          >
                            Delete Booking
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
                          <div className="flex space-x-2">
                            <button className="text-primary hover:text-primary/80 text-sm font-medium">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-500 text-sm font-medium">
                              Delete
                            </button>
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
              {feedbackList.slice(0, 12).map((feedback) => (
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
                      <button className="text-green-600 hover:text-green-500 font-medium">
                        Approve
                      </button>
                      <button className="text-red-600 hover:text-red-500 font-medium">
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
              {contactMessages.slice(0, 10).map((message) => (
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
                      <button className="text-primary hover:text-primary/80 text-sm font-medium">
                        Reply
                      </button>
                      <button className="text-red-600 hover:text-red-500 text-sm font-medium">
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
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {editingItem ? 'Edit functionality' : 'Create functionality'} will be implemented in the next update.
              </p>
              <button 
                onClick={() => setShowMenuModal(false)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Gallery Image' : 'Upload New Image'}
            </h3>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {editingItem ? 'Edit functionality' : 'Upload functionality'} will be implemented in the next update.
              </p>
              <button 
                onClick={() => setShowGalleryModal(false)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Event' : 'Create New Event'}
            </h3>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                {editingItem ? 'Edit functionality' : 'Create functionality'} will be implemented in the next update.
              </p>
              <button 
                onClick={() => setShowEventModal(false)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}