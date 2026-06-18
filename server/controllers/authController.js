const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

const sanitizeUser = (user) => {
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    age,
    gender,
    address,
    skills,
    availability,
    emergencyContactName,
    emergencyContactPhone,
  } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Invalid input", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    age,
    gender,
    address,
    skills,
    availability,
    emergencyContactName,
    emergencyContactPhone,
  });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    token: generateToken(user._id, user.role),
    user: sanitizeUser(user),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Invalid credentials", 400);
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid credentials", 401);
  }

  res.json({
    success: true,
    token: generateToken(user._id, user.role),
    user: sanitizeUser(user),
  });
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Lets a logged-in user (admin or volunteer) update their own info.
// Whitelisted the same way volunteerController.updateVolunteer is,
// so this can never be used to change email, password, or role.
const updateProfile = async (req, res) => {
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

  // Drop any keys the client didn't send so a partial update
  // doesn't overwrite existing fields with undefined.
  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) delete updates[key];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user: sanitizeUser(user),
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};