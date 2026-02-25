import { useEffect, useState } from "react";
import API from "../services/api";

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
    <div>
      <h2>Welcome {user?.name}</h2>
    </div>
  );
}

export default Dashboard;
