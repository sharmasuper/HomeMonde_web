// src/pages/SignInPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

// Multi-language support
const translations = {
  en: {
    welcome: "Create Your Account",
    name: "Name",
    email: "Email",
    password: "Password",
    login: "Sign Up",
    noAccount: "Already have an account?",
    signup: "Please Login",
    errorEmpty: "Please fill all fields!",
  },
  es: {
    welcome: "Crea tu cuenta",
    name: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    login: "Registrarse",
    noAccount: "¿Ya tienes una cuenta?",
    signup: "Inicia sesión",
    errorEmpty: "¡Por favor complete todos los campos!",
  },
};

const SignIn = () => {
  const [name, setName] = useState(""); // ✅ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");

  const t = translations[lang];
  const navigate = useNavigate();

  // ✅ SIGNUP API
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError(t.errorEmpty);
      return;
    }

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed ❌");
    }
  };

  // ---- styles SAME AS YOUR CODE (unchanged) ----
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
      animation: "fadeIn 1s ease-in-out",
      position: "relative",
    },
    langSwitcher: {
      position: "absolute",
      top: "15px",
      right: "20px",
      cursor: "pointer",
      fontWeight: "600",
      color: "#2575fc",
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
    },
    label: {
      position: "absolute",
      top: "12px",
      left: "12px",
      color: "#aaa",
      transition: "0.3s",
      background: "transparent",
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
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "1rem",
    },
    bottomText: {
      textAlign: "center",
      marginTop: "1.5rem",
    },
    span: {
      color: "#2575fc",
      cursor: "pointer",
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <div
          style={styles.langSwitcher}
          onClick={() => setLang(lang === "en" ? "es" : "en")}
        >
          {lang.toUpperCase()}
        </div>

        <h2 style={styles.title}>{t.welcome}</h2>

        {/* ✅ NAME INPUT */}
        <div style={styles.inputGroup}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: name ? "-10px" : "12px",
              fontSize: name ? "0.8rem" : "1rem",
              background: name ? "#fff" : "transparent",
            }}
          >
            {t.name}
          </label>
        </div>

        {/* EMAIL */}
        <div style={styles.inputGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: email ? "-10px" : "12px",
              fontSize: email ? "0.8rem" : "1rem",
              background: email ? "#fff" : "transparent",
            }}
          >
            {t.email}
          </label>
        </div>

        {/* PASSWORD */}
        <div style={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder=" "
          />
          <label
            style={{
              ...styles.label,
              top: password ? "-10px" : "12px",
              fontSize: password ? "0.8rem" : "1rem",
              background: password ? "#fff" : "transparent",
            }}
          >
            {t.password}
          </label>

          <span
            style={styles.showPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.btn}>
          {t.login}
        </button>

        <p style={styles.bottomText}>
          {t.noAccount}{" "}
          <span style={styles.span} onClick={() => navigate("/login")}>
            {t.signup}
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
