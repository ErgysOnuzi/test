import React from 'react';
import { useTranslation } from '../../i18n/translations';
import { 
  Users, 
  UtensilsCrossed, 
  Calendar, 
  MessageSquare, 
  Star,
  TrendingUp,
  Image,
  ClipboardList,
  Activity,
  Clock
} from 'lucide-react';

interface AdminOverviewProps {
  locale: 'de' | 'en';
  menuItems: any[];
  galleryImages: any[];
  events: any[];
  eventBookings: any[];
  reservations: any[];
  feedbackList: any[];
  contactMessages: any[];
}

export default function AdminOverview({
  locale,
  menuItems,
  galleryImages,
  events,
  eventBookings,
  reservations,
  feedbackList,
  contactMessages
}: AdminOverviewProps) {
  const { t } = useTranslation(locale);

  // Calculate statistics
  const stats = {
    totalMenuItems: menuItems.length,
    availableMenuItems: menuItems.filter(item => item.isAvailable).length,
    totalEvents: events.length,
    totalBookings: eventBookings.length,
    pendingBookings: eventBookings.filter(booking => booking.status === 'pending').length,
    totalReservations: reservations.length,
    pendingReservations: reservations.filter(res => res.status === 'pending').length,
    totalFeedback: feedbackList.length,
    averageRating: feedbackList.length > 0 
      ? Math.round((feedbackList.reduce((sum, fb) => sum + (fb.rating || 0), 0) / feedbackList.length) * 10) / 10
      : 0,
    totalImages: galleryImages.length,
    unreadMessages: contactMessages.filter(msg => msg.status === 'unread' || !msg.replied).length
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color = "primary",
    trend 
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
    trend?: { value: number; isUp: boolean };
  }) => {
    // Fixed Tailwind classes to prevent purging in production
    const colorStyles = {
      primary: { bg: 'bg-primary/10', text: 'text-primary' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-600' }
    }
    const selectedStyle = colorStyles[color as keyof typeof colorStyles] || colorStyles.primary

    return (
      <div className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${selectedStyle.bg}`}>
            <Icon className={`w-6 h-6 ${selectedStyle.text}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend.isUp ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 ${trend.isUp ? '' : 'rotate-180'}`} />
              {trend.value}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    )
  };

  const getRecentActivity = () => {
    const activities: Array<{
      id: string;
      type: string;
      message: string;
      time: Date;
      color: string;
    }> = [];

    // Recent bookings
    eventBookings.slice(-3).forEach(booking => {
      activities.push({
        id: `booking-${booking.id}`,
        type: 'booking',
        message: locale === 'de' 
          ? `Neue Veranstaltungsanmeldung von ${booking.name}`
          : `New event booking from ${booking.name}`,
        time: new Date(booking.created_at || Date.now()),
        color: 'blue'
      });
    });

    // Recent reservations
    reservations.slice(-3).forEach(reservation => {
      activities.push({
        id: `reservation-${reservation.id}`,
        type: 'reservation',
        message: locale === 'de'
          ? `Neue Reservierung von ${reservation.name}`
          : `New reservation from ${reservation.name}`,
        time: new Date(reservation.created_at || Date.now()),
        color: 'green'
      });
    });

    // Recent messages
    contactMessages.slice(-2).forEach(message => {
      activities.push({
        id: `message-${message.id}`,
        type: 'message',
        message: locale === 'de'
          ? `Neue Kontaktnachricht von ${message.name}`
          : `New contact message from ${message.name}`,
        time: new Date(message.createdAt || Date.now()),
        color: 'purple'
      });
    });

    return activities
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 5);
  };

  const formatTime = (date: Date) => {
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return locale === 'de' ? 'Gerade eben' : 'Just now';
    } else if (diffHours < 24) {
      return locale === 'de' ? `vor ${diffHours}h` : `${diffHours}h ago`;
    } else {
      return locale === 'de' ? `vor ${diffDays}d` : `${diffDays}d ago`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            {locale === 'de' ? 'Dashboard Übersicht' : 'Dashboard Overview'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'de' 
              ? 'Willkommen zurück! Hier ist eine Übersicht Ihrer Restaurant-Verwaltung.'
              : 'Welcome back! Here\'s an overview of your restaurant management.'
            }
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={UtensilsCrossed}
          title={locale === 'de' ? 'Speisekarten-Artikel' : 'Menu Items'}
          value={stats.totalMenuItems}
          subtitle={locale === 'de' 
            ? `${stats.availableMenuItems} verfügbar`
            : `${stats.availableMenuItems} available`
          }
          color="primary"
        />
        
        <StatCard
          icon={Calendar}
          title={locale === 'de' ? 'Veranstaltungsanmeldungen' : 'Event Bookings'}
          value={stats.totalBookings}
          subtitle={locale === 'de'
            ? `${stats.pendingBookings} ausstehend`
            : `${stats.pendingBookings} pending`
          }
          color="blue"
        />

        <StatCard
          icon={ClipboardList}
          title={locale === 'de' ? 'Reservierungen' : 'Reservations'}
          value={stats.totalReservations}
          subtitle={locale === 'de'
            ? `${stats.pendingReservations} ausstehend`
            : `${stats.pendingReservations} pending`
          }
          color="green"
        />

        <StatCard
          icon={MessageSquare}
          title={locale === 'de' ? 'Ungelesene Nachrichten' : 'Unread Messages'}
          value={stats.unreadMessages}
          subtitle={locale === 'de' ? 'Kontaktnachrichten' : 'Contact messages'}
          color={stats.unreadMessages > 0 ? "orange" : "gray"}
        />
      </div>

      {/* Secondary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Star}
          title={locale === 'de' ? 'Durchschnittsbewertung' : 'Average Rating'}
          value={`${stats.averageRating}/5`}
          subtitle={locale === 'de'
            ? `${stats.totalFeedback} Bewertungen`
            : `${stats.totalFeedback} reviews`
          }
          color="yellow"
        />

        <StatCard
          icon={Calendar}
          title={locale === 'de' ? 'Veranstaltungen' : 'Events'}
          value={stats.totalEvents}
          subtitle={locale === 'de' ? 'Aktive Veranstaltungen' : 'Active events'}
          color="purple"
        />

        <StatCard
          icon={Image}
          title={locale === 'de' ? 'Galerie-Bilder' : 'Gallery Images'}
          value={stats.totalImages}
          subtitle={locale === 'de' ? 'Hochgeladene Bilder' : 'Uploaded images'}
          color="indigo"
        />
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-card rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            {locale === 'de' ? 'Letzte Aktivitäten' : 'Recent Activity'}
          </h2>
        </div>

        <div className="space-y-4">
          {getRecentActivity().length > 0 ? (
            getRecentActivity().map((activity) => {
              // Fixed activity color classes to prevent Tailwind purging
              const activityColorStyles: Record<string, string> = {
                blue: 'bg-blue-500',
                green: 'bg-green-500', 
                purple: 'bg-purple-500',
                orange: 'bg-orange-500',
                red: 'bg-red-500',
                yellow: 'bg-yellow-500',
                indigo: 'bg-indigo-500'
              }
              const dotColor = activityColorStyles[activity.color] || 'bg-blue-500'

              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${dotColor} mt-2 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground mb-1">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(activity.time)}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {locale === 'de' ? 'Keine aktuellen Aktivitäten' : 'No recent activity'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {locale === 'de' ? 'Schnellaktionen' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              {locale === 'de' ? 'Neues Gericht' : 'New Dish'}
            </span>
          </button>
          <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">
              {locale === 'de' ? 'Neue Veranstaltung' : 'New Event'}
            </span>
          </button>
          <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left">
            <Image className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">
              {locale === 'de' ? 'Bild hochladen' : 'Upload Image'}
            </span>
          </button>
          <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">
              {locale === 'de' ? 'Reservierungen' : 'Reservations'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}