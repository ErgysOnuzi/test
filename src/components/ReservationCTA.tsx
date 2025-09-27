export default function ReservationCTA() {
  return (
    <section className="py-20 bg-charcoal-dark text-white">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6 font-playfair">
          Ready for an Authentic Italian Experience?
        </h2>
        <p className="text-xl mb-8 text-gray-300">
          Book your table now and let us transport you to the heart of Italy 
          with our exceptional cuisine and warm hospitality.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
            Make a Reservation
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-charcoal-dark px-8 py-3 rounded-md text-lg font-medium transition-colors">
            Call Us: +49 30 123 4567
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
            <p className="text-gray-300">
              Mon-Thu: 5:00 PM - 11:00 PM<br />
              Fri-Sat: 5:00 PM - 12:00 AM<br />
              Sun: 4:00 PM - 10:00 PM
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-gray-300">
              Mitte District<br />
              Berlin, Germany<br />
              Near Alexanderplatz
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-300">
              +49 30 123 4567<br />
              info@lacantina-berlin.de<br />
              @LaCantinaberlin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}