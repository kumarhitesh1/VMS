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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Volunteer Registration
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <select
            name="gender"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded col-span-2"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="availability"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Anytime</option>
          </select>

          <input
            type="text"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded mt-6"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;