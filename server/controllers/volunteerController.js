const User = require("../models/User");
const Event = require("../models/Event");
const AppError = require("../utils/AppError");

const getVolunteers = async (req, res) => {
  const volunteers = await User.find({
    role: "volunteer",
  }).select("-password");

  res.status(200).json({
    success: true,
    volunteers,
  });
};

const getVolunteerById = async (req, res) => {
  const volunteer = await User.findById(req.params.id).select(
    "-password"
  );

  if (!volunteer) {
    throw new AppError("Volunteer not found", 404);
  }

  res.status(200).json({
    success: true,
    volunteer,
  });
};

const updateVolunteer = async (req, res) => {
  // Whitelist fields so a request can never overwrite password, role,
  // or email through this endpoint (mass-assignment protection).
  const {
    name,
    phone,
    age,
    gender,
    address,
    skills,
    availability,
    emergencyContactName,
    emergencyContactPhone,
  } = req.body;

  const updates = {
    name,
    phone,
    age,
    gender,
    address,
    skills,
    availability,
    emergencyContactName,
    emergencyContactPhone,
  };

  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) delete updates[key];
  });

  const volunteer = await User.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  ).select("-password");

  if (!volunteer) {
    throw new AppError("Volunteer not found", 404);
  }

  res.status(200).json({
    success: true,
    volunteer,
  });
};

const deleteVolunteer = async (req, res) => {
  const volunteer = await User.findByIdAndDelete(req.params.id);

  if (!volunteer) {
    throw new AppError("Volunteer not found", 404);
  }

  // Pull this volunteer out of every event they were assigned to, so
  // event.volunteers and dashboard stats don't keep stale references
  // to a user that no longer exists.
  await Event.updateMany(
    { volunteers: volunteer._id },
    { $pull: { volunteers: volunteer._id } }
  );

  res.status(200).json({
    success: true,
    message: "Volunteer deleted successfully",
  });
};

module.exports = {
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
};