const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Clinic Info */}
        <div>
          <h3 className="text-xl font-semibold text-white">
            Krishna Dental Clinic
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            Providing modern, comfortable, and affordable dental care
            for the whole family.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#doctors" className="hover:text-white">Doctors</a></li>
            <li><a href="/location" className="hover:text-white">Location</a></li>
            <li><a href="/appointment" className="hover:text-white">Book Appointment</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h4>
          <p className="text-sm">
            📍 Thrissur – Palghat Road,<br />
            Paravattani, Kerala
          </p>
          <p className="mt-2 text-sm">
            📞 +91 98765 43210
          </p>
          <p className="mt-2 text-sm">
            ✉️ krishnadental@gmail.com
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Krishna Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
