import { generateSEOMetadata } from '@/components/StructuredData';
import { Clock, User, ChefHat, Wine, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return {
    ...generateSEOMetadata('home', locale),
    title: locale === 'de' 
      ? 'Ristorante La Cantina Bleibtreu Blog - Italienische Küche & Rezepte'
      : 'Ristorante La Cantina Bleibtreu Blog - Italian Cuisine & Recipes',
    description: locale === 'de'
      ? 'Entdecken Sie die Geheimnisse der authentischen italienischen Küche. Rezepte, Kochtipps und Geschichten aus unserer Küche in Berlin.'
      : 'Discover the secrets of authentic Italian cuisine. Recipes, cooking tips and stories from our kitchen in Berlin.'
  };
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
}

const blogPosts: Record<string, BlogPost[]> = {
  de: [
    {
      id: '1',
      title: 'Die Kunst der perfekten hausgemachten Pasta',
      excerpt: 'Lernen Sie die Geheimnisse unserer Pasta-Meister kennen. Von der Auswahl des richtigen Mehls bis zur perfekten Textur.',
      content: 'Authentische italienische Pasta beginnt mit den besten Zutaten...',
      author: 'Chef Giuseppe',
      publishedAt: '2024-09-20',
      readTime: 5,
      category: 'Kochtipps',
      tags: ['Pasta', 'Rezepte', 'Italienisch'],
      image: '/blog/pasta-making.jpg'
    },
    {
      id: '2', 
      title: 'Sizilianische Weinpaarungen: Die perfekte Harmonie',
      excerpt: 'Entdecken Sie, wie sizilianische Weine unsere traditionellen Gerichte perfekt ergänzen.',
      content: 'Die Weinkultur Siziliens ist so reich wie ihre Küche...',
      author: 'Sommelier Marco',
      publishedAt: '2024-09-15',
      readTime: 7,
      category: 'Wein',
      tags: ['Wein', 'Sizilien', 'Paarung'],
      image: '/blog/wine-pairing.jpg'
    },
    {
      id: '3',
      title: 'Geschichte der italienischen Küche in Berlin',
      excerpt: 'Von den ersten italienischen Immigranten bis zur modernen Gastronomieszene Berlins.',
      content: 'Die italienische Küche hat Berlin geprägt wie keine andere...',
      author: 'Chef Giuseppe',
      publishedAt: '2024-09-10',
      readTime: 6,
      category: 'Kultur',
      tags: ['Geschichte', 'Berlin', 'Tradition'],
      image: '/blog/berlin-italian-history.jpg'
    }
  ],
  en: [
    {
      id: '1',
      title: 'The Art of Perfect Homemade Pasta',
      excerpt: 'Learn the secrets of our pasta masters. From choosing the right flour to achieving perfect texture.',
      content: 'Authentic Italian pasta begins with the finest ingredients...',
      author: 'Chef Giuseppe',
      publishedAt: '2024-09-20',
      readTime: 5,
      category: 'Cooking Tips',
      tags: ['Pasta', 'Recipes', 'Italian'],
      image: '/blog/pasta-making.jpg'
    },
    {
      id: '2',
      title: 'Sicilian Wine Pairings: Perfect Harmony',
      excerpt: 'Discover how Sicilian wines perfectly complement our traditional dishes.',
      content: 'The wine culture of Sicily is as rich as its cuisine...',
      author: 'Sommelier Marco',
      publishedAt: '2024-09-15',
      readTime: 7,
      category: 'Wine',
      tags: ['Wine', 'Sicily', 'Pairing'],
      image: '/blog/wine-pairing.jpg'
    },
    {
      id: '3',
      title: 'History of Italian Cuisine in Berlin',
      excerpt: 'From the first Italian immigrants to Berlin\'s modern gastronomic scene.',
      content: 'Italian cuisine has shaped Berlin like no other...',
      author: 'Chef Giuseppe',
      publishedAt: '2024-09-10',
      readTime: 6,
      category: 'Culture',
      tags: ['History', 'Berlin', 'Tradition'],
      image: '/blog/berlin-italian-history.jpg'
    }
  ]
};

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const posts = blogPosts[locale as 'de' | 'en'] || blogPosts.de;

  const t = {
    de: {
      title: 'La Cantina Blog',
      subtitle: 'Geschichten aus der italienischen Küche',
      readMore: 'Weiterlesen',
      by: 'von',
      minRead: 'Min. Lesezeit',
      categories: 'Kategorien',
      latestPosts: 'Neueste Beiträge',
      cookingTips: 'Kochtipps',
      wine: 'Wein',
      culture: 'Kultur'
    },
    en: {
      title: 'La Cantina Blog',
      subtitle: 'Stories from the Italian Kitchen',
      readMore: 'Read More',
      by: 'by',
      minRead: 'min read',
      categories: 'Categories',
      latestPosts: 'Latest Posts',
      cookingTips: 'Cooking Tips',
      wine: 'Wine',
      culture: 'Culture'
    }
  };

  const translations = t[locale as 'de' | 'en'] || t.de;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {translations.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {translations.subtitle}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">
            {translations.latestPosts}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="group bg-card rounded-3xl shadow-lg border border-border/30 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <ChefHat className="w-12 h-12 text-primary/60" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{translations.by} {post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} {translations.minRead}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </span>
                    <button className="text-primary font-medium hover:text-primary/80 transition-colors">
                      {translations.readMore} →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
            {translations.categories}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <ChefHat className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {translations.cookingTips}
              </h3>
              <p className="text-muted-foreground">
                {locale === 'de' ? 'Professionelle Kochtipps direkt aus unserer Küche' : 'Professional cooking tips straight from our kitchen'}
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <Wine className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {translations.wine}
              </h3>
              <p className="text-muted-foreground">
                {locale === 'de' ? 'Weinwissen und perfekte Paarungen für italienische Gerichte' : 'Wine knowledge and perfect pairings for Italian dishes'}
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {translations.culture}
              </h3>
              <p className="text-muted-foreground">
                {locale === 'de' ? 'Geschichten über italienische Traditionen und Kultur' : 'Stories about Italian traditions and culture'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}