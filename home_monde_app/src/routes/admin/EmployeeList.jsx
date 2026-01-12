import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/admin/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderWrapper}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={styles.loader}
        />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Employees</h1>
        <p style={styles.subtitle}>Manage company employees</p>
      </motion.div>

      {/* Cards */}
      <div style={styles.grid}>
        {employees.map((emp, index) => (
          <motion.div
            key={emp._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            style={styles.card}
            onClick={() => navigate(`/admin/employees/${emp._id}`)}
          >
            <div style={styles.avatar}>{emp.name.charAt(0).toUpperCase()}</div>

            <h3 style={styles.name}>{emp.name}</h3>
            <p style={styles.email}>{emp.email}</p>

            <span
              style={{
                ...styles.status,
                background:
                  emp.status === "active"
                    ? "rgba(0,200,150,0.15)"
                    : "rgba(255,80,80,0.15)",
                color: emp.status === "active" ? "#00c896" : "#ff5050",
              }}
            >
              {emp.status || "active"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "#fff",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "6px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  },

  card: {
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    borderRadius: "18px",
    padding: "24px",
    cursor: "pointer",
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
    transition: "all 0.3s ease",
  },

  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "14px",
  },

  name: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },

  email: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: "6px 0 12px",
    wordBreak: "break-word",
  },

  status: {
    fontSize: "12px",
    padding: "6px 12px",
    borderRadius: "20px",
    display: "inline-block",
    fontWeight: "600",
  },

  loaderWrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#020617",
  },

  loader: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255,255,255,0.2)",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
  },
};

export default EmployeeList;
