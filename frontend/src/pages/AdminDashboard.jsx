import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCharts from "../components/DashboardCharts";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");

        setStats(res.data.stats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">
            Total Volunteers
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalVolunteers}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">
            Total Events
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalEvents}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">
            Upcoming Events
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.upcomingEvents}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">
            Completed Events
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.completedEvents}
          </p>
        </div>
      </div>

      <DashboardCharts stats={stats} />
    </DashboardLayout>
  );
}

export default AdminDashboard;