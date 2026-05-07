import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-orb auth-orb--1" />
      <div className="auth-orb auth-orb--2" />

      <Link to="/" className="auth-back">← Back to Home</Link>

      <div className="auth-card">
        {/* Left panel */}
        <div className="auth-panel auth-panel--left">
          <div className="auth-panel__logo">
            <img src={logo} className="auth-logo-img" alt="Dreamjob Logo" />
            <span className="auth-panel__logo-text">Dreamjob</span>
          </div>
          <h2 className="auth-panel__title">Join 120K+ professionals</h2>
          <p className="auth-panel__desc">Create your free account and unlock access to thousands of career opportunities.</p>
          <div className="auth-panel__features">
            <div className="auth-feature"><span>✓</span> Free forever plan</div>
            <div className="auth-feature"><span>✓</span> Instant job notifications</div>
            <div className="auth-feature"><span>✓</span> AI-powered job matching</div>
            <div className="auth-feature"><span>✓</span> One-click applications</div>
          </div>
          <div className="auth-panel__art">
            <div className="art-card">
              <div className="art-card__icon">🚀</div>
              <div>
                <div className="art-card__title">Profile Created</div>
                <div className="art-card__sub">3 matches found instantly!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="auth-panel auth-panel--right">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Create Account</h1>
            <p className="auth-form-sub">
              Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <div className="form-input-wrap">
                <span className="form-icon">👤</span>
                <input
                  id="reg-name"
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <div className="form-input-wrap">
                <span className="form-icon">📧</span>
                <input
                  id="reg-email"
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
              <label className="form-label" htmlFor="reg-password">Password</label>
              <div className="form-input-wrap">
                <span className="form-icon">🔒</span>
                <input
                  id="reg-password"
                  className="form-input"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">I am joining as</label>
              <div className="role-selector">
                <label className={`role-option ${form.role === "user" ? "role-option--active" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === "user"}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                  <span className="role-icon">🎓</span>
                  <span className="role-name">Job Seeker</span>
                  <span className="role-desc">Looking for work</span>
                </label>
                <label className={`role-option ${form.role === "recruiter" ? "role-option--active" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={form.role === "recruiter"}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                  <span className="role-icon">🏢</span>
                  <span className="role-name">Recruiter</span>
                  <span className="role-desc">Hiring talent</span>
                </label>
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              className={`auth-submit ${loading ? "auth-submit--loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner" /> Creating Account...</>
              ) : (
                <>Create Free Account <span>→</span></>
              )}
            </button>
          </form>

          <p className="auth-terms">
            By creating an account, you agree to our <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
