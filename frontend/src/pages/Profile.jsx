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
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  const fields = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    { label: "Role", value: user?.role, capitalize: true },
    { label: "Age", value: user?.age },
    { label: "Gender", value: user?.gender },
    { label: "Address", value: user?.address, span: true },
    { label: "Skills", value: user?.skills?.join(", ") || "—", span: true },
    { label: "Emergency Contact", value: user?.emergencyContactName },
    { label: "Emergency Phone", value: user?.emergencyContactPhone },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your registered information on file.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.label} className={field.span ? "md:col-span-2" : ""}>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                {field.label}
              </p>
              <p
                className={`text-sm font-medium text-slate-900 ${
                  field.capitalize ? "capitalize" : ""
                }`}
              >
                {field.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;