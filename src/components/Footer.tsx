import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-4 font-playfair">
              La Cantina
            </h3>
            <p className="text-gray-400 mb-4">
              Authentic Italian cuisine in the heart of Berlin. 
              Experience tradition, taste, and hospitality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">TripAdvisor</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-gray-400 hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/reservations" className="text-gray-400 hover:text-white transition-colors">Reservations</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mitte District, Berlin</li>
              <li>+49 30 123 4567</li>
              <li>info@lacantina-berlin.de</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mon-Thu: 5:00 PM - 11:00 PM</li>
              <li>Fri-Sat: 5:00 PM - 12:00 AM</li>
              <li>Sun: 4:00 PM - 10:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 La Cantina Berlin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}