import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Later replace with API + JWT
    setUser({
      name: "Mohit Sharma",
      email: "mohit@gmail.com",
      role: "Employee",
      lastLogin: "Today, 10:45 AM",
    });
  }, []);

  if (!user) return null;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Employee Dashboard</h2>
        <span style={styles.roleBadge}>{user.role}</span>
      </div>

      {/* Welcome Card */}
      <div style={styles.profileCard}>
        <h3 style={styles.welcome}>Welcome, {user.name} 👋</h3>

        <div style={styles.infoGrid}>
          <Info label="Email" value={user.email} />
          <Info label="Last Login" value={user.lastLogin} />
        </div>
      </div>

      {/* Action Cards */}
      <div style={styles.cardsGrid}>
        <ActionCard
          title="My Profile"
          desc="View & update your profile"
          onClick={() => navigate("/employee/profile")}
        />
        <ActionCard
          title="My Tasks"
          desc="Check assigned tasks"
          onClick={() => navigate("/employee/tasks")}
        />
        <ActionCard
          title="Attendance"
          desc="View attendance history"
          onClick={() => navigate("/employee/attendance")}
        />
        <ActionCard
          title="Settings"
          desc="Account preferences"
          onClick={() => navigate("/employee/settings")}
        />
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span style={styles.label}>{label}</span>
    <span style={styles.value}>{value}</span>
  </div>
);

const ActionCard = ({ title, desc, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.card,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 18px 40px rgba(0,0,0,0.15)"
          : "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h4 style={styles.cardTitle}>{title}</h4>
      <p style={styles.cardDesc}>{desc}</p>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    background: "linear-gradient(180deg,#f8fbff,#eef3f9)",
    fontFamily: "system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
  },

  roleBadge: {
    background: "#2563eb",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "14px",
  },

  profileCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "26px",
    marginBottom: "32px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  welcome: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "18px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
  },

  label: {
    fontSize: "14px",
    color: "#64748b",
  },

  value: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#0f172a",
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  cardDesc: {
    fontSize: "14px",
    color: "#64748b",
  },
};

export default EmployeeDashboard;
