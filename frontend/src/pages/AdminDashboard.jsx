import { useEffect, useState } from "react";
import { FaUsers, FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
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

  const cards = [
    {
      label: "Total Volunteers",
      value: stats.totalVolunteers,
      icon: <FaUsers />,
      accent: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: <FaCalendarAlt />,
      accent: "bg-slate-100 text-slate-600",
    },
    {
      label: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: <FaClock />,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed Events",
      value: stats.completedEvents,
      icon: <FaCheckCircle />,
      accent: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          A snapshot of volunteers and events across the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"
              >
                <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
                <div className="h-8 w-16 bg-slate-200 rounded" />
              </div>
            ))
          : cards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-500">
                    {card.label}
                  </h3>
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${card.accent}`}
                  >
                    {card.icon}
                  </span>
                </div>

                <p className="text-3xl font-bold text-slate-900 tracking-tight">
                  {card.value}
                </p>
              </div>
            ))}
      </div>

      {!loading && <DashboardCharts stats={stats} />}
    </DashboardLayout>
  );
}

export default AdminDashboard;