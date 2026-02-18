const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="mx-auto h-40 w-40 rounded-full object-cover"
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        {doctor.name}
      </h3>

      <p className="text-sm text-gray-500">
        {doctor.role}
      </p>
    </div>
  );
};

export default DoctorCard;
