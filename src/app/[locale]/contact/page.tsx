import React from 'react';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif text-center mb-12 text-primary font-bold">
            {t('title')}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('address')}</h3>
                    <p className="text-muted-foreground">
                      Bleibtreustr. 17<br />
                      10623 Berlin<br />
                      Germany
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('phone')}</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+49308832156" className="text-primary hover:text-primary/80 transition-colors">030 8832156</a>
                    </p>
                    <p className="text-sm text-muted-foreground">{t('available_business_hours')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('email')}</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@ristorante-la-cantina.de" className="text-primary hover:text-primary/80 transition-colors">info@ristorante-la-cantina.de</a>
                    </p>
                    <p className="text-muted-foreground">
                      {t('reservations')}: <a href="mailto:reservierung@ristorante-la-cantina.de" className="text-primary hover:text-primary/80 transition-colors">reservierung@ristorante-la-cantina.de</a>
                    </p>
                    <p className="text-sm text-muted-foreground">{t('typically_respond_24h')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('opening_hours')}</h3>
                    <div className="text-muted-foreground space-y-1">
                      <div>{t('monday_thursday')}</div>
                      <div>{t('friday_saturday')}</div>
                      <div>{t('sunday')}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interactive Map */}
              <div className="w-full h-64 rounded-xl border border-border overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.7936507309896!2d13.328887515779825!3d52.50311597981305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85157b5b7df77%3A0x4a43316dc4e7e079!2sBleibtreustra%C3%9Fe%2017%2C%2010623%20Berlin%2C%20Germany!5e0!3m2!1sen!2s!4v1640995200000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lacantina Bleibtreu Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                {t('send_us_message')}
              </h2>
              <div className="bg-card rounded-xl shadow-lg border border-border p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}