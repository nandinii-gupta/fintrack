import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./landing.css";

export default function Landing() {
  const [balance, setBalance] = useState(12450);
  const insights = [
    "You saved ₹2,150 this month",
    "Food expenses increased by 12%",
    "You're within your monthly budget",
  ];
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => (prev < 25050 ? prev + 300 : prev));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    <div className="landing-root">
      {/* BACKGROUND */}
      <div className="bg-blobs">
        <div className="blob blob-indigo" />
        <div className="blob blob-sky" />
      </div>

      {/* NAVBAR */}
      <nav className="landing-nav">
        <h1 className="brand">FinTrack</h1>
        <div className="nav-actions">
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>
          <Link to="/register" className="nav-register-btn">
            Register
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-grid">
        <div className="hero-text">
          <span className="hero-pill">Smart Personal Finance</span>

          <h1 className="hero-title">
            {["Take", "Control", "of", "Your", "Money"].map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {word === "Money" ? (
                  <span className="accent">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle">
            Track expenses, manage budgets, and gain clear insights —
            all in one smart dashboard.
          </p>

          <Link to="/register" className="cta-primary">
            Get Started
          </Link>
        </div>

        {/* PREVIEW CARD */}
        <div className="preview-card">
          <h3>Total Balance</h3>
          <p className="preview-balance">₹{balance.toLocaleString()}</p>

          <div className="bars">
            <div style={{ height: "40%" }} />
            <div style={{ height: "65%" }} />
            <div style={{ height: "55%" }} />
            <div style={{ height: "80%" }} />
          </div>

          <p className="preview-insight">
            💡 {insights[insightIndex]}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <Feature icon="💸" title="Expense Tracking" desc="Every rupee tracked clearly." />
        <Feature icon="📊" title="Visual Reports" desc="Understand spending patterns." />
        <Feature icon="🔐" title="Secure Access" desc="Password protected login." />
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div>
            <h3 className="footer-brand">FinTrack</h3>
            <p className="footer-desc">
              Smart personal finance management to help you take
              control of your money confidently.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/">Privacy Policy</Link>
          </div>

          <div>
            <h4>Contact</h4>
            <p>📍 India</p>
            <p>✉️ support@fintrack.app</p>
          </div>
        </div>

        <p className="footer-bottom">
          © {new Date().getFullYear()} FinTrack. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}






