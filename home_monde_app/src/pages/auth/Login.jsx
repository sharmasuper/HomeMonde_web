import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // ✅ auth brain
  const navigate = useNavigate(); // only for signup link

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 animation hook

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

      // ✅ single source of truth
      login({
        token: res.data.token,
        role: res.data.user.role,
        user: res.data.user,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  /* ===== YOUR STYLES (UNCHANGED) ===== */
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      fontFamily: "'Roboto', sans-serif",
      padding: "1rem",
    },
    form: {
      background: "rgba(255,255,255,0.95)",
      padding: "2.5rem 2rem",
      borderRadius: "20px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      width: "100%",
      maxWidth: "400px",

      /* 🔥 animation magic */
      animation: "fadeSlideIn 0.7s ease-out",
      transformOrigin: "center",
    },
    title: {
      textAlign: "center",
      marginBottom: "2rem",
      fontSize: "2rem",
      color: "#333",
    },
    inputGroup: {
      position: "relative",
      marginBottom: "1.8rem",
    },
    input: {
      width: "100%",
      padding: "12px 10px",
      fontSize: "1rem",
      border: "2px solid #ddd",
      borderRadius: "10px",
      outline: "none",
      transition: "border 0.3s, box-shadow 0.3s",
    },
    label: {
      position: "absolute",
      top: "12px",
      left: "12px",
      color: "#aaa",
      pointerEvents: "none",
      transition: "0.3s",
      padding: "0 5px",
    },
    showPassword: {
      position: "absolute",
      right: "12px",
      top: "12px",
      cursor: "pointer",
      color: "#2575fc",
      fontSize: "0.85rem",
    },
    btn: {
      width: "100%",
      padding: "12px",
      fontSize: "1rem",
      fontWeight: 700,
      color: "#fff",
      background: "#2575fc",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: loading ? "scale(0.96)" : "scale(1)",
      opacity: loading ? 0.7 : 1,
    },
    error: {
      color: "red",
      fontSize: "0.9rem",
      marginBottom: "1rem",
      textAlign: "center",
      animation: "shake 0.4s",
    },
    bottomText: {
      textAlign: "center",
      marginTop: "1.5rem",
      color: "#555",
    },
    span: {
      color: "#2575fc",
      cursor: "pointer",
      fontWeight: 600,
    },
  };

  return (
    <>
      {/* 🔥 Global animations */}
      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(25px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            75% { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleLogin}>
          <h2 style={styles.title}>Welcome Back</h2>

          <div style={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder=" "
            />
            <label style={styles.label}>Email</label>
          </div>

          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder=" "
            />
            <label style={styles.label}>Password</label>
            <span
              style={styles.showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <p style={styles.bottomText}>
            Don't have an account?{" "}
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
