import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reschedule modal state
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Fetch appointments
  useEffect(() => {
    fetch(`ttps://dental-crm-backend-8crf.onrender.com
/appointments`)
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();

        // 🔹 Hide expired appointments
        const filtered = (data.appointments || []).filter(
          (a) =>
            !a.expiresAt ||
            new Date(a.expiresAt) >= now
        );

        setAppointments(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch appointments", err);
        setLoading(false);
      });
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "rescheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `https://dental-crm-backend-8crf.onrender.com
/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id
            ? { ...appt, status }
            : appt
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const deleteAppointment = async (id) => {
    const ok = window.confirm(
      "Delete this appointment?"
    );
    if (!ok) return;

    await fetch(
      `https://dental-crm-backend-8crf.onrender.com
/appointments/${id}`,
      { method: "DELETE" }
    );

    setAppointments((prev) =>
      prev.filter((a) => a._id !== id)
    );
  };

  if (loading) {
    return <p className="p-6">Loading appointments...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Ongoing Patients Button */}
      <button
        onClick={() => navigate("/admin/patients")}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        View Ongoing Patients
      </button>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id} className="border-t">
                <td className="px-4 py-3">{appt.name}</td>
                <td className="px-4 py-3">{appt.phone}</td>
                <td className="px-4 py-3">{appt.date}</td>
                <td className="px-4 py-3">
                  {appt.time || "-"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusColor(
                      appt.status
                    )}`}
                  >
                    {appt.status}
                  </span>
                </td>

                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        appt._id,
                        "confirmed"
                      )
                    }
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        appt._id,
                        "cancelled"
                      )
                    }
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAppointment(appt);
                      setNewDate(appt.date);
                      setNewTime(appt.time || "");
                      setShowReschedule(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  >
                    Reschedule
                  </button>

                  <button
                    onClick={() =>
                      deleteAppointment(appt._id)
                    }
                    className="px-3 py-1 bg-gray-700 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <p className="text-gray-500 mt-4">
            No active appointments found.
          </p>
        )}
      </div>

      {/* Reschedule Modal */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Reschedule Appointment
            </h2>

            <div className="space-y-4">
              <input
                type="date"
                value={newDate}
                onChange={(e) =>
                  setNewDate(e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />

              <input
                type="time"
                value={newTime}
                onChange={(e) =>
                  setNewTime(e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  setShowReschedule(false)
                }
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await fetch(
                    `https://dental-crm-backend-8crf.onrender.com
/appointments/${selectedAppointment._id}/status`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify({
                        status: "rescheduled",
                        date: newDate,
                        time: newTime,
                      }),
                    }
                  );

                  setAppointments((prev) =>
                    prev.map((a) =>
                      a._id ===
                      selectedAppointment._id
                        ? {
                            ...a,
                            status: "rescheduled",
                            date: newDate,
                            time: newTime,
                          }
                        : a
                    )
                  );

                  setShowReschedule(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
