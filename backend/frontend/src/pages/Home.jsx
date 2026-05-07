import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Home.css";

const stats = [
  { value: "50K+", label: "Jobs Posted" },
  { value: "120K+", label: "Job Seekers" },
  { value: "8K+", label: "Companies" },
  { value: "95%", label: "Success Rate" },
];

const features = [
  {
    icon: "🎯",
    title: "Smart Job Matching",
    desc: "AI-powered matching connects you with jobs that fit your skills and goals instantly.",
  },
  {
    icon: "🏢",
    title: "Top Companies",
    desc: "Access opportunities from thousands of verified companies across all industries.",
  },
  {
    icon: "⚡",
    title: "Instant Applications",
    desc: "Apply to multiple jobs in seconds with your pre-built profile and one-click apply.",
  },
  {
    icon: "📊",
    title: "Application Tracker",
    desc: "Track all your applications in real-time with a beautiful dashboard and analytics.",
  },
  {
    icon: "🔒",
    title: "Verified Listings",
    desc: "Every job post is verified by our team to ensure legitimacy and quality opportunities.",
  },
  {
    icon: "🌍",
    title: "Remote & Hybrid",
    desc: "Find remote, hybrid, and on-site roles globally from a single unified platform.",
  },
];

const steps = [
  { num: "01", title: "Create Your Profile", desc: "Sign up and build your professional profile in minutes." },
  { num: "02", title: "Explore Opportunities", desc: "Browse thousands of curated job listings matching your skills." },
  { num: "03", title: "Apply & Get Hired", desc: "Apply with one click and land your dream job faster." },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-root">
      {/* NAVBAR */}
      <nav className={`home-nav ${scrolled ? "home-nav--scrolled" : ""}`}>
        <div className="home-nav__logo">
          <img src={logo} className="logo-img" alt="Dreamjob Logo" />
          <span className="logo-text">Dreamjob</span>
        </div>
        <div className="home-nav__links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it Works</a>
          <Link to="/register" className="nav-btn nav-btn--outline">Sign Up</Link>
          <Link to="/login" className="nav-btn nav-btn--primary">Login</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className={`hero ${visible ? "hero--visible" : ""}`}>
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-orb hero__bg-orb--3" />

        <div className="hero__content">
          <div className="hero__badge">🚀 #1 Job Portal in India</div>
          <h1 className="hero__title">
            Find Your <span className="hero__gradient-text">Dream Job</span>
            <br />Before Someone Else Does
          </h1>
          <p className="hero__subtitle">
            Connect with top companies, discover thousands of opportunities, and land the career you deserve — all in one powerful platform.
          </p>
          <div className="hero__actions">
            <Link to="/register" className="hero-btn hero-btn--primary">
              Get Started Free
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/login" className="hero-btn hero-btn--ghost">
              Login to Account
            </Link>
          </div>
          <div className="hero__trust">
            <span>✓ Free to join</span>
            <span>✓ No credit card required</span>
            <span>✓ 10,000+ new jobs weekly</span>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="hero__visual">
          <div className="float-card float-card--1">
            <div className="float-card__icon">🎉</div>
            <div>
              <div className="float-card__title">New Offer!</div>
              <div className="float-card__sub">Senior Dev @ Google</div>
            </div>
          </div>
          <div className="float-card float-card--2">
            <div className="float-card__icon">📈</div>
            <div>
              <div className="float-card__title">Profile Views</div>
              <div className="float-card__sub">+240% this week</div>
            </div>
          </div>
          <div className="float-card float-card--3">
            <div className="float-card__icon">✅</div>
            <div>
              <div className="float-card__title">Application Sent</div>
              <div className="float-card__sub">Microsoft — React Dev</div>
            </div>
          </div>
          <div className="hero__dashboard-mock">
            <div className="mock-header">
              <div className="mock-dot" /><div className="mock-dot" /><div className="mock-dot" />
            </div>
            <div className="mock-job">
              <div className="mock-logo">G</div>
              <div>
                <div className="mock-title">Frontend Engineer</div>
                <div className="mock-company">Google · Remote · $120K</div>
              </div>
              <div className="mock-badge">Apply</div>
            </div>
            <div className="mock-job">
              <div className="mock-logo mock-logo--m">M</div>
              <div>
                <div className="mock-title">Full Stack Dev</div>
                <div className="mock-company">Microsoft · Hybrid · $110K</div>
              </div>
              <div className="mock-badge">Apply</div>
            </div>
            <div className="mock-job">
              <div className="mock-logo mock-logo--a">A</div>
              <div>
                <div className="mock-title">Backend Engineer</div>
                <div className="mock-company">Amazon · On-site · $130K</div>
              </div>
              <div className="mock-badge">Apply</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-header">
          <div className="section-tag">✦ Why Choose Us</div>
          <h2 className="section-title">Everything You Need to<br /><span className="hero__gradient-text">Land Your Dream Job</span></h2>
          <p className="section-desc">A powerful platform built for both job seekers and recruiters, packed with tools to streamline hiring.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-header">
          <div className="section-tag">✦ Simple Process</div>
          <h2 className="section-title">Get Hired in <span className="hero__gradient-text">3 Easy Steps</span></h2>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-orb cta-orb--1" />
        <div className="cta-orb cta-orb--2" />
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-sub">Join thousands of professionals who found their perfect job through Dreamjob.</p>
          <div className="cta-actions">
            <Link to="/register" className="hero-btn hero-btn--primary">Create Free Account</Link>
            <Link to="/login" className="hero-btn hero-btn--ghost">Sign In</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="home-nav__logo">
              <img src={logo} className="logo-img" alt="Dreamjob Logo" />
              <span className="logo-text">Dreamjob</span>
            </div>
            <p className="footer__brand-desc">Connecting talent with opportunity. Your career journey starts here.</p>
          </div>
          <div className="footer__links-group">
            <div className="footer__col">
              <div className="footer__col-title">For Job Seekers</div>
              <a className="footer__link" href="#features">Browse Jobs</a>
              <a className="footer__link" href="#features">Resume Builder</a>
              <a className="footer__link" href="#features">Career Advice</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">For Recruiters</div>
              <Link className="footer__link" to="/register">Post a Job</Link>
              <a className="footer__link" href="#features">Find Talent</a>
              <a className="footer__link" href="#features">Pricing</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Company</div>
              <a className="footer__link" href="#features">About Us</a>
              <a className="footer__link" href="#features">Contact</a>
              <a className="footer__link" href="#features">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2025 Dreamjob. All rights reserved.</span>
          <span>Built with ❤️ for job seekers everywhere</span>
        </div>
      </footer>
    </div>
  );
}
