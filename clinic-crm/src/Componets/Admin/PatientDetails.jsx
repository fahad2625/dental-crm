import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PatientDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  // Next visit
  const [nextVisit, setNextVisit] = useState("");
  const [saving, setSaving] = useState(false);

  // Payments
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");

  // Visits
  const [visits, setVisits] = useState([]);
  const [visitNote, setVisitNote] = useState("");

  /* ---------------- FETCH PAYMENTS ---------------- */
  const fetchPayments = async () => {
    const res = await fetch(`http://localhost:5000/payments/${caseId}`);
    const data = await res.json();
    if (data.success) setPayments(data.payments);
  };

  /* ---------------- FETCH VISITS ---------------- */
  const fetchVisits = async () => {
    const res = await fetch(`http://localhost:5000/visits/${caseId}`);
    const data = await res.json();
    if (data.success) setVisits(data.visits);
  };

  /* ---------------- FETCH PATIENT ---------------- */
  useEffect(() => {
    fetch(`http://localhost:5000/treatment-cases/${caseId}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data.treatment);

        if (data.treatment?.nextVisitDate) {
          setNextVisit(data.treatment.nextVisitDate.slice(0, 10));
        }

        fetchPayments();
        fetchVisits();
      })
      .catch(() => setError("Failed to load patient"));
  }, [caseId]);

  /* ---------------- SAVE NEXT VISIT ---------------- */
  const saveNextVisit = async () => {
    if (!nextVisit) return;

    setSaving(true);

    await fetch(`http://localhost:5000/treatment-cases/${caseId}/next-visit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nextVisitDate: nextVisit }),
    });

    setSaving(false);
  };

  /* ---------------- ADD PAYMENT ---------------- */
  const addPayment = async () => {
    if (!amount) return;

    await fetch("http://localhost:5000/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clinicId: "krishna-dental",
        caseId,
        amount: Number(amount),
        method,
      }),
    });

    setAmount("");
    setMethod("cash");
    fetchPayments();
  };



  const deletePayment = async (paymentId) => {
  const ok = window.confirm("Delete this payment?");
  if (!ok) return;

  await fetch(
    `http://localhost:5000/payments/${paymentId}`,
    { method: "DELETE" }
  );

  fetchPayments();
};


  /* ---------------- ADD VISIT ---------------- */
  const addVisit = async () => {
    if (!visitNote) return;

    await fetch("http://localhost:5000/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clinicId: "krishna-dental",
        caseId,
        notes: visitNote,
      }),
    });

    setVisitNote("");
    fetchVisits();
  };

  /* ---------------- DELETE VISIT ---------------- */
  const deleteVisit = async (visitId) => {
    const ok = window.confirm("Delete this visit note?");
    if (!ok) return;

    await fetch(`http://localhost:5000/visits/${visitId}`, {
      method: "DELETE",
    });

    fetchVisits();
  };

  /* ---------------- FINANCIAL LOGIC ---------------- */
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  const totalAmount = patient?.totalAmount || 0;
  const pendingBalance = totalAmount - totalPaid;

  let statusText = "Payment Pending";
  let statusColor = "text-yellow-600";

  if (pendingBalance <= 0) {
    statusText = "Completed / Paid";
    statusColor = "text-green-600";
  }

  /* ---------------- UI ---------------- */
  if (error) return <p className="p-6">{error}</p>;
  if (!patient) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/admin/patients")}
        className="mb-4 text-sm text-blue-600"
      >
        ← Back to Ongoing Patients
      </button>

      <h1 className="text-2xl font-bold mb-4">{patient.patientName}</h1>

      {/* PATIENT INFO */}
      <div className="bg-white border rounded p-4 space-y-2">
        <p>
          <b>Phone:</b> {patient.phone}
        </p>
        <p>
          <b>Treatment:</b> {patient.treatmentType}
        </p>
        <p>
          <b>Status:</b> {patient.status}
        </p>
        <p>
          <b>Start Date:</b> {new Date(patient.startDate).toLocaleDateString()}
        </p>
      </div>

      {/* NEXT VISIT */}
      <div className="bg-white border rounded p-4 mt-6">
        <h3 className="font-semibold mb-2">Next Visit</h3>

        <div className="flex gap-3 items-center">
          <input
            type="date"
            value={nextVisit}
            onChange={(e) => setNextVisit(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <button
            onClick={saveNextVisit}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* FINANCIAL SUMMARY */}
      <div className="bg-white border rounded p-4 mt-6">
        <h3 className="font-semibold mb-3">Financial Summary</h3>

        <p>
          <b>Total Treatment Amount:</b> ₹{totalAmount}
        </p>
        <p>
          <b>Total Paid:</b> ₹{totalPaid}
        </p>

        <p className="font-semibold">Pending Balance: ₹{pendingBalance}</p>

        <p className={`font-medium ${statusColor}`}>Status: {statusText}</p>
      </div>

      {/* PAYMENTS */}
      <div className="bg-white border rounded p-4 mt-6">
        <h3 className="font-semibold mb-3">Payments</h3>

        <div className="flex gap-3 mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-3 py-2 rounded w-32"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="bank">Bank</option>
          </select>

          <button
            onClick={addPayment}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>

        {payments.length === 0 ? (
          <p className="text-sm text-gray-500">No payments yet</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Method</th>
                <th className="p-2 text-left">Action</th>

              </tr>
            </thead>
           <tbody>
  {payments.map((p) => (
    <tr key={p._id} className="border-t">
      <td className="p-2">
        {new Date(p.paidAt).toLocaleDateString()}
      </td>
      <td className="p-2">₹{p.amount}</td>
      <td className="p-2">{p.method}</td>
      <td className="p-2">
        <button
          onClick={() => deletePayment(p._id)}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        )}
      </div>

      {/* VISIT HISTORY */}
      <div className="bg-white border rounded p-4 mt-6">
        <h3 className="font-semibold mb-3">Visit History</h3>

        <div className="mb-4">
          <textarea
            placeholder="Doctor notes for this visit..."
            value={visitNote}
            onChange={(e) => setVisitNote(e.target.value)}
            className="border w-full p-2 rounded mb-2"
            rows={3}
          />

          <button
            onClick={addVisit}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add Visit
          </button>
        </div>

        {visits.length === 0 ? (
          <p className="text-sm text-gray-500">No visits recorded yet</p>
        ) : (
          <div className="space-y-3">
            {visits.map((v) => (
              <div
                key={v._id}
                className="border rounded p-3 flex justify-between gap-4"
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(v.visitDate).toLocaleDateString()}
                  </p>
                  <p>{v.notes}</p>
                </div>

                <button
                  onClick={() => deleteVisit(v._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
