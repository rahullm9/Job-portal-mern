import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.png";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);

      if (decoded.role === "user") navigate("/dashboard");
      else if (decoded.role === "recruiter") navigate("/recruiter-dashboard");
      else if (decoded.role === "admin") navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      {/* Background orbs */}
      <div className="auth-orb auth-orb--1" />
      <div className="auth-orb auth-orb--2" />

      {/* Back to home */}
      <Link to="/" className="auth-back">
        ← Back to Home
      </Link>

      <div className="auth-card">
        {/* Left panel */}
        <div className="auth-panel auth-panel--left">
          <div className="auth-panel__logo">
            <img src={logo} className="auth-logo-img" alt="Dreamjob Logo" />
            <span className="auth-panel__logo-text">Dreamjob</span>
          </div>
          <h2 className="auth-panel__title">Welcome back!</h2>
          <p className="auth-panel__desc">Sign in to continue your job search journey and discover new opportunities.</p>
          <div className="auth-panel__features">
            <div className="auth-feature"><span>✓</span> Access 50K+ job listings</div>
            <div className="auth-feature"><span>✓</span> Track your applications</div>
            <div className="auth-feature"><span>✓</span> Connect with top recruiters</div>
          </div>
          <div className="auth-panel__art">
            <div className="art-card">
              <div className="art-card__icon">🎉</div>
              <div>
                <div className="art-card__title">Hired!</div>
                <div className="art-card__sub">Senior Dev @ Google</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-panel auth-panel--right">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Sign In</h1>
            <p className="auth-form-sub">
              Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <div className="form-input-wrap">
                <span className="form-icon">📧</span>
                <input
                  id="login-email"
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="form-input-wrap">
                <span className="form-icon">🔒</span>
                <input
                  id="login-password"
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className={`auth-submit ${loading ? "auth-submit--loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Signing In...
                </>
              ) : (
                <>Sign In <span>→</span></>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-socials">
            <button className="social-btn" disabled>
              <span>G</span> Google
            </button>
            <button className="social-btn" disabled>
              <span>in</span> LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
