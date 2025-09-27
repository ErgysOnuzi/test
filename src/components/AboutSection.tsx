import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-charcoal-dark mb-6 font-playfair">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              For over two decades, La Cantina has been serving authentic Italian cuisine 
              in the heart of Berlin. Our commitment to traditional recipes, fresh ingredients, 
              and warm hospitality has made us a beloved destination for food lovers.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              From handmade pasta to wood-fired pizzas, every dish tells a story of 
              Italian tradition and culinary excellence. Join us for an unforgettable 
              dining experience that transports you straight to Italy.
            </p>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">20+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="relative h-96 lg:h-full">
            <Image
              src="/images/italian-food-spread.jpg"
              alt="Italian food spread"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}