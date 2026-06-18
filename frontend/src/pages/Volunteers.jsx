import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = async () => {
    try {
      const res = await api.get("/volunteers");

      setVolunteers(res.data.volunteers);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch volunteers");
    } finally {
      setLoading(false);
    }
  };

  const deleteVolunteer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/volunteers/${id}`);

      setVolunteers((prev) =>
        prev.filter((volunteer) => volunteer._id !== id)
      );

      alert("Volunteer deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete volunteer");
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Volunteers
      </h1>

      {loading ? (
        <p>Loading volunteers...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((volunteer) => (
                <tr
                  key={volunteer._id}
                  className="border-b"
                >
                  <td className="p-3">
                    {volunteer.name}
                  </td>

                  <td className="p-3">
                    {volunteer.email}
                  </td>

                  <td className="p-3">
                    {volunteer.phone}
                  </td>

                  <td className="p-3 flex gap-2">
                    <Link
                      to={`/volunteers/${volunteer._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        deleteVolunteer(
                          volunteer._id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Volunteers;