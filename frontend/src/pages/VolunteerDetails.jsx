import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function VolunteerDetails() {
  const { id } = useParams();

  const [volunteer, setVolunteer] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const res = await api.get(
          `/volunteers/${id}`
        );

        setVolunteer(res.data.volunteer);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteer();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading volunteer...</p>
      </DashboardLayout>
    );
  }

  if (!volunteer) {
    return (
      <DashboardLayout>
        <p>Volunteer not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Volunteer Details
      </h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">

        <div>
          <strong>Name:</strong>{" "}
          {volunteer.name}
        </div>

        <div>
          <strong>Email:</strong>{" "}
          {volunteer.email}
        </div>

        <div>
          <strong>Phone:</strong>{" "}
          {volunteer.phone}
        </div>

        <div>
          <strong>Age:</strong>{" "}
          {volunteer.age}
        </div>

        <div>
          <strong>Gender:</strong>{" "}
          {volunteer.gender}
        </div>

        <div>
          <strong>Address:</strong>{" "}
          {volunteer.address}
        </div>

        <div>
          <strong>Availability:</strong>{" "}
          {volunteer.availability}
        </div>

        <div>
          <strong>Skills:</strong>{" "}
          {volunteer.skills?.join(", ")}
        </div>

        <div>
          <strong>Emergency Contact:</strong>{" "}
          {volunteer.emergencyContactName}
        </div>

        <div>
          <strong>Emergency Phone:</strong>{" "}
          {volunteer.emergencyContactPhone}
        </div>

      </div>
    </DashboardLayout>
  );
}

export default VolunteerDetails;