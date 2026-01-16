import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("⚠️ All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await api.post(`/auth/reset-password/${token}`, { password });

      setMessage("✅ Password updated successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("❌ Invalid or expired reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password 🔒</h2>
        <p style={styles.subtitle}>Create a new secure password</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />

          <button disabled={loading} style={styles.button}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
    color: "#333",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
  },
};

export default ResetPassword;
