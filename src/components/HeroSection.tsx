import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/restaurant-interior.jpg"
          alt="La Cantina Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair">
          Welcome to La Cantina
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Authentic Italian cuisine in the heart of Berlin
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
            Reserve a Table
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md text-lg font-medium transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
}