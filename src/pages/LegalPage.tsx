import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function LegalPage() {
  const { locale } = useParams<{ locale: string }>()
  const isGerman = locale === 'de'
  const [activeSection, setActiveSection] = useState('impressum')

  const sections = [
    { id: 'impressum', title: isGerman ? 'Impressum' : 'Legal Notice' },
    { id: 'datenschutz', title: isGerman ? 'Datenschutz' : 'Privacy Policy' },
    { id: 'agb', title: isGerman ? 'AGB' : 'Terms & Conditions' },
    { id: 'cookies', title: isGerman ? 'Cookie-Richtlinie' : 'Cookie Policy' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {isGerman ? 'Rechtliche Hinweise' : 'Legal Information'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {isGerman 
              ? 'Transparenz und Rechtssicherheit für unsere Gäste'
              : 'Transparency and legal security for our guests'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                {isGerman ? 'Rechtsbereiche' : 'Legal Sections'}
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border p-8 shadow-sm">

              {/* Impressum Section */}
              {activeSection === 'impressum' && (
                <div>
                  <h2 className="text-3xl font-serif font-bold text-card-foreground mb-8">
                    {isGerman ? 'Impressum' : 'Legal Notice'}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-card-foreground mb-4">
                        {isGerman ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}
                      </h3>
                      <div className="space-y-2">
                        <p className="font-semibold text-primary">Ristorante La Cantina Berlin</p>
                        <p>Bleibtreustraße 49</p>
                        <p>10623 Berlin-Charlottenburg</p>
                        <p>Deutschland</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/30 rounded-lg p-6">
                        <h4 className="font-semibold text-card-foreground mb-3">
                          {isGerman ? 'Kontakt' : 'Contact'}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>{isGerman ? 'Telefon:' : 'Phone:'}</strong> +49 30 881 6562</p>
                          <p><strong>{isGerman ? 'E-Mail:' : 'Email:'}</strong> info@lacantina-berlin.de</p>
                          <p><strong>Web:</strong> www.lacantina-berlin.de</p>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-6">
                        <h4 className="font-semibold text-card-foreground mb-3">
                          {isGerman ? 'Geschäftsführung' : 'Management'}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>Chef Antonio Rossi</p>
                          <p className="text-muted-foreground text-xs">
                            {isGerman 
                              ? 'Handelsregister-Anmeldung bei Gewerbeanmeldung'
                              : 'Commercial registration upon business registration'}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {isGerman 
                              ? 'Umsatzsteuer-ID wird bei Erreichen der Umsatzgrenze beantragt'
                              : 'VAT ID will be applied for when turnover threshold is reached'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6">
                      <h4 className="font-semibold text-card-foreground mb-3">
                        {isGerman ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for content according to § 55 para. 2 RStV'}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>Antonio Rossi</p>
                        <p>Bleibtreustraße 49, 10623 Berlin</p>
                      </div>
                    </div>

                    {isGerman && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Streitschlichtung</h4>
                        <p className="text-sm text-yellow-700">
                          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                          <a href="https://ec.europa.eu/consumers/odr" className="underline hover:text-primary" target="_blank" rel="noopener">
                            https://ec.europa.eu/consumers/odr
                          </a>
                          <br />Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Privacy Policy Section */}
              {activeSection === 'datenschutz' && (
                <div>
                  <h2 className="text-3xl font-serif font-bold text-card-foreground mb-8">
                    {isGerman ? 'Datenschutzerklärung' : 'Privacy Policy'}
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        {isGerman ? 'Datenschutz auf einen Blick' : 'Privacy at a Glance'}
                      </h3>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                        <p className="text-sm text-blue-800">
                          {isGerman 
                            ? 'Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (EU-DSGVO, TKG). In dieser Datenschutzinformation informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.'
                            : 'The protection of your personal data is of particular concern to us. We therefore process your data exclusively on the basis of legal provisions (EU-GDPR, TKG). In this privacy information, we inform you about the most important aspects of data processing within our website.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/30 rounded-lg p-6">
                        <h4 className="font-semibold text-card-foreground mb-3">
                          {isGerman ? 'Datenerfassung auf dieser Website' : 'Data Collection on this Website'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {isGerman
                            ? 'Die Datenverarbeitung erfolgt durch den Websitebetreiber. Kontaktdaten im Impressum.'
                            : 'Data processing is carried out by the website operator. Contact details in the legal notice.'}
                        </p>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-6">
                        <h4 className="font-semibold text-card-foreground mb-3">
                          {isGerman ? 'Ihre Rechte' : 'Your Rights'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {isGerman
                            ? 'Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.'
                            : 'Information, correction, deletion and restriction of processing of your data.'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        {isGerman ? 'Datenverarbeitung im Detail' : 'Data Processing in Detail'}
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="border border-border rounded-lg p-6">
                          <h4 className="font-semibold text-card-foreground mb-3">
                            {isGerman ? 'Reservierungen' : 'Reservations'}
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• {isGerman ? 'Zweck: Tischreservierung und Kontaktaufnahme' : 'Purpose: Table reservation and contact'}</li>
                            <li>• {isGerman ? 'Daten: Name, E-Mail, Telefon, Personenanzahl' : 'Data: Name, email, phone, number of guests'}</li>
                            <li>• {isGerman ? 'Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)' : 'Legal basis: Contract fulfillment (Art. 6 para. 1 lit. b GDPR)'}</li>
                            <li>• {isGerman ? 'Speicherdauer: 2 Jahre nach Reservierung' : 'Storage period: 2 years after reservation'}</li>
                          </ul>
                        </div>

                        <div className="border border-border rounded-lg p-6">
                          <h4 className="font-semibold text-card-foreground mb-3">
                            {isGerman ? 'Kontaktformular & Feedback' : 'Contact Form & Feedback'}
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• {isGerman ? 'Zweck: Bearbeitung von Anfragen und Feedback' : 'Purpose: Processing inquiries and feedback'}</li>
                            <li>• {isGerman ? 'Daten: Name, E-Mail, Nachrichteninhalt' : 'Data: Name, email, message content'}</li>
                            <li>• {isGerman ? 'Rechtsgrundlage: Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)' : 'Legal basis: Legitimate interest (Art. 6 para. 1 lit. f GDPR)'}</li>
                            <li>• {isGerman ? 'Speicherdauer: 1 Jahr nach Bearbeitung' : 'Storage period: 1 year after processing'}</li>
                          </ul>
                        </div>

                        <div className="border border-border rounded-lg p-6">
                          <h4 className="font-semibold text-card-foreground mb-3">
                            {isGerman ? 'Server-Log-Files' : 'Server Log Files'}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {isGerman 
                              ? 'Bei jedem Aufruf unserer Website erfassen wir automatisch Informationen:'
                              : 'Every time you visit our website, we automatically collect information:'}
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• {isGerman ? 'IP-Adresse (anonymisiert nach 7 Tagen)' : 'IP address (anonymized after 7 days)'}</li>
                            <li>• {isGerman ? 'Browsertyp und Version' : 'Browser type and version'}</li>
                            <li>• {isGerman ? 'Verwendetes Betriebssystem' : 'Operating system used'}</li>
                            <li>• {isGerman ? 'Zugriffsdatum und -zeit' : 'Date and time of access'}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-green-800 mb-3">
                        {isGerman ? 'Ihre Rechte nach der DSGVO' : 'Your Rights under GDPR'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                        <ul className="space-y-1">
                          <li>• {isGerman ? 'Recht auf Auskunft (Art. 15 DSGVO)' : 'Right to information (Art. 15 GDPR)'}</li>
                          <li>• {isGerman ? 'Recht auf Berichtigung (Art. 16 DSGVO)' : 'Right to rectification (Art. 16 GDPR)'}</li>
                          <li>• {isGerman ? 'Recht auf Löschung (Art. 17 DSGVO)' : 'Right to erasure (Art. 17 GDPR)'}</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>• {isGerman ? 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)' : 'Right to data portability (Art. 20 GDPR)'}</li>
                          <li>• {isGerman ? 'Widerspruchsrecht (Art. 21 DSGVO)' : 'Right to object (Art. 21 GDPR)'}</li>
                          <li>• {isGerman ? 'Beschwerderecht bei Aufsichtsbehörde' : 'Right to complain to supervisory authority'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms & Conditions Section */}
              {activeSection === 'agb' && (
                <div>
                  <h2 className="text-3xl font-serif font-bold text-card-foreground mb-8">
                    {isGerman ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions'}
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                      <h3 className="text-lg font-semibold text-orange-800 mb-2">
                        {isGerman ? 'Gültigkeit' : 'Validity'}
                      </h3>
                      <p className="text-sm text-orange-700">
                        {isGerman 
                          ? 'Mit der Nutzung unserer Dienstleistungen akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen. Stand: September 2025.'
                          : 'By using our services, you accept our Terms and Conditions. Last updated: September 2025.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                          {isGerman ? 'Reservierungen' : 'Reservations'}
                        </h3>
                        <div className="space-y-4">
                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Reservierungsbedingungen' : 'Reservation Conditions'}
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• {isGerman ? 'Reservierung telefonisch oder online möglich' : 'Reservations by phone or online'}</li>
                              <li>• {isGerman ? 'Bestätigung erfolgt binnen 24 Stunden' : 'Confirmation within 24 hours'}</li>
                              <li>• {isGerman ? 'Tisch wird 15 Minuten nach Reservierungszeit freigegeben' : 'Table released 15 minutes after reservation time'}</li>
                              <li>• {isGerman ? 'Kostenlose Stornierung bis 2 Stunden vorher' : 'Free cancellation up to 2 hours before'}</li>
                            </ul>
                          </div>

                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'No-Show Policy' : 'No-Show Policy'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {isGerman 
                                ? 'Bei Nichterscheinen ohne Absage behalten wir uns vor, eine Ausfallgebühr von €25 pro Person zu erheben.'
                                : 'In case of no-show without cancellation, we reserve the right to charge a cancellation fee of €25 per person.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                          {isGerman ? 'Öffnungszeiten & Service' : 'Opening Hours & Service'}
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Öffnungszeiten' : 'Opening Hours'}
                            </h4>
                            <div className="text-sm space-y-1">
                              <p><strong>{isGerman ? 'Täglich:' : 'Daily:'}</strong> 17:00 - 23:00</p>
                              <p><strong>{isGerman ? 'Küche:' : 'Kitchen:'}</strong> {isGerman ? 'bis 22:00 Uhr' : 'until 22:00'}</p>
                              <p><strong>{isGerman ? 'Letzte Reservierung:' : 'Last reservation:'}</strong> 21:30</p>
                            </div>
                          </div>

                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Besondere Anlässe' : 'Special Occasions'}
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• {isGerman ? 'Geburtstage und Jubiläen kostenlos' : 'Birthdays and anniversaries free'}</li>
                              <li>• {isGerman ? 'Gruppenbuchungen ab 8 Personen' : 'Group bookings from 8 people'}</li>
                              <li>• {isGerman ? 'Private Events nach Vereinbarung' : 'Private events by arrangement'}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        {isGerman ? 'Zahlungsbedingungen & Preise' : 'Payment Terms & Prices'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-semibold text-card-foreground mb-2">
                            {isGerman ? 'Zahlungsmittel' : 'Payment Methods'}
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• {isGerman ? 'Bargeld' : 'Cash'}</li>
                            <li>• EC-Karte</li>
                            <li>• Visa/Mastercard</li>
                            <li>• PayPal (online)</li>
                          </ul>
                        </div>

                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-semibold text-card-foreground mb-2">
                            {isGerman ? 'Preise' : 'Prices'}
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• {isGerman ? 'Alle Preise inkl. MwSt.' : 'All prices incl. VAT'}</li>
                            <li>• {isGerman ? 'Preise können sich ändern' : 'Prices subject to change'}</li>
                            <li>• {isGerman ? 'Gruppenrabatte möglich' : 'Group discounts available'}</li>
                          </ul>
                        </div>

                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-semibold text-card-foreground mb-2">
                            {isGerman ? 'Trinkgeld' : 'Gratuity'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {isGerman 
                              ? 'Trinkgeld ist freiwillig. Üblich sind 8-10% bei zufriedener Service.'
                              : 'Gratuity is voluntary. 8-10% is customary for satisfactory service.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        {isGerman ? 'Haftung & Gewährleistung' : 'Liability & Warranty'}
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                          <h4 className="font-semibold text-red-800 mb-2">
                            {isGerman ? 'Haftungsausschluss' : 'Disclaimer'}
                          </h4>
                          <p className="text-sm text-red-700">
                            {isGerman
                              ? 'Wir haften nicht für Schäden an mitgebrachten Gegenständen. Die Haftung bei Vorsatz und grober Fahrlässigkeit bleibt unberührt.'
                              : 'We are not liable for damage to personal items brought in. Liability for intent and gross negligence remains unaffected.'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Allergien & Unverträglichkeiten' : 'Allergies & Intolerances'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {isGerman
                                ? 'Bitte informieren Sie uns über Allergien. Wir bemühen uns, können jedoch Kreuzkontaminationen nicht ausschließen.'
                                : 'Please inform us about allergies. We try our best but cannot exclude cross-contamination.'}
                            </p>
                          </div>

                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Hausordnung' : 'House Rules'}
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• {isGerman ? 'Respektvoller Umgang' : 'Respectful behavior'}</li>
                              <li>• {isGerman ? 'Bitte Handy stumm' : 'Please silence phones'}</li>
                              <li>• {isGerman ? 'Keine Haustiere (außer Assistenzhunde)' : 'No pets (except service dogs)'}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6">
                      <h4 className="font-semibold text-card-foreground mb-3">
                        {isGerman ? 'Gerichtsstand & Anwendbares Recht' : 'Jurisdiction & Applicable Law'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {isGerman 
                          ? 'Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Gültigkeit der übrigen Bestimmungen unberührt.'
                          : 'The law of the Federal Republic of Germany applies. Place of jurisdiction is Berlin. Should individual provisions be invalid, the validity of the remaining provisions remains unaffected.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cookie Policy Section */}
              {activeSection === 'cookies' && (
                <div>
                  <h2 className="text-3xl font-serif font-bold text-card-foreground mb-8">
                    {isGerman ? 'Cookie-Richtlinie' : 'Cookie Policy'}
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">
                        {isGerman ? 'Was sind Cookies?' : 'What are Cookies?'}
                      </h3>
                      <p className="text-sm text-blue-700">
                        {isGerman 
                          ? 'Diese Website verwendet nur technisch notwendige Cookies für den Betrieb der Website. Wir setzen keine Marketing- oder Tracking-Cookies ein.'
                          : 'This website only uses technically necessary cookies for website operation. We do not use marketing or tracking cookies.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                          {isGerman ? 'Cookie-Arten' : 'Types of Cookies'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                              {isGerman ? 'Notwendige Cookies' : 'Necessary Cookies'}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {isGerman 
                                ? 'Diese Cookies sind für das Funktionieren der Website erforderlich.'
                                : 'These cookies are necessary for the website to function.'}
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>• {isGerman ? 'Session-Verwaltung' : 'Session management'}</li>
                              <li>• {isGerman ? 'Sicherheitseinstellungen' : 'Security settings'}</li>
                              <li>• {isGerman ? 'Spracheinstellungen' : 'Language preferences'}</li>
                            </ul>
                          </div>

                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                              {isGerman ? 'Funktionale Cookies' : 'Functional Cookies'}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {isGerman 
                                ? 'Verbessern die Benutzererfahrung durch Speicherung von Präferenzen.'
                                : 'Improve user experience by storing preferences.'}
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>• {isGerman ? 'Reservierungsformular-Daten' : 'Reservation form data'}</li>
                              <li>• {isGerman ? 'Menü-Filtereinstellungen' : 'Menu filter settings'}</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground mb-4">
                          {isGerman ? 'Cookie-Verwaltung' : 'Cookie Management'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Ihre Wahlmöglichkeiten' : 'Your Choices'}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {isGerman
                                ? 'Sie können Cookies in Ihrem Browser verwalten:'
                                : 'You can manage cookies in your browser:'}
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• {isGerman ? 'Cookies deaktivieren' : 'Disable cookies'}</li>
                              <li>• {isGerman ? 'Cookies löschen' : 'Delete cookies'}</li>
                              <li>• {isGerman ? 'Benachrichtigungen aktivieren' : 'Enable notifications'}</li>
                            </ul>
                          </div>

                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-card-foreground mb-2">
                              {isGerman ? 'Browser-Einstellungen' : 'Browser Settings'}
                            </h4>
                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                              <div>
                                <p className="font-medium">Chrome:</p>
                                <p>Einstellungen → Datenschutz</p>
                              </div>
                              <div>
                                <p className="font-medium">Firefox:</p>
                                <p>Optionen → Datenschutz</p>
                              </div>
                              <div>
                                <p className="font-medium">Safari:</p>
                                <p>Einstellungen → Datenschutz</p>
                              </div>
                              <div>
                                <p className="font-medium">Edge:</p>
                                <p>Einstellungen → Cookies</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-4">
                        {isGerman ? 'Verwendete Cookies im Detail' : 'Cookies Used in Detail'}
                      </h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted/30">
                              <th className="border border-border p-3 text-left text-sm font-semibold">
                                {isGerman ? 'Cookie-Name' : 'Cookie Name'}
                              </th>
                              <th className="border border-border p-3 text-left text-sm font-semibold">
                                {isGerman ? 'Zweck' : 'Purpose'}
                              </th>
                              <th className="border border-border p-3 text-left text-sm font-semibold">
                                {isGerman ? 'Laufzeit' : 'Duration'}
                              </th>
                              <th className="border border-border p-3 text-left text-sm font-semibold">
                                {isGerman ? 'Typ' : 'Type'}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-border p-3 text-sm font-mono">vite_session</td>
                              <td className="border border-border p-3 text-sm">
                                {isGerman ? 'Technische Session-Verwaltung' : 'Technical session management'}
                              </td>
                              <td className="border border-border p-3 text-sm">Session</td>
                              <td className="border border-border p-3 text-sm">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {isGerman ? 'Notwendig' : 'Necessary'}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-border p-3 text-sm font-mono">theme_preference</td>
                              <td className="border border-border p-3 text-sm">
                                {isGerman ? 'Speichert Ihre Darstellungspräferenzen' : 'Stores your display preferences'}
                              </td>
                              <td className="border border-border p-3 text-sm">{isGerman ? 'Lokal' : 'Local'}</td>
                              <td className="border border-border p-3 text-sm">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {isGerman ? 'Notwendig' : 'Necessary'}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6">
                      <h4 className="font-semibold text-card-foreground mb-3">
                        {isGerman ? 'Aktualisierung der Cookie-Richtlinie' : 'Cookie Policy Updates'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {isGerman 
                          ? 'Diese Cookie-Richtlinie kann von Zeit zu Zeit aktualisiert werden. Die neueste Version finden Sie immer auf dieser Seite. Letzte Aktualisierung: September 2025.'
                          : 'This Cookie Policy may be updated from time to time. You can always find the latest version on this page. Last updated: September 2025.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center mt-12">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <p>
              {isGerman
                ? 'Stand: September 2025'
                : 'Last updated: September 2025'}
            </p>
            <div className="w-px h-4 bg-border" />
            <p>
              {isGerman
                ? 'Bei Fragen kontaktieren Sie uns gerne'
                : 'Please contact us if you have any questions'}
            </p>
            <div className="w-px h-4 bg-border" />
            <a
              href="mailto:info@lacantina-berlin.de"
              className="text-primary hover:underline"
            >
              info@lacantina-berlin.de
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}