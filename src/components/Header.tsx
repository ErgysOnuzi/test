'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-600 font-playfair">
              La Cantina
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
              Menu
            </Link>
            <Link href="/reservations" className="text-gray-700 hover:text-red-600 transition-colors">
              Reservations
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
                Menu
              </Link>
              <Link href="/reservations" className="text-gray-700 hover:text-red-600 transition-colors">
                Reservations
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}