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
    "#4f46e5",
    "#10b981",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">
          System Overview
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Volunteers and events at a glance
        </p>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <BarChart data={barData}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">
          Event Status
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Upcoming vs completed events
        </p>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={95}
              innerRadius={55}
              paddingAngle={2}
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default DashboardCharts;