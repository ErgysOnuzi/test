"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  // Remove locale from pathname for comparison
  const pathWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/';

  const navigation = [
    { name: t('home'), href: `/${locale}`, key: "home" },
    { name: t('menu'), href: `/${locale}/menu`, key: "menu" },
    { name: t('reservations'), href: `/${locale}/reservations`, key: "reservations" },
    { name: t('gallery'), href: `/${locale}/gallery`, key: "gallery" },
    { name: t('events'), href: `/${locale}/events`, key: "events" },
    { name: t('blog'), href: `/${locale}/blog`, key: "blog" },
    { name: t('contact'), href: `/${locale}/contact`, key: "contact" },
  ];

  return (
    <header className="bg-background/90 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} prefetch={true} className="block" data-testid="link-home">
              <h1 className="text-2xl font-serif font-bold text-primary">
                La Cantina
              </h1>
              <p className="text-xs text-muted-foreground font-script">Berlin</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`text-foreground hover:text-primary transition-colors duration-200 ${
                  pathWithoutLocale === item.href ? "text-primary font-medium" : ""
                }`}
                data-testid={`link-${item.key}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Link href={`/${locale}/reservations`} prefetch={true}>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors" data-testid="button-reserve">
                {t('reservations')}
              </button>
            </Link>
          </div>

          {/* Mobile Language Toggle & Menu */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              className="p-2 hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={`block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 rounded-md ${
                    pathWithoutLocale === item.href ? "text-primary font-medium bg-accent/50" : ""
                  }`}
                  data-testid={`mobile-link-${item.key}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link href={`/${locale}/reservations`} prefetch={true}>
                  <button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors" 
                    data-testid="button-mobile-reserve" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('reservations')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}