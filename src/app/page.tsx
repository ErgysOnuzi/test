export default function HomePage() {
  return (
    <div className="min-h-screen bg-black bg-cover bg-center bg-no-repeat relative" 
         style={{
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/restaurant-interior.jpg')`
         }}>
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Ristorante La<br />
          Cantina<br />
          Bleibtreu
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl italic mb-8 font-light">
          Italienische Küche nahe Ku'damm
        </p>
        
        {/* Description Text */}
        <p className="text-base md:text-lg leading-relaxed max-w-md mb-12 font-light">
          Es gibt viele Cantinas in Berlin – aber es gibt nur eine Ristorante La Cantina Bleibtreu. Seit März 2025 begann für das traditionsreiche Ristorante ein neues Kapitel mit frischer Energie, einem neuen Team und unserer Philosophie: bleiben, genießen, verweilen.
        </p>
        
        {/* Reserve Button */}
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-colors duration-300">
          Tisch reservieren
        </button>
        
      </div>
    </div>
  );
}