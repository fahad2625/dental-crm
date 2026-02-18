const LocationSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Visit Our Clinic
          </h2>

          <p className="mt-4 text-gray-600">
            We are conveniently located and equipped with modern facilities to
            give you the best dental care experience.
          </p>

          <div className="mt-6 space-y-4 text-gray-700">
            <div>
              <span className="font-semibold">📍 Address:</span>
              <br />
             Thrissur - Palghat Rd,
              <br />
               Paravattani, Thrissur
            </div>

            <div>
              <span className="font-semibold">⏰ Working Hours:</span>
              <br />
              Mon – Sat: 9:00 AM – 7:00 PM
              <br />
              Sunday: Closed
            </div>

            <div>
              <span className="font-semibold">📞 Phone:</span>
              <br />
              +91 98765 43210
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-sm">
      <iframe
  title="Krishna Dental Clinic"
  src="https://www.google.com/maps?q=10.5227381,76.2442876&output=embed"
  className="w-full h-full border-0"
  loading="lazy"
></iframe>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
