import DashboardSidebar from "../components/DashboardSidebar";

const AdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar role="admin" />
      <main className="dashboard-main">
        <h1>Admin Dashboard</h1>
        <p>Welcome admin</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
