const User = require("../models/User");
const Event = require("../models/Event");

const getDashboardStats = async (req, res) => {
  const totalVolunteers = await User.countDocuments({
    role: "volunteer",
  });

  const totalEvents = await Event.countDocuments();

  const upcomingEvents = await Event.countDocuments({
    date: { $gte: new Date() },
  });

  const completedEvents = await Event.countDocuments({
    $or: [{ status: "Completed" }, { date: { $lt: new Date() } }],
  });

  res.status(200).json({
    success: true,
    stats: {
      totalVolunteers,
      totalEvents,
      upcomingEvents,
      completedEvents,
    },
  });
};

module.exports = {
  getDashboardStats,
};