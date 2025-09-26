"use client";
import React from 'react';
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('nav');
  const footerT = useTranslations('footer');
  const locale = useLocale();
  
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="md:text-left">
              <h3 className="text-xl font-serif font-bold text-primary mb-4">Ristorante La Cantina Bleibtreu</h3>
              <p className="text-muted-foreground leading-relaxed">
                {footerT('description')}
              </p>
            </div>
            
            <div className="md:text-center">
              <h4 className="font-semibold mb-4 text-foreground">{footerT('opening_hours')}</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>{footerT('monday_saturday')}</p>
                <p>{footerT('sunday')}</p>
              </div>
            </div>
            
            <div className="md:text-right">
              <h4 className="font-semibold mb-4 text-foreground">{footerT('contact')}</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>{footerT('address_street')}</p>
                <p>{footerT('address_city')}</p>
                <p>{footerT('phone')}</p>
                <p className="text-primary hover:underline">
                  <a href="mailto:info@ristorante-la-cantina.de" data-testid="link-email">{footerT('email')}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8">
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a 
              href="https://instagram.com/lacantina.berlin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com/lacantina.berlin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://tiktok.com/@lacantina.berlin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              aria-label="Follow us on TikTok"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 112.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 15.67a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.37z"/>
              </svg>
            </a>
            <a 
              href="mailto:info@ristorante-la-cantina.de"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              aria-label="Send us an email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="tel:+493088321560"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
          
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-center">
            <p className="text-muted-foreground text-sm">
              {footerT('copyright')}
            </p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link 
                href={`/${locale}/feedback`} 
                className="text-muted-foreground hover:text-primary hover:underline text-sm transition-colors font-medium"
                data-testid="link-feedback"
              >
                {footerT('feedback')}
              </Link>
              <Link 
                href={`/${locale}/legal`} 
                className="text-muted-foreground hover:text-primary hover:underline text-sm transition-colors font-medium"
                data-testid="link-legal"
              >
                {t('legal')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}