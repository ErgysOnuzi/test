import React from 'react'
import { useParams } from 'react-router-dom'

export default function LegalPage() {
  const { locale } = useParams<{ locale: string }>()
  const isGerman = locale === 'de'

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '30px', color: '#333', textAlign: 'center' }}>
        {isGerman ? 'Rechtliche Hinweise' : 'Legal Information'}
      </h1>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#d4a574' }}>
          {isGerman ? 'Impressum' : 'Legal Notice'}
        </h2>
        <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
            Ristorante La Cantina Bleibtreu
          </p>
          <p style={{ margin: '0 0 5px 0' }}>Bleibtreustraße 49</p>
          <p style={{ margin: '0 0 5px 0' }}>10623 Berlin</p>
          <p style={{ margin: '0 0 5px 0' }}>Deutschland</p>
          <p style={{ margin: '0 0 5px 0' }}>
            {isGerman ? 'Telefon:' : 'Phone:'} +49 30 881 6562
          </p>
          <p style={{ margin: '0' }}>
            {isGerman ? 'E-Mail:' : 'Email:'} info@lacantina-berlin.de
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#d4a574' }}>
          {isGerman ? 'Datenschutz' : 'Privacy Policy'}
        </h2>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          {isGerman 
            ? 'Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).'
            : 'The protection of your personal data is of particular concern to us. We therefore process your data exclusively on the basis of legal provisions (GDPR, TKG 2003).'}
        </p>
        
        <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
          {isGerman ? 'Datenerfassung auf dieser Website' : 'Data Collection on this Website'}
        </h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          {isGerman
            ? 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.'
            : 'Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice of this website.'}
        </p>

        <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
          {isGerman ? 'Kontaktformular' : 'Contact Form'}
        </h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          {isGerman
            ? 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.'
            : 'If you send us inquiries via the contact form, your details from the inquiry form, including the contact data you provide there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions.'}
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#d4a574' }}>
          {isGerman ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions'}
        </h2>
        
        <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
          {isGerman ? 'Reservierungen' : 'Reservations'}
        </h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          {isGerman
            ? 'Tischreservierungen sind telefonisch oder über unser Online-Formular möglich. Bei Nichterscheinen ohne Absage behalten wir uns vor, eine Ausfallgebühr zu erheben.'
            : 'Table reservations can be made by phone or through our online form. In case of no-show without cancellation, we reserve the right to charge a cancellation fee.'}
        </p>

        <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
          {isGerman ? 'Öffnungszeiten' : 'Opening Hours'}
        </h3>
        <div style={{ backgroundColor: '#f8f8f8', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <p style={{ margin: '0 0 5px 0' }}>
            {isGerman ? 'Montag - Sonntag:' : 'Monday - Sunday:'} 17:00 - 23:00
          </p>
          <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>
            {isGerman ? 'Küche bis 22:00 Uhr' : 'Kitchen until 22:00'}
          </p>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
          {isGerman ? 'Haftungsausschluss' : 'Disclaimer'}
        </h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          {isGerman
            ? 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.'
            : 'The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.'}
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          {isGerman
            ? 'Stand: September 2025 | Bei Fragen kontaktieren Sie uns gerne.'
            : 'Last updated: September 2025 | Please contact us if you have any questions.'}
        </p>
      </div>
    </div>
  )
}