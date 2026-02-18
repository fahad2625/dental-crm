import { Link } from "react-router-dom";
import Clinicimg from '../../assets/Images/krishna dental clinic img.png';
const HeroSection = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left content */}
        <div>
          <span className="inline-block mb-4 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Modern Dental Care
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            A Better Smile <br />
            Starts With Expert Care
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            We provide advanced, comfortable, and affordable dental treatments
            for the whole family.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/appointment"
              className="rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Book Appointment
            </Link>

            <a
              href="#services"
              className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              View Services
            </a>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <img
            src={Clinicimg}
            alt="Dental Clinic"
            className="w-full h-[420px] object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
