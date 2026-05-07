import DashboardSidebar from "../components/DashboardSidebar";

const RecruiterDashboard = () => {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar role="recruiter" />
      <main className="dashboard-main">
        <h1>Recruiter Dashboard</h1>
        <p>Welcome recruiter</p>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
