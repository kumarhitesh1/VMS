import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-semibold">{user?.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold">{user?.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-semibold capitalize">
              {user?.role}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Age</p>
            <p className="font-semibold">{user?.age}</p>
          </div>

          <div>
            <p className="text-gray-500">Gender</p>
            <p className="font-semibold">{user?.gender}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500">Address</p>
            <p className="font-semibold">
              {user?.address}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500">Skills</p>
            <p className="font-semibold">
              {user?.skills?.join(", ")}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Emergency Contact
            </p>
            <p className="font-semibold">
              {user?.emergencyContactName}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Emergency Phone
            </p>
            <p className="font-semibold">
              {user?.emergencyContactPhone}
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;