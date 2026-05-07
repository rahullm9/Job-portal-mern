import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const jobPostings = [
  { title: "Senior Frontend Engineer", applicants: 42, status: "open",   salary: "$120K", type: "Remote",  daysLeft: 12 },
  { title: "Full Stack Developer",      applicants: 28, status: "open",   salary: "$110K", type: "Hybrid",  daysLeft: 5  },
  { title: "UX Designer",              applicants: 19, status: "closed",  salary: "$90K",  type: "On-site", daysLeft: 0  },
  { title: "DevOps Engineer",          applicants: 7,  status: "open",   salary: "$125K", type: "Remote",  daysLeft: 20 },
];

const recentApplicants = [
  { init: "A", name: "Aarav Sharma",   role: "Senior Frontend Engineer", status: "reviewed", match: 92 },
  { init: "P", name: "Priya Mehta",    role: "Full Stack Developer",      status: "applied",  match: 87 },
  { init: "R", name: "Rahul Singh",    role: "Senior Frontend Engineer",  status: "hired",    match: 96 },
  { init: "S", name: "Sneha Patel",    role: "UX Designer",              status: "rejected", match: 65 },
  { init: "K", name: "Karan Gupta",    role: "DevOps Engineer",          status: "applied",  match: 80 },
];

const activity = [
  { dot: "dot-green",  text: <><strong>Rahul Singh</strong> accepted the offer for Frontend Engineer</>, time: "1 hour ago" },
  { dot: "dot-blue",   text: <>New application from <strong>Priya Mehta</strong> for Full Stack Dev</>,   time: "3 hours ago" },
  { dot: "dot-amber",  text: <><strong>UX Designer</strong> job posting has expired</>,                   time: "1 day ago" },
  { dot: "dot-purple", text: <>You posted a new job: <strong>DevOps Engineer</strong></>,                 time: "2 days ago" },
];

const navItems = [
  { icon: "🏠", label: "Overview",          key: "overview" },
  { icon: "📋", label: "Job Postings",      key: "postings" },
  { icon: "👥", label: "Applicants",        key: "applicants" },
  { icon: "🏢", label: "Company Profile",   key: "company" },
];

export default function RecruiterDashboard() {
  const [recruiter, setRecruiter] = useState(null);
  const [active, setActive] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/auth/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecruiter(res.data);
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

  const displayName = recruiter?.name || "Recruiter";
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
          <div className="db-sidebar__avatar" style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
            {initials}
          </div>
          <div>
            <div className="db-sidebar__user-name">{displayName}</div>
            <div className="db-sidebar__user-role">Recruiter</div>
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
            <span className="db-nav-link__icon">📊</span>Analytics
          </button>
          <button className="db-nav-link">
            <span className="db-nav-link__icon">💬</span>Messages
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
            Recruiter / <span>{navItems.find(n => n.key === active)?.label || "Overview"}</span>
          </div>
          <div className="db-topbar__actions">
            <button className="db-btn db-btn--primary db-btn--sm">+ Post a Job</button>
            <div className="db-topbar__notif">
              🔔
              <div className="db-notif-dot" />
            </div>
            <div
              className="db-sidebar__avatar"
              style={{ width: 36, height: 36, background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
            >
              {initials}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="db-content">
          {/* WELCOME BANNER */}
          <div className="db-welcome-banner">
            <div>
              <div className="db-welcome-title">
                Welcome back, {displayName.split(" ")[0]} 🏢
              </div>
              <div className="db-welcome-sub">
                You have <strong style={{ color: "#a78bfa" }}>12 new applicants</strong> this week across your active job postings.
              </div>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              <div className="db-welcome-stat">
                <div className="db-welcome-stat__num">96</div>
                <div className="db-welcome-stat__label">Total Applicants</div>
              </div>
              <div className="db-welcome-stat">
                <div className="db-welcome-stat__num">3</div>
                <div className="db-welcome-stat__label">Active Jobs</div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="db-stats-grid">
            {[
              { icon: "📋", bg: "icon-bg-purple", label: "Active Postings",  value: "3",   badge: "1 expiring", badgeClass: "badge-down" },
              { icon: "👥", bg: "icon-bg-blue",   label: "Total Applicants", value: "96",  badge: "+12 new",    badgeClass: "badge-up" },
              { icon: "✅", bg: "icon-bg-green",  label: "Hired This Month", value: "5",   badge: "↑ vs last",  badgeClass: "badge-up" },
              { icon: "⏱️", bg: "icon-bg-amber",  label: "Avg. Time to Hire", value: "18d", badge: "days",       badgeClass: "badge-neutral" },
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
            {/* Job Postings */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">Active Job Postings</div>
                <button className="db-card-action">Manage All →</button>
              </div>
              {jobPostings.map((j) => (
                <div className="db-job-row" key={j.title}>
                  <div>
                    <div className="db-job-title">{j.title}</div>
                    <div className="db-job-company">{j.type} · {j.salary}</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span className={`db-pill pill-${j.status}`}>{j.status}</span>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {j.status === "open" ? `${j.daysLeft}d left` : "—"}
                      <span style={{ marginLeft: 10, color: "var(--primary-light)", fontWeight: 600 }}>
                        👥 {j.applicants}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity */}
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
            {/* Recent Applicants */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">Recent Applicants</div>
                <button className="db-card-action">View All →</button>
              </div>
              {recentApplicants.map((a) => (
                <div className="db-applicant-row" key={a.name}>
                  <div className="db-applicant-avatar">{a.init}</div>
                  <div style={{ flex: 1 }}>
                    <div className="db-applicant-name">{a.name}</div>
                    <div className="db-applicant-role">{a.role}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                    <span className={`db-pill pill-${a.status}`}>{a.status}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--success)" }}>⚡ {a.match}% match</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hiring Funnel */}
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">Hiring Funnel</div>
              </div>
              {[
                { label: "Total Applied",    val: 96,  pct: 100 },
                { label: "Screened",         val: 54,  pct: 56  },
                { label: "Interviews Sent",  val: 28,  pct: 29  },
                { label: "Offers Extended",  val: 8,   pct: 8   },
                { label: "Hired",            val: 5,   pct: 5   },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: 4 }}>
                    <span>{f.label}</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{f.val}</span>
                  </div>
                  <div className="db-progress-bar">
                    <div className="db-progress-fill" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}

              <div className="db-card-header" style={{ marginTop: 20, marginBottom: 12 }}>
                <div className="db-card-title" style={{ fontSize: "0.85rem" }}>Applications by Day</div>
              </div>
              <div className="db-chart-bars" style={{ height: 60 }}>
                {[30, 55, 45, 70, 60, 85, 50].map((h, i) => (
                  <div key={i} className={`db-chart-bar ${i === 5 ? "active-bar" : ""}`} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="db-chart-labels">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="db-chart-label">{d}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
