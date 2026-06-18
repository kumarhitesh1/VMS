const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
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

module.exports = router;