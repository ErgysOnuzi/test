import React, { useState } from 'react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  readTime: number
  imageUrl?: string
}

// Authentic Italian restaurant blog posts
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Journey from Tuscany to Berlin: Chef Antonio's Story",
    excerpt: "Discover how our head chef Antonio brought authentic Tuscan flavors to the heart of Berlin, creating La Cantina's unique culinary identity.",
    content: `Growing up in the rolling hills of Tuscany, I learned that cooking isn't just about feeding people – it's about bringing families together, preserving tradition, and sharing love through food.

My nonna taught me to make pasta when I was just seven years old. 'Antonio,' she would say, 'the secret is in your hands. Feel the dough, listen to what it needs.' Those words still guide me today in our Berlin kitchen.

When I first arrived in Berlin in 2018, I was struck by the city's incredible diversity and energy. But I noticed something missing – truly authentic Italian cuisine that honored the traditions I grew up with. That's when the dream of La Cantina began.

We opened our doors in March 2025 with a simple mission: to bring the warmth and authenticity of Italian hospitality to Berlin. Every dish tells a story, from our handmade pappardelle with wild boar ragu (my grandfather's recipe) to our tiramisu made fresh every morning.

What makes me proudest is seeing families gathering around our tables, just like they do in Italy. Food has this magical power to create connections, and that's what La Cantina is all about.`,
    author: 'Chef Antonio Rossi',
    date: '2025-09-25',
    category: 'Our Story',
    readTime: 4,
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: 2,
    title: "The Art of Handmade Pasta: Behind the Scenes",
    excerpt: "Step into our kitchen to discover the ancient techniques we use daily to create perfect fresh pasta, just like nonna used to make.",
    content: `Every morning at 6 AM, our pasta station comes alive with the rhythm of tradition. We make over 15 different pasta shapes daily, each with its own purpose and personality.

The process starts with our pasta dough – a simple combination of 00 flour, fresh eggs from local farms, and a pinch of sea salt. But simplicity doesn't mean easy. The dough must be kneaded for exactly 10 minutes, rested for 30, and rolled with the patience of generations.

Our pappardelle, wide ribbons perfect for rich ragus, requires a delicate touch. Too thick and it overwhelms the sauce; too thin and it breaks under the weight of our slow-cooked wild boar. Our pasta chefs have trained for years to achieve this balance.

The tortellini are perhaps our greatest pride. Each one is folded by hand – we make about 400 pieces daily. The filling combines mortadella, prosciutto, and Parmigiano-Reggiano aged 24 months. It takes our team member Maria about 2 hours to shape them all, but the result is poetry on a plate.

When guests ask why we don't use machines, I tell them: machines can copy, but they cannot create soul. Every imperfection in our handmade pasta is a signature of human care.`,
    author: 'Chef Antonio Rossi',
    date: '2025-09-20',
    category: 'Kitchen Stories',
    readTime: 5,
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: 3,
    title: "Autumn Flavors: Our Seasonal Menu Transformation",
    excerpt: "As Berlin's autumn arrives, discover how we incorporate seasonal ingredients to create dishes that celebrate the changing seasons.",
    content: `Autumn in Berlin brings a transformation to our kitchen that excites every chef on our team. As the leaves change color, so does our menu, embracing the rich, earthy flavors that make this season so magical.

This month, we're featuring fresh porcini mushrooms flown in twice weekly from Umbria. These beauties find their way into our risotto ai porcini, where each grain of Carnaroli rice is stirred with patience and love. The dish is finished with aged Pecorino and a drizzle of truffle oil that will make you close your eyes in bliss.

Our kitchen team has been working with local Berlin suppliers to source the finest autumn vegetables. The butternut squash for our ravioli comes from a farm just outside the city, while the chestnuts in our dessert are foraged from Brandenburg forests.

The star of our autumn menu is undoubtedly the osso buco alla Milanese. This traditional Lombard dish features veal shanks braised for four hours in white wine, vegetables, and herbs. Served with saffron risotto, it's comfort food that warms both body and soul during Berlin's crisp evenings.

We're also introducing a special wine pairing menu featuring Italian reds that complement autumn flavors – Barolo, Chianti Classico, and a stunning Brunello di Montalcino that pairs beautifully with our game dishes.`,
    author: 'Sous Chef Marco Benedetti',
    date: '2025-09-15',
    category: 'Seasonal Menu',
    readTime: 3,
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: 4,
    title: "Wine Wisdom: Understanding Italian Wine Regions",
    excerpt: "Join our sommelier on a journey through Italy's diverse wine regions and learn to pair wines with your favorite Italian dishes.",
    content: `Italy's wine regions are as diverse as its dialects, each telling a unique story through climate, soil, and centuries of winemaking tradition. At La Cantina, we're passionate about sharing these stories with our guests.

Tuscany, perhaps Italy's most famous wine region, gives us the noble Sangiovese grape. Our Chianti Classico, with its distinctive black rooster seal, offers bright cherry flavors that dance beautifully with tomato-based dishes. Try it with our osso buco or wild boar ragu.

Venturing north to Piedmont, we discover the king of Italian wines – Barolo. Made from Nebbiolo grapes grown in foggy hills, this wine demands patience. Young Barolo can be tannic and bold, but with age develops incredible complexity. We pair it with our aged cheeses and braised meats.

The Veneto region surprises many with its diversity. Beyond Prosecco (perfect for aperitivo), we find Amarone – a wine made from dried grapes that creates rich, concentrated flavors perfect with our chocolate desserts.

Our wine dinners on the first Friday of each month explore different regions. Last month's Sicilian evening featured wines from Mount Etna's volcanic soils paired with dishes showcasing Sicily's Arabic influences. The combination of wine and food transported our guests straight to the Mediterranean.

Remember: wine pairing isn't about rules – it's about discovery and personal taste. Come explore with us!`,
    author: 'Sommelier Elena Conti',
    date: '2025-09-10',
    category: 'Wine & Pairing',
    readTime: 6,
    imageUrl: '/api/placeholder/600/400'
  },
  {
    id: 5,
    title: "Celebrating Traditions: Our Italian Holiday Menu",
    excerpt: "Experience authentic Italian holiday celebrations with special menus that bring the warmth of Italian family traditions to Berlin.",
    content: `In Italy, holidays aren't just dates on a calendar – they're occasions for families to gather, share stories, and create memories around the dinner table. At La Cantina, we bring these cherished traditions to our Berlin family of guests.

This December, we're hosting our first Vigilia di Natale (Christmas Eve) dinner, following the Italian tradition of La Festa dei Sette Pesci – the Feast of Seven Fishes. This southern Italian custom celebrates the anticipation of Christmas with a magnificent seafood feast.

Our seven-course menu features the finest seafood: baccalà mantecato (whipped salt cod) from Venice, Sicilian-style sardines, linguine alle vongole with fresh clams, and bronzino al sale (salt-baked sea bass). Each dish represents a different coastal region of Italy.

For Carnevale in February, we'll transform our dining room with colorful decorations and serve traditional Italian carnival treats. Think frittelle (Venetian carnival fritters), chiacchiere (crispy sweetened pastries), and our special carnival risotto with saffron and pancetta.

Easter brings agnello al forno (roasted lamb) with rosemary and garlic, accompanied by carciofi alla giudia (Jewish-style artichokes) – a dish that tells the beautiful story of Italian-Jewish culinary heritage.

These celebrations aren't just meals; they're cultural experiences that connect us to centuries of Italian tradition. Join us and become part of our extended Italian family in Berlin.`,
    author: 'Chef Antonio Rossi',
    date: '2025-09-05',
    category: 'Traditions',
    readTime: 4,
    imageUrl: '/api/placeholder/600/400'
  }
]

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  const categories = ['All', 'Our Story', 'Kitchen Stories', 'Seasonal Menu', 'Wine & Pairing', 'Traditions']
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="bg-card border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </button>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {selectedPost.category}
              </span>
              <span className="text-muted-foreground text-sm">
                {selectedPost.readTime} min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {selectedPost.title}
            </h1>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>By {selectedPost.author}</span>
              <span>•</span>
              <span>{new Date(selectedPost.date).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
          </header>

          {selectedPost.imageUrl && (
            <div className="mb-12">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {selectedPost.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-muted/30 rounded-xl p-8 mt-12 text-center">
            <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
              Experience Our Italian Traditions
            </h3>
            <p className="text-muted-foreground mb-6">
              Join us at La Cantina Berlin for an authentic taste of Italy in the heart of Berlin.
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Make a Reservation
            </button>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Stories from La Cantina
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the passion, traditions, and stories behind Berlin's most authentic Italian restaurant
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Culinary Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Italian Traditions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            Latest Stories
          </h2>
          {filteredPosts.length > 0 && filteredPosts[0] && (
            <div
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedPost(filteredPosts[0])}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  {filteredPosts[0].imageUrl && (
                    <img
                      src={filteredPosts[0].imageUrl}
                      alt={filteredPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {filteredPosts[0].readTime} min read
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-card-foreground mb-4">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>By {filteredPosts[0].author}</span>
                      <span>•</span>
                      <span>
                        {new Date(filteredPosts[0].date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Other Posts */}
        {filteredPosts.length > 1 && (
          <div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-8">
              More Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.imageUrl && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-muted-foreground text-sm">
                        {post.readTime} min read
                      </span>
                      <span className="text-muted-foreground text-sm">•</span>
                      <span className="text-muted-foreground text-sm">
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {post.author}
                      </span>
                      <div className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all duration-200">
                        <span className="text-sm font-medium">Read</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-primary/5 rounded-2xl p-8 mt-16 text-center">
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Stay Connected with Our Stories
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to receive our latest culinary stories, seasonal menu updates, and exclusive invitations to special events at La Cantina Berlin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}