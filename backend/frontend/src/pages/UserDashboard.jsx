import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const appliedJobs = [
  { logo: "G", logoClass: "logo-g", title: "Frontend Engineer", company: "Google", salary: "$120K", status: "reviewed", type: "Remote" },
  { logo: "M", logoClass: "logo-m", title: "Full Stack Developer", company: "Microsoft", salary: "$110K", status: "applied", type: "Hybrid" },
  { logo: "A", logoClass: "logo-a", title: "Backend Engineer", company: "Amazon", salary: "$130K", status: "pending", type: "On-site" },
  { logo: "S", logoClass: "logo-s", title: "React Developer", company: "Spotify", salary: "$105K", status: "hired", type: "Remote" },
];

const recommendedJobs = [
  { logo: "N", logoClass: "logo-n", title: "UI/UX Engineer", company: "Netflix", salary: "$125K", type: "Remote" },
  { logo: "T", logoClass: "logo-t", title: "Software Engineer II", company: "Twitter", salary: "$115K", type: "Hybrid" },
  { logo: "G", logoClass: "logo-g", title: "Cloud Engineer", company: "Google", salary: "$135K", type: "Remote" },
];

const activity = [
  { dot: "dot-green",  text: <><strong>Google</strong> viewed your profile</>,           time: "2 hours ago" },
  { dot: "dot-blue",   text: <><strong>Microsoft</strong> moved your application to review</>, time: "1 day ago" },
  { dot: "dot-amber",  text: <>Your profile strength increased to <strong>82%</strong></>,  time: "2 days ago" },
  { dot: "dot-purple", text: <>You applied to <strong>Amazon – Backend Engineer</strong></>, time: "3 days ago" },
];

const skills = ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs", "Tailwind", "Git"];

const navItems = [
  { icon: "🏠", label: "Overview", key: "overview" },
  { icon: "💼", label: "Applied Jobs", key: "applied" },
  { icon: "🔖", label: "Saved Jobs", key: "saved" },
  { icon: "👤", label: "My Profile", key: "profile" },
];

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/auth/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const displayName = user?.name || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="db-root">
      {/* SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-sidebar__logo">
          <span className="db-sidebar__logo-icon">💼</span>
          <span className="db-sidebar__logo-text">Dreamjob</span>
        </div>

        <div className="db-sidebar__user">
          <div className="db-sidebar__avatar">{initials}</div>
          <div>
            <div className="db-sidebar__user-name">{displayName}</div>
            <div className="db-sidebar__user-role">Job Seeker</div>
          </div>
        </div>

        <nav className="db-sidebar__nav">
          <div className="db-sidebar__section-label">Main</div>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`db-nav-link ${active === item.key ? "active" : ""}`}
              onClick={() => setActive(item.key)}
            >
              <span className="db-nav-link__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="db-sidebar__section-label">Tools</div>
          <button className="db-nav-link">
            <span className="db-nav-link__icon">📊</span>Application Tracker
          </button>
          <button className="db-nav-link">
            <span className="db-nav-link__icon">🔔</span>Job Alerts
          </button>
          <button className="db-nav-link">
            <span className="db-nav-link__icon">⚙️</span>Settings
          </button>
        </nav>

        <div className="db-sidebar__footer">
          <button className="db-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="db-main">
        {/* TOPBAR */}
        <div className="db-topbar">
          <div className="db-topbar__title">
            Dashboard / <span>{navItems.find(n => n.key === active)?.label || "Overview"}</span>
          </div>
          <div className="db-topbar__actions">
            <div className="db-topbar__notif">
              🔔
              <div className="db-notif-dot" />
            </div>
            <div className="db-sidebar__avatar" style={{ width: 36, height: 36 }}>{initials}</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="db-content">
          {/* WELCOME BANNER */}
          <div className="db-welcome-banner">
            <div>
              <div className="db-welcome-title">
                Good morning, {displayName.split(" ")[0]} 👋
              </div>
              <div className="db-welcome-sub">
                You have <strong style={{ color: "#a78bfa" }}>3 new job recommendations</strong> waiting for you today.
              </div>
            </div>
            <div className="db-welcome-stat">
              <div className="db-welcome-stat__num">82%</div>
              <div className="db-welcome-stat__label">Profile Strength</div>
            </div>
          </div>

          {/* STATS */}
          <div className="db-stats-grid">
            {[
              { icon: "📨", bg: "icon-bg-purple", label: "Applications", value: "24", badge: "+3 this week", badgeClass: "badge-up" },
              { icon: "👁️", bg: "icon-bg-blue",   label: "Profile Views", value: "128", badge: "+40%", badgeClass: "badge-up" },
              { icon: "📞", bg: "icon-bg-green",  label: "Interviews",   value: "4",   badge: "Scheduled", badgeClass: "badge-neutral" },
              { icon: "🔖", bg: "icon-bg-amber",  label: "Saved Jobs",   value: "17",  badge: "+2 new", badgeClass: "badge-up" },
            ].map((s) => (
              <div className="db-stat-card" key={s.label}>
                <div className="db-stat-card__top">
                  <div className={`db-stat-card__icon ${s.bg}`}>{s.icon}</div>
                  <span className={`db-stat-card__badge ${s.badgeClass}`}>{s.badge}</span>
                </div>
                <div className="db-stat-card__value">{s.value}</div>
                <div className="db-stat-card__label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* MIDDLE ROW */}
          <div className="db-grid-6-4">
            {/* Applied Jobs */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">Recent Applications</div>
                <button className="db-card-action">View All →</button>
              </div>
              {appliedJobs.map((j) => (
                <div className="db-job-row" key={j.title}>
                  <div className={`db-job-logo ${j.logoClass}`}>{j.logo}</div>
                  <div className="db-job-info">
                    <div className="db-job-title">{j.title}</div>
                    <div className="db-job-company">{j.company} · {j.type}</div>
                  </div>
                  <div className="db-job-meta">
                    <div className="db-job-salary">{j.salary}</div>
                    <span className={`db-pill pill-${j.status}`}>{j.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Feed */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">Recent Activity</div>
              </div>
              {activity.map((a, i) => (
                <div className="db-activity-item" key={i}>
                  <div className={`db-activity-dot ${a.dot}`} />
                  <div>
                    <div className="db-activity-text">{a.text}</div>
                    <div className="db-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="db-grid-2">
            {/* Recommended Jobs */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">✨ Recommended for You</div>
                <button className="db-card-action">Browse All</button>
              </div>
              {recommendedJobs.map((j) => (
                <div className="db-job-row" key={j.title}>
                  <div className={`db-job-logo ${j.logoClass}`}>{j.logo}</div>
                  <div className="db-job-info">
                    <div className="db-job-title">{j.title}</div>
                    <div className="db-job-company">{j.company} · {j.type}</div>
                  </div>
                  <div className="db-job-meta">
                    <div className="db-job-salary">{j.salary}</div>
                    <button className="db-btn db-btn--outline db-btn--sm">Apply</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Strength */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">Profile Strength</div>
                <span className="db-stat-card__badge badge-neutral">82%</span>
              </div>
              {[
                { label: "Basic Info", val: 100 },
                { label: "Work Experience", val: 80 },
                { label: "Skills", val: 90 },
                { label: "Education", val: 100 },
                { label: "Resume Uploaded", val: 60 },
              ].map((p) => (
                <div key={p.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: 4 }}>
                    <span>{p.label}</span><span>{p.val}%</span>
                  </div>
                  <div className="db-progress-bar">
                    <div className="db-progress-fill" style={{ width: `${p.val}%` }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <div className="db-card-title" style={{ fontSize: "0.85rem", marginBottom: 10 }}>Your Skills</div>
                <div>
                  {skills.map((s) => (
                    <span key={s} className="db-skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* APPLICATIONS CHART */}
          <div className="db-card" style={{ marginBottom: 20 }}>
            <div className="db-card-header">
              <div className="db-card-title">Application Activity (Last 7 Days)</div>
            </div>
            <div className="db-chart-bars">
              {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className={`db-chart-bar ${i === 5 ? "active-bar" : ""}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="db-chart-labels">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="db-chart-label">{d}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
