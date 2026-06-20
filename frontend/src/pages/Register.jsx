import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
    skills: "",
    availability: "Weekdays",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-slate-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
          Volunteer Registration
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Tell us a bit about yourself to get started
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className={inputClass}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. First Aid, Driving"
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Availability</label>
            <select
              name="availability"
              onChange={handleChange}
              className={inputClass}
            >
              <option>Weekdays</option>
              <option>Weekends</option>
              <option>Anytime</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Emergency Contact Name</label>
            <input
              type="text"
              name="emergencyContactName"
              placeholder="Contact name"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Emergency Contact Phone</label>
            <input
              type="text"
              name="emergencyContactPhone"
              placeholder="Contact phone"
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-lg mt-6 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:text-indigo-700"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;