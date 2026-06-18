const express = require("express");
const {
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteerController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getVolunteers
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getVolunteerById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateVolunteer
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteVolunteer
);

module.exports = router;