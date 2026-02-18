const ServiceCard = ({ service }) => {
  if (!service) return null;

  return (
    <div className="rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
        {service.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;
