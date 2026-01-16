import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });
      console.log("show res", res);

      login({
        token: res.data.token,
        role: res.data.user.role,
        user: res.data.user,
      });
      setLoading(false);
      // navigate("/admin/dashboard"); // Navigate after login
    } catch (err) {
      console.log("show err ", err);
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  /* ===== STYLES ===== */
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "1rem",
    },
    form: {
      background: "#ffffff",
      padding: "2.4rem 2rem",
      borderRadius: "18px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
      width: "100%",
      maxWidth: "420px",
      animation: "fadeSlideIn 0.6s ease-out",
    },
    title: {
      textAlign: "center",
      marginBottom: "0.4rem",
      fontSize: "1.9rem",
      fontWeight: "700",
      color: "#0f172a",
    },
    subtitle: {
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#64748b",
      marginBottom: "2rem",
    },
    inputGroup: { position: "relative", marginBottom: "1.6rem" },
    input: {
      width: "100%",
      padding: "16px 12px 8px 12px",
      fontSize: "0.95rem",
      border: "1.8px solid #d1d5db",
      borderRadius: "10px",
      outline: "none",
      transition: "all 0.25s ease",
    },
    label: (active) => ({
      position: "absolute",
      left: "12px",
      top: active ? "4px" : "16px",
      fontSize: active ? "0.75rem" : "0.85rem",
      color: "#9ca3af",
      pointerEvents: "none",
      transition: "0.3s",
      background: "#fff",
      padding: "0 4px",
    }),
    showPassword: {
      position: "absolute",
      right: "12px",
      top: "12px",
      cursor: "pointer",
      color: "#2563eb",
      fontSize: "0.8rem",
      fontWeight: "500",
    },
    forgotRow: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "1.4rem",
    },
    forgot: {
      fontSize: "0.85rem",
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: "500",
    },
    btn: {
      width: "100%",
      padding: "12px",
      fontSize: "1rem",
      fontWeight: 600,
      color: "#fff",
      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      opacity: loading ? 0.7 : 1,
    },
    error: {
      color: "#dc2626",
      fontSize: "0.85rem",
      marginBottom: "1rem",
      textAlign: "center",
      animation: "shake 0.4s",
    },
    bottomText: {
      textAlign: "center",
      marginTop: "1.8rem",
      fontSize: "0.9rem",
      color: "#475569",
    },
    span: { color: "#2563eb", cursor: "pointer", fontWeight: "600" },
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-4px); } 100% { transform: translateX(0); } }
        `}
      </style>

      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleLogin}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue</p>

          <div style={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <label style={styles.label(email)}>Email address</label>
          </div>

          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <label style={styles.label(password)}>Password</label>
            <span
              style={styles.showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div style={styles.forgotRow}>
            <span
              style={styles.forgot}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <p style={styles.bottomText}>
            Don’t have an account?{" "}
            <span style={styles.span} onClick={() => navigate("/signin")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
