import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/admin/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loaderWrapper}>
        <div style={styles.loader}></div>
        <p style={styles.loaderText}>Loading employee profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loaderWrapper}>
        <p style={{ color: "#ff6b6b" }}>{error}</p>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back
        </button>

        <span
          style={{
            ...styles.statusBadge,
            background:
              employee.status === "active"
                ? "rgba(0,200,150,0.15)"
                : "rgba(255,80,80,0.15)",
            color: employee.status === "active" ? "#00c896" : "#ff5050",
          }}
        >
          {employee.role.toUpperCase()}
        </span>
      </div>

      {/* Profile */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}>{employee.name?.charAt(0)}</div>

        <h2 style={styles.name}>{employee.name}</h2>
        <p style={styles.role}>{employee.role}</p>
      </div>

      {/* Info */}
      <div style={styles.infoGrid}>
        <InfoCard label="Email" value={employee.email} />
        <InfoCard label="Phone" value={employee.phone} />
        <InfoCard label="Department" value={employee.department} />
        <InfoCard
          label="Joined On"
          value={new Date(employee.createdAt).toDateString()}
        />
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div style={styles.infoCard}>
    <p style={styles.infoLabel}>{label}</p>
    <p style={styles.infoValue}>{value || "—"}</p>
  </div>
);

export default EmployeeDetails;

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "#e5e7eb",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  backBtn: {
    background: "transparent",
    border: "1px solid #334155",
    color: "#cbd5f5",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  statusBadge: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },

  profileCard: {
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    borderRadius: "22px",
    padding: "36px",
    textAlign: "center",
    marginBottom: "40px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #22d3ee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 auto 16px",
  },

  name: {
    fontSize: "24px",
    fontWeight: "700",
  },

  role: {
    fontSize: "14px",
    color: "#94a3b8",
    marginTop: "6px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px",
  },

  infoCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "22px",
    backdropFilter: "blur(10px)",
  },

  infoLabel: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "6px",
  },

  infoValue: {
    fontSize: "16px",
    fontWeight: "600",
  },

  loaderWrapper: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#cbd5f5",
  },

  loader: {
    width: "44px",
    height: "44px",
    border: "4px solid #334155",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loaderText: {
    marginTop: "14px",
  },
};
