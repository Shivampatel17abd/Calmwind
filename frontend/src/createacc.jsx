
import { Link } from "react-router-dom";
import { useState } from "react";
import "./createacc.css";

function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    email: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (
      !formData.name.trim() ||
      !formData.rollno.trim() ||
      !formData.email.trim() ||
      !formData.contact.trim()
    ) {
      setMessage("Please fill in all the fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.contact)) {
      setMessage("Please enter a valid 10-digit contact number.");
      return;
    }

    console.log("Registration details:", formData);
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-brand">
          <div className="register-brand-icon" aria-hidden="true">
            ✿
          </div>
          <span>Soothe</span>
        </div>

        <div className="register-welcome">
          <p className="register-eyebrow">YOUR SPACE TO GROW</p>
          <h1>Create account.</h1>
          <p className="register-subtitle">
            Begin your journey toward better mental wellbeing.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              maxLength={100}
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="rollno">College roll number</label>
            <input
              id="rollno"
              name="rollno"
              type="text"
              placeholder="Enter your roll number"
              value={formData.rollno}
              onChange={handleChange}
              maxLength={30}
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="contact">Contact number</label>
            <input
              id="contact"
              name="contact"
              type="tel"
              inputMode="numeric"
              placeholder="Enter 10-digit mobile number"
              value={formData.contact}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter a 10-digit mobile number"
              required
            />
          </div>

          <button className="register-button" type="submit">
            Create Account <span aria-hidden="true">→</span>
          </button>

          <p className="register-message" role="status" aria-live="polite">
            {message}
          </p>
        </form>

        <p className="register-login">
          Already have an account?{" "}
          <Link to="/">Log in</Link>
        </p>

        <div className="register-privacy">
          <span aria-hidden="true">♡</span>
          Your wellbeing matters.
        </div>
      </section>
    </main>
  );
}

export default CreateAccount;
