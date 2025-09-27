const menuItems = [
  {
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, pecorino cheese, pancetta, and black pepper',
    price: '€16'
  },
  {
    name: 'Margherita Pizza',
    description: 'Traditional Neapolitan pizza with San Marzano tomatoes, mozzarella di bufala, and fresh basil',
    price: '€14'
  },
  {
    name: 'Osso Buco',
    description: 'Braised veal shanks with vegetables, white wine and broth, served with risotto',
    price: '€28'
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with ladyfingers, espresso, mascarpone, and cocoa',
    price: '€8'
  }
];

export default function MenuHighlights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal-dark mb-4 font-playfair">
            Menu Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our signature dishes crafted with the finest Italian ingredients 
            and traditional cooking methods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-warm-cream p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-charcoal-dark mb-3 font-playfair">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="text-2xl font-bold text-red-600">
                {item.price}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}