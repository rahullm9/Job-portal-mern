import { Link, useNavigate } from "react-router-dom";

const sidebarItems = {
  user: [
    { label: "My Profile", path: "/dashboard" },
    { label: "Applied Jobs", path: "/dashboard" },
    { label: "Saved Jobs", path: "/dashboard" },
  ],
  recruiter: [
    { label: "Company Profile", path: "/recruiter-dashboard" },
    { label: "Post a Job", path: "/recruiter-dashboard" },
    { label: "Manage Applicants", path: "/recruiter-dashboard" },
  ],
  admin: [
    { label: "Platform Stats", path: "/admin" },
    { label: "Manage Users", path: "/admin" },
    { label: "Manage Recruiters", path: "/admin" },
  ],
};

function DashboardSidebar({ role = "user" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const items = sidebarItems[role] || [];

  return (
    <aside className="dashboard-sidebar">
      <h2 className="sidebar-title">{role} panel</h2>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <Link key={item.label} to={item.path} className="sidebar-link">
            {item.label}
          </Link>
        ))}
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default DashboardSidebar;
