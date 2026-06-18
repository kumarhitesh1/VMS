const User = require("../models/User");

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({
      role: "volunteer",
    }).select("-password");

    res.status(200).json({
      success: true,
      volunteers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await User.findById(req.params.id).select(
      "-password"
    );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVolunteer = async (req, res) => {
  try {
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

    const volunteer = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await User.findByIdAndDelete(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
};