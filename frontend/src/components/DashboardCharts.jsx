import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardCharts({ stats }) {
  const barData = [
    {
      name: "Volunteers",
      value: stats.totalVolunteers,
    },
    {
      name: "Events",
      value: stats.totalEvents,
    },
    {
      name: "Upcoming",
      value: stats.upcomingEvents,
    },
    {
      name: "Completed",
      value: stats.completedEvents,
    },
  ];

  const pieData = [
    {
      name: "Upcoming",
      value: stats.upcomingEvents,
    },
    {
      name: "Completed",
      value: stats.completedEvents,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#16a34a",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          System Overview
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Event Status
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default DashboardCharts;