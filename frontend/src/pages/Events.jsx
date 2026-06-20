import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Events() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    requiredVolunteers: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createEvent = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/events", formData);

      setEvents((prev) => [...prev, res.data.event]);

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        requiredVolunteers: "",
      });

      alert("Event created successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create event");
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`);

      setEvents((prev) =>
        prev.filter((event) => event._id !== id)
      );

      alert("Event deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete event");
    }
  };

  const isJoined = (event) =>
    event.volunteers?.some(
      (volunteer) => volunteer._id === user?._id || volunteer === user?._id
    );

  const joinEvent = async (id) => {
    try {
      setActionId(id);
      const res = await api.post(`/events/${id}/join`);

      setEvents((prev) =>
        prev.map((event) =>
          event._id === id ? res.data.event : event
        )
      );
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to join event"
      );
    } finally {
      setActionId(null);
    }
  };

  const leaveEvent = async (id) => {
    try {
      setActionId(id);
      const res = await api.post(`/events/${id}/leave`);

      setEvents((prev) =>
        prev.map((event) =>
          event._id === id ? res.data.event : event
        )
      );
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to leave event"
      );
    } finally {
      setActionId(null);
    }
  };

  const statusStyles = {
    Upcoming: "bg-amber-50 text-amber-700",
    Ongoing: "bg-indigo-50 text-indigo-700",
    Completed: "bg-emerald-50 text-emerald-700",
  };

  const inputClass =
    "border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Event Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isAdmin
            ? "Create events and manage who's signed up."
            : "Browse events and join the ones you'd like to help with."}
        </p>
      </div>

      {isAdmin && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Create Event
          </h2>

          <form
            onSubmit={createEvent}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="number"
              name="requiredVolunteers"
              placeholder="Required Volunteers"
              value={formData.requiredVolunteers}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} md:col-span-2`}
              rows="4"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg transition-colors"
            >
              Create Event
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FaCalendarAlt className="mx-auto text-3xl text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-700">
            No events yet
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {isAdmin
              ? "Create your first event using the form above."
              : "Check back soon for upcoming events."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Title</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Date</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Location</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Volunteers</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => {
                const joined = isJoined(event);
                const filled = event.volunteers?.length || 0;
                const isFull = filled >= event.requiredVolunteers;
                const fillPct = Math.min(
                  100,
                  Math.round((filled / event.requiredVolunteers) * 100) || 0
                );

                return (
                  <tr
                    key={event._id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      {event.title}
                    </td>

                    <td className="px-5 py-3.5 text-slate-600">
                      {new Date(
                        event.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-3.5 text-slate-600">
                      {event.location}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[event.status] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isFull ? "bg-emerald-500" : "bg-indigo-500"
                            }`}
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {filled}/{event.requiredVolunteers}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      {isAdmin && (
                        <button
                          onClick={() =>
                            deleteEvent(event._id)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      )}

                      {!isAdmin && (
                        joined ? (
                          <button
                            onClick={() => leaveEvent(event._id)}
                            disabled={actionId === event._id}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
                          >
                            {actionId === event._id
                              ? "Leaving..."
                              : "Leave"}
                          </button>
                        ) : (
                          <button
                            onClick={() => joinEvent(event._id)}
                            disabled={actionId === event._id || isFull}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isFull
                              ? "Full"
                              : actionId === event._id
                              ? "Joining..."
                              : "Join"}
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Events;