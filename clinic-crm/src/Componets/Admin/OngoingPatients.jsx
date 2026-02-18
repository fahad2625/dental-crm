import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OngoingPatients = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatmentType, setTreatmentType] = useState("braces");
  const [startDate, setStartDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const navigate = useNavigate();

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:5000/treatment-cases");
    const data = await res.json();
    setPatients(data.cases || []);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const addPatient = async () => {
    if (!patientName || !phone || !startDate || !totalAmount) return;

    await fetch("http://localhost:5000/treatment-cases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clinicId: "krishna-dental",
        patientName,
        phone,
        treatmentType,
        startDate,
        totalAmount: Number(totalAmount),
      }),
    });

    setPatientName("");
    setPhone("");
    setStartDate("");
    setTotalAmount("");
    setTreatmentType("braces");
    setShowForm(false);

    fetchPatients();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ongoing Patients</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Patient
        </button>
      </div>

      {/* ADD PATIENT FORM */}
      {showForm && (
        <div className="bg-white border rounded p-4 mb-6 space-y-3">
          <input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <select
            value={treatmentType}
            onChange={(e) => setTreatmentType(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="braces">Braces</option>
            <option value="aligners">Aligners</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="number"
            placeholder="Total Treatment Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button
            onClick={addPatient}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Save Patient
          </button>
        </div>
      )}

      {/* PATIENT LIST */}
      {patients.length === 0 ? (
        <p>No ongoing patients</p>
      ) : (
        patients.map((p) => (
          <div
            key={p._id}
            className="border rounded p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.patientName}</p>
              <p className="text-sm text-gray-500">{p.phone}</p>
            </div>

            <button
              onClick={() => navigate(`/admin/patient/${p._id}`)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OngoingPatients;
