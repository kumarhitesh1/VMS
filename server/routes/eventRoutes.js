const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
  assignVolunteer,
  removeVolunteer,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createEvent
);

router.get(
  "/",
  authMiddleware,
  getEvents
);

router.get(
  "/:id",
  authMiddleware,
  getEventById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEvent
);

router.post(
  "/:id/join",
  authMiddleware,
  joinEvent
);

router.post(
  "/:id/leave",
  authMiddleware,
  leaveEvent
);

router.post(
  "/:id/assign",
  authMiddleware,
  roleMiddleware("admin"),
  assignVolunteer
);

router.post(
  "/:id/remove",
  authMiddleware,
  roleMiddleware("admin"),
  removeVolunteer
);

module.exports = router;