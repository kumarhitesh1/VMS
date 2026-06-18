const User = require("../models/User");
const Event = require("../models/Event");

const getDashboardStats = async (req, res) => {
  try {
    const totalVolunteers = await User.countDocuments({
      role: "volunteer",
    });

    const totalEvents = await Event.countDocuments();

    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    const completedEvents = await Event.countDocuments({
      status: "Completed",
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};