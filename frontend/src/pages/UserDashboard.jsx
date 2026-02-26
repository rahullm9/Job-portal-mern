import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardSidebar from "../components/DashboardSidebar";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role="user" />
      <main className="dashboard-main">
        <h1>User Dashboard</h1>
        <p>Welcome {user?.name}</p>
      </main>
    </div>
  );
}

export default Dashboard;
