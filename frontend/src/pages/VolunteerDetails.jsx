import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function VolunteerDetails() {
  const { id } = useParams();

  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchVolunteer = async () => {
    try {
      const res = await api.get(`/volunteers/${id}`);
      setVolunteer(res.data.volunteer);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVolunteer();
    fetchEvents();
  }, [id]);

  const assignedEvents = events.filter((event) =>
    event.volunteers?.some((v) => (v._id || v) === id)
  );

  const availableEvents = events.filter(
    (event) =>
      event.status !== "Completed" &&
      new Date(event.date) >= new Date() &&
      !event.volunteers?.some((v) => (v._id || v) === id)
  );

  const assignToEvent = async () => {
    if (!selectedEventId) return;

    try {
      setActionLoading(true);
      await api.post(`/events/${selectedEventId}/assign`, {
        volunteerId: id,
      });

      setSelectedEventId("");
      await fetchEvents();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to assign volunteer"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const removeFromEvent = async (eventId) => {
    const confirmRemove = window.confirm(
      "Remove this volunteer from the event?"
    );

    if (!confirmRemove) return;

    try {
      setActionLoading(true);
      await api.post(`/events/${eventId}/remove`, {
        volunteerId: id,
      });

      await fetchEvents();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to remove volunteer"
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Loading volunteer...
        </div>
      </DashboardLayout>
    );
  }

  if (!volunteer) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Volunteer not found
        </div>
      </DashboardLayout>
    );
  }

  const fields = [
    { label: "Name", value: volunteer.name },
    { label: "Email", value: volunteer.email },
    { label: "Phone", value: volunteer.phone },
    { label: "Age", value: volunteer.age },
    { label: "Gender", value: volunteer.gender },
    { label: "Availability", value: volunteer.availability },
    { label: "Address", value: volunteer.address, span: true },
    { label: "Skills", value: volunteer.skills?.join(", ") || "—", span: true },
    { label: "Emergency Contact", value: volunteer.emergencyContactName },
    { label: "Emergency Phone", value: volunteer.emergencyContactPhone },
  ];

  return (
    <DashboardLayout>
      <Link
        to="/volunteers"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
      >
        <FaArrowLeft className="text-xs" />
        Back to volunteers
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
        {volunteer.name}
      </h1>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.label} className={field.span ? "md:col-span-2" : ""}>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                {field.label}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {field.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          Assigned Events
        </h2>

        {assignedEvents.length === 0 ? (
          <p className="text-sm text-slate-500 mb-5">
            Not assigned to any events yet.
          </p>
        ) : (
          <ul className="space-y-2 mb-6">
            {assignedEvents.map((event) => (
              <li
                key={event._id}
                className="flex justify-between items-center bg-slate-50 rounded-lg px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {event.title}
                  <span className="text-slate-400 font-normal ml-2">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </span>

                <button
                  onClick={() => removeFromEvent(event._id)}
                  disabled={actionLoading}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-3">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="border border-slate-300 p-2.5 rounded-lg text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="">Select an event to assign</option>
            {availableEvents.map((event) => (
              <option
                key={event._id}
                value={event._id}
              >
                {event.title} — {new Date(event.date).toLocaleDateString()}
              </option>
            ))}
          </select>

          <button
            onClick={assignToEvent}
            disabled={!selectedEventId || actionLoading}
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default VolunteerDetails;