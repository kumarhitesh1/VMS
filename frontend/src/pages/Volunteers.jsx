import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Volunteers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {loading ? "Loading..." : `${volunteers.length} registered volunteer${volunteers.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Loading volunteers...
        </div>
      ) : volunteers.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FaUsers className="mx-auto text-3xl text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-700">
            No volunteers yet
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Registered volunteers will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Name</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Email</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Phone</th>
                <th className="px-5 py-3 text-left font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((volunteer) => (
                <tr
                  key={volunteer._id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-slate-900">
                    {volunteer.name}
                  </td>

                  <td className="px-5 py-3.5 text-slate-600">
                    {volunteer.email}
                  </td>

                  <td className="px-5 py-3.5 text-slate-600">
                    {volunteer.phone}
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <Link
                        to={`/volunteers/${volunteer._id}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                      >
                        View
                      </Link>

                      <button
                        onClick={() =>
                          deleteVolunteer(
                            volunteer._id
                          )
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
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