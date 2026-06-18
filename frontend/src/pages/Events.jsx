import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Events() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Event Management
      </h1>

      {/* Create Event Form - admins only, since the backend rejects this from volunteers anyway */}

      {isAdmin && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
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
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="number"
              name="requiredVolunteers"
              placeholder="Required Volunteers"
              value={formData.requiredVolunteers}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded md:col-span-2"
              rows="4"
              required
            />

            <button
              type="submit"
              className="bg-slate-900 text-white py-3 rounded"
            >
              Create Event
            </button>
          </form>
        </div>
      )}

      {/* Events Table */}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Status</th>
                {isAdmin && (
                  <th className="p-3 text-left">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr
                  key={event._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {event.title}
                  </td>

                  <td className="p-3">
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {event.location}
                  </td>

                  <td className="p-3">
                    {event.status}
                  </td>

                  {isAdmin && (
                    <td className="p-3">
                      <button
                        onClick={() =>
                          deleteEvent(event._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Events;