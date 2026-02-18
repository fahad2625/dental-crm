import DoctorCard from "./DoctorCard";
import Rahul from "../../assets/Images/rahul-dr.jpg";

const DoctorsSection = () => {
  const doctors = [
    {
      name: "Dr. Rahul",
      role: "Chief Dental Surgeon",
      image: Rahul,
    },
    {
      name: "Dr. Neha Sharma",
      role: "Orthodontist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    },
    {
      name: "Dr. Rahul Menon",
      role: "Cosmetic Dentist",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our Doctors
          </h2>
          <p className="mt-3 text-gray-600">
            Experienced professionals dedicated to your smile.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default DoctorsSection;
