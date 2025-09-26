// Optimized icon imports - only import what we need
// Split into critical (above fold) and non-critical (lazy loaded) icons

// Critical icons for main site functionality
export {
  ChefHat,
  Flame,
  Wine,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Users,
  Star,
  Home,
  ArrowLeft
} from 'lucide-react';

// Non-critical icons for admin/secondary features - dynamic import
export const AdminIcons = {
  // Lazy load admin icons when needed
  loadIcons: () => import('lucide-react').then(module => ({
    Plus: module.Plus,
    Edit2: module.Edit2,
    Trash2: module.Trash2,
    Upload: module.Upload,
    Image: module.Image,
    TrendingUp: module.TrendingUp,
    ArrowRight: module.ArrowRight,
    MessageCircle: module.MessageCircle,
    Euro: module.Euro,
    Check: module.Check,
    Eye: module.Eye,
    EyeOff: module.EyeOff,
    Send: module.Send,
    User: module.User,
    BookOpen: module.BookOpen,
    ExternalLink: module.ExternalLink
  }))
};

// Menu-specific icons - lazy load for menu page
export const MenuIcons = {
  loadIcons: () => import('lucide-react').then(module => ({
    Coffee: module.Coffee,
    Utensils: module.Utensils,
    Fish: module.Fish,
    Beef: module.Beef,
    Soup: module.Soup,
    Pizza: module.Pizza,
    IceCream: module.IceCream,
    Salad: module.Salad,
    Sparkles: module.Sparkles,
    Loader2: module.Loader2
  }))
};

// Gallery icons - lazy load
export const GalleryIcons = {
  loadIcons: () => import('lucide-react').then(module => ({
    Camera: module.Camera,
    ChevronLeft: module.ChevronLeft,
    ChevronRight: module.ChevronRight
  }))
};

// Social media icons - lazy load for footer
export const SocialIcons = {
  loadIcons: () => import('lucide-react').then(module => ({
    Instagram: module.Instagram,
    Facebook: module.Facebook
  }))
};