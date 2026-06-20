const Event = require("../models/Event");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const createEvent = async (req, res) => {
  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    event,
  });
};

const getEvents = async (req, res) => {
  const events = await Event.find().populate(
    "volunteers",
    "name email phone"
  );

  res.status(200).json({
    success: true,
    events,
  });
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "volunteers",
    "name email phone"
  );

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(200).json({
    success: true,
    event,
  });
};

const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(200).json({
    success: true,
    event,
  });
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
};

const joinEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.status === "Completed" || event.date < new Date()) {
    throw new AppError("This event has already passed", 400);
  }

  const alreadyJoined = event.volunteers.some(
    (volunteerId) => volunteerId.toString() === req.user._id.toString()
  );

  if (alreadyJoined) {
    throw new AppError("You have already joined this event", 400);
  }

  if (event.volunteers.length >= event.requiredVolunteers) {
    throw new AppError("This event is already full", 400);
  }

  event.volunteers.push(req.user._id);
  await event.save();

  res.status(200).json({
    success: true,
    message: "Joined event successfully",
    event,
  });
};

const leaveEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  event.volunteers = event.volunteers.filter(
    (volunteerId) => volunteerId.toString() !== req.user._id.toString()
  );

  await event.save();

  res.status(200).json({
    success: true,
    message: "Left event successfully",
    event,
  });
};

const assignVolunteer = async (req, res) => {
  const { volunteerId } = req.body;

  const event = await Event.findById(req.params.id);
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.status === "Completed" || event.date < new Date()) {
    throw new AppError("This event has already passed", 400);
  }

  const volunteer = await User.findOne({
    _id: volunteerId,
    role: "volunteer",
  });
  if (!volunteer) {
    throw new AppError("Volunteer not found", 404);
  }

  const alreadyAssigned = event.volunteers.some(
    (id) => id.toString() === volunteerId
  );
  if (alreadyAssigned) {
    throw new AppError("Volunteer is already assigned to this event", 400);
  }

  if (event.volunteers.length >= event.requiredVolunteers) {
    throw new AppError("This event is already full", 400);
  }

  event.volunteers.push(volunteerId);
  await event.save();

  res.status(200).json({
    success: true,
    event,
  });
};

const removeVolunteer = async (req, res) => {
  const { volunteerId } = req.body;

  const event = await Event.findById(req.params.id);
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  event.volunteers = event.volunteers.filter(
    (id) => id.toString() !== volunteerId
  );

  await event.save();

  res.status(200).json({
    success: true,
    event,
  });
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  assignVolunteer,
  removeVolunteer,
};