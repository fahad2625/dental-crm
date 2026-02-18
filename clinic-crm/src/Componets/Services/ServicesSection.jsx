import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      title: "General Cleaning",
      description: "Routine checkups and professional cleaning.",
      icon: "🦷",
    },
    {
      title: "Cosmetic Whitening",
      description: "Brighten your smile safely and effectively.",
      icon: "✨",
    },
    {
      title: "Dental Implants",
      description: "Permanent replacement for missing teeth.",
      icon: "🦷",
    },
    {
      title: "Orthodontics",
      description: "Braces and aligners for perfect alignment.",
      icon: "😁",
    },
  ];

  return (
    <section
      id="services"
      className="bg-white py-20 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="mt-3 text-gray-600">
            Complete dental care designed for your comfort.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
