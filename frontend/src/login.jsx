
import { Link } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Demo only: no real authentication yet.
    setMessage("Login form submitted! Connect your backend next.");
  }

  return (
    <main className="page"> 
      <section className="login-card">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            ✿
          </div>
          <span>Soothe</span>
        </div>

        <div className="welcome">
          <p className="eyebrow">YOUR SPACE TO BREATHE</p>
          <h1>Welcome back.</h1>
          <p className="subtitle">
            Take a moment for yourself. We're glad you're here.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setMessage("");
                }}
                autoComplete="current-password"
                required
              />

              <button
                className="toggle-password"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="forgot-row">
            <a href="#forgot-password">Forgot password?</a>
          </div>

          <button className="login-button" type="submit">
            Log in <span aria-hidden="true">→</span>
          </button>

          <p className="form-message" role="status" aria-live="polite">
            {message}
          </p>
        </form>

        <p className="signup">
          New to mindful?{" "}
          <Link to="/create-account">Create an account</Link>
        </p>

        <div className="note">
          <span>♡</span>
          <span>Your wellbeing matters.</span>
        </div>
      </section>
    </main>
  );
}

export default App;

