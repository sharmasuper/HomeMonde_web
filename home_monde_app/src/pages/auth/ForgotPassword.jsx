import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await api.post("/auth/forgot-password", { email });

      setMessage("✅ Reset link sent to your email");
    } catch (err) {
      console.log("show error", err);
      setMessage("❌ Email not registered");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password 🔐</h2>
        <p style={styles.subtitle}>
          Enter your registered email and we’ll send you a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <Link to="/login" style={styles.link}>
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "14px",
    padding: "32px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#333",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "22px",
  },

  input: {
    width: "100%",
    padding: "14px",
    fontSize: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "16px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  message: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#333",
  },

  link: {
    display: "inline-block",
    marginTop: "18px",
    fontSize: "14px",
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default ForgotPassword;
