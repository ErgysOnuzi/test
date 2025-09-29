import React, { useState } from 'react'
import { Instagram, Grid, ExternalLink, Heart, MessageCircle, Bookmark } from 'lucide-react'
import InstagramEmbed from '../components/InstagramEmbed'

const IG_URLS = [
  'https://www.instagram.com/p/DAvXTRFidcu/',
  'https://www.instagram.com/p/C_vwvupNoNR/',
  'https://www.instagram.com/p/C8HwJgmt8aL/',
  'https://www.instagram.com/p/C6gz8uSiGlb/',
  'https://www.instagram.com/p/C6Mg0uGLdNH/',
  'https://www.instagram.com/p/C4lqzQMrscT/',
  'https://www.instagram.com/p/C4kriK-NmpI/',
  'https://www.instagram.com/p/C0e_9IcLnk-/',
  'https://www.instagram.com/p/Cztz53rN1km/',
  'https://www.instagram.com/p/CroTpxftUqg/',
  'https://www.instagram.com/p/C3xB9KuNmPR/',
  'https://www.instagram.com/p/C2pL7VuoTqX/',
]

// Extract post ID from Instagram URL
const getPostId = (url: string): string => {
  const match = url.match(/\/p\/([^\/]+)\//)
  if (match && match[1]) return match[1]
  const extracted = url.substring(url.lastIndexOf('/') + 1)
  return extracted || 'unknown'
}

// Mock Instagram post data for better presentation
const getPostData = (url: string) => {
  const posts = [
    { id: 'DAvXTRFidcu', caption: 'Fresh handmade pasta ready for tonight\'s dinner service! Our pappardelle with wild boar ragu is a customer favorite. 🍝', likes: 245, date: '3 days ago', imageAlt: 'Fresh handmade pappardelle pasta with wild boar ragu' },
    { id: 'C_vwvupNoNR', caption: 'Behind the scenes: Chef Antonio preparing our signature tiramisu. Every layer is made with love and authentic Italian ingredients ☕', likes: 189, date: '5 days ago', imageAlt: 'Chef Antonio preparing tiramisu in the kitchen' },
    { id: 'C8HwJgmt8aL', caption: 'Wine tasting evening with our sommelier Elena! Discovering the perfect Barolo pairing for our osso buco 🍷', likes: 156, date: '1 week ago', imageAlt: 'Wine tasting event with Italian wines' },
    { id: 'C6gz8uSiGlb', caption: 'Autumn flavors are here! Our new seasonal menu featuring fresh porcini mushrooms from Umbria 🍄', likes: 203, date: '2 weeks ago', imageAlt: 'Seasonal autumn dishes with porcini mushrooms' },
    { id: 'C6Mg0uGLdNH', caption: 'La Cantina family dinner! Nothing beats the warmth of sharing a meal together, just like in Italy 👨‍👩‍👧‍👦', likes: 167, date: '3 weeks ago', imageAlt: 'Family dinner at La Cantina Berlin' },
    { id: 'C4lqzQMrscT', caption: 'Fresh mozzarella being made this morning! The art of Italian cheese making continues in our Berlin kitchen 🧀', likes: 178, date: '1 month ago', imageAlt: 'Fresh mozzarella cheese being made' },
    { id: 'C4kriK-NmpI', caption: 'Celebrating our 6-month anniversary! Thank you Berlin for welcoming us with open arms 🎉', likes: 298, date: '1 month ago', imageAlt: 'La Cantina Berlin anniversary celebration' },
    { id: 'C0e_9IcLnk-', caption: 'Sunday pasta workshop in action! Learning the secrets of authentic Italian pasta making 👩‍🍳', likes: 134, date: '2 months ago', imageAlt: 'Pasta making workshop with customers' },
    { id: 'Cztz53rN1km', caption: 'Our wood-fired oven bringing the taste of Naples to Berlin! Perfect pizza margherita every time 🔥', likes: 221, date: '2 months ago', imageAlt: 'Wood-fired pizza oven with margherita pizza' },
    { id: 'CroTpxftUqg', caption: 'Opening day memories! The journey from Tuscany to Berlin begins here at La Cantina 🇮🇹', likes: 345, date: '6 months ago', imageAlt: 'La Cantina Berlin opening day celebration' },
    { id: 'C3xB9KuNmPR', caption: 'Truffle season is here! Our special truffle risotto with freshly shaved black truffles 🍄‍⬛', likes: 267, date: '3 months ago', imageAlt: 'Truffle risotto with freshly shaved black truffles' },
    { id: 'C2pL7VuoTqX', caption: 'Meet our kitchen team! The passionate chefs who bring authentic Italian flavors to your table every day 👨‍🍳', likes: 189, date: '4 months ago', imageAlt: 'La Cantina kitchen team portrait' }
  ]
  
  const postId = getPostId(url)
  return posts.find(p => p.id === postId) ?? posts[0]!
}

export default function InstagramPage() {
  const [showAll, setShowAll] = useState(false)
  const [selectedView, setSelectedView] = useState<'feed' | 'gallery'>('gallery')
  
  const postsToShow = showAll ? IG_URLS : IG_URLS.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Instagram className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            @lacantina.berlin
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Follow our culinary journey from Tuscany to Berlin. Fresh pasta, authentic flavors, and Italian traditions shared daily.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg mb-8">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6" />
              <span>2.1k followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Grid className="w-6 h-6" />
              <span>127 posts</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span>Italian cuisine</span>
            </div>
          </div>
          <a
            href="https://instagram.com/lacantina.berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-white/90 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200"
          >
            <Instagram className="w-6 h-6" />
            Follow on Instagram
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted rounded-full p-1 flex">
            <button
              onClick={() => setSelectedView('feed')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedView === 'feed'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Feed View
            </button>
            <button
              onClick={() => setSelectedView('gallery')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedView === 'gallery'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="w-4 h-4" />
              Gallery View
            </button>
          </div>
        </div>

        {/* Instagram Posts */}
        {selectedView === 'feed' ? (
          <div className="space-y-12">
            {postsToShow.map((url) => {
              const postData = getPostData(url)
              return (
                <article key={url} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                  {/* Post Header */}
                  <div className="flex items-center gap-4 p-6 border-b border-border">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">LC</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">lacantina.berlin</h3>
                      <p className="text-sm text-muted-foreground">{postData.date}</p>
                    </div>
                    <div className="ml-auto">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Instagram Embed */}
                  <div className="aspect-square max-w-full">
                    <InstagramEmbed url={url} />
                  </div>

                  {/* Post Footer */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-6 h-6" />
                        <span className="font-medium">{postData.likes}</span>
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Bookmark className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-card-foreground leading-relaxed">
                      <span className="font-semibold">lacantina.berlin</span> {postData.caption}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsToShow.map((url) => {
              const postData = getPostData(url)
              return (
                <div key={url} className="group">
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-square">
                      <InstagramEmbed url={url} />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {postData.caption}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{postData.likes}</span>
                        </div>
                        <span>{postData.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Show More Button */}
        {!showAll && IG_URLS.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Show All Posts ({IG_URLS.length - 6} more)
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mt-16 text-center">
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Experience La Cantina in Person
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Follow us on Instagram for daily behind-the-scenes content, and visit us in Berlin for an authentic taste of Italy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://instagram.com/lacantina.berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
              Follow @lacantina.berlin
            </a>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Make a Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}