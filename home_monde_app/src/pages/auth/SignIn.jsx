import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

/* 🌍 Language Support */
const translations = {
  en: {
    welcome: "Create Your Account",
    subtitle: "Join the internal workforce platform",
    name: "Full Name",
    email: "Work Email",
    password: "Password",
    role: "Role",
    department: "Department",
    login: "Create Account",
    noAccount: "Already registered?",
    signup: "Login here",
    errorEmpty: "Please fill all required fields",
  },
  es: {
    welcome: "Crea tu cuenta",
    subtitle: "Únete a la plataforma interna",
    name: "Nombre completo",
    email: "Correo laboral",
    password: "Contraseña",
    role: "Rol",
    department: "Departamento",
    login: "Crear cuenta",
    noAccount: "¿Ya estás registrado?",
    signup: "Inicia sesión",
    errorEmpty: "Complete todos los campos",
  },
};

const departments = [
  "HR",
  "Sales",
  "Finance",
  "Marketing",
  "Operations",
  "IT",
  "Support",
  "Analytics",
];

const SignIn = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("en");

  const t = translations[lang];

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !department) {
      setError(t.errorEmpty);
      return;
    }

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        role: "employee",
        department,
      });

      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed ❌");
    }
  };

  /* 🎨 Ultra-polished MNC Styles */
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "radial-gradient(circle at top, #1e293b, #020617)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: "1rem",
    },

    form: {
      width: "100%",
      maxWidth: "440px",
      padding: "3rem 2.8rem",
      borderRadius: "20px",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
      backdropFilter: "blur(18px)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
      color: "#f8fafc",
      position: "relative",
    },

    lang: {
      position: "absolute",
      top: "20px",
      right: "24px",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      cursor: "pointer",
      color: "#93c5fd",
    },

    title: {
      fontSize: "2rem",
      fontWeight: 800,
      textAlign: "center",
      marginBottom: "0.3rem",
    },

    subtitle: {
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#cbd5f5",
      marginBottom: "2.5rem",
    },

    field: {
      position: "relative",
      marginBottom: "1.7rem",
    },

    input: {
      width: "100%",
      padding: "16px 14px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.25)",
      background: "rgba(15,23,42,0.8)",
      color: "#f8fafc",
      fontSize: "0.95rem",
      outline: "none",
    },

    label: {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "0.85rem",
      color: "#94a3b8",
      pointerEvents: "none",
      transition: "0.25s ease",
      background: "#020617",
      padding: "0 6px",
    },

    labelActive: {
      top: "-8px",
      fontSize: "0.7rem",
      color: "#93c5fd",
    },

    show: {
      position: "absolute",
      right: "14px",
      top: "16px",
      fontSize: "0.7rem",
      fontWeight: 600,
      cursor: "pointer",
      color: "#93c5fd",
    },

    button: {
      width: "100%",
      padding: "15px",
      borderRadius: "14px",
      border: "none",
      fontWeight: 800,
      fontSize: "0.95rem",
      letterSpacing: "0.04em",
      color: "#020617",
      background: "linear-gradient(135deg, #93c5fd, #60a5fa)",
      cursor: "pointer",
      marginTop: "0.5rem",
    },

    error: {
      color: "#f87171",
      textAlign: "center",
      fontSize: "0.8rem",
      marginBottom: "1rem",
    },

    footer: {
      textAlign: "center",
      fontSize: "0.8rem",
      marginTop: "1.8rem",
      color: "#c7d2fe",
    },

    link: {
      fontWeight: 700,
      color: "#93c5fd",
      cursor: "pointer",
    },
  };

  const active = (v) => (v ? styles.labelActive : {});

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSignup}>
        <div
          style={styles.lang}
          onClick={() => setLang(lang === "en" ? "es" : "en")}
        >
          {lang.toUpperCase()}
        </div>

        <h2 style={styles.title}>{t.welcome}</h2>
        <p style={styles.subtitle}>{t.subtitle}</p>

        {/* NAME */}
        <div style={styles.field}>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label style={{ ...styles.label, ...active(name) }}>{t.name}</label>
        </div>

        {/* EMAIL */}
        <div style={styles.field}>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{ ...styles.label, ...active(email) }}>{t.email}</label>
        </div>

        {/* ROLE */}
        <div style={styles.field}>
          <input
            disabled
            value="Employee"
            style={{
              ...styles.input,
              background: "rgba(148,163,184,0.15)",
              cursor: "not-allowed",
            }}
          />
          <label style={{ ...styles.label, ...styles.labelActive }}>
            {t.role}
          </label>
        </div>

        {/* DEPARTMENT */}
        <div style={styles.field}>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <label style={{ ...styles.label, ...active(department) }}>
            {t.department}
          </label>
        </div>

        {/* PASSWORD */}
        <div style={styles.field}>
          <input
            type={showPassword ? "text" : "password"}
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label style={{ ...styles.label, ...active(password) }}>
            {t.password}
          </label>
          <span
            style={styles.show}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </span>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button}>{t.login}</button>

        <div style={styles.footer}>
          {t.noAccount}{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            {t.signup}
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
