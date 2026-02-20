import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            🦷
          </div>

          <span className="text-lg font-semibold text-gray-800">DentalOps</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link to="/doctors" className="hover:text-blue-600 transition">
            Our Doctors
          </Link>
          <Link to="/location" className="hover:text-blue-600 transition">
            Location
          </Link>
        </nav>

        {/* CTA */}
        <div>
          <Link
            to="/appointment"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
