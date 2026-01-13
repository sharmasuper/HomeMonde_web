import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fake API (replace later)
  useEffect(() => {
    setTimeout(() => {
      setStats({
        admin: "Mohit Sharma",
        totalEmployees: 28,
        activeEmployees: 23,
        pendingRequests: 5,
        lastLogin: "Today, 9:10 AM",
      });
      setLoading(false);
    }, 900);
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderWrapper}>
        <div style={styles.loader}></div>
        <p style={styles.loaderText}>Preparing admin panel...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.heading}>Admin Dashboard</h2>
          <p style={styles.subHeading}>System overview & controls</p>
        </div>
        <span style={styles.adminBadge}>Admin</span>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Employees" value={stats.totalEmployees} />
        <StatCard title="Active Employees" value={stats.activeEmployees} />
        <StatCard title="Pending Requests" value={stats.pendingRequests} />
        <StatCard title="Last Login" value={stats.lastLogin} />
      </div>

      {/* Management */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Management</h3>
        <div style={styles.actionGrid}>
          <ActionCard
            title="Employees"
            onClick={() => navigate("/admin/employees")}
            desc="View & manage employees"
          />
          <ActionCard title="Roles & Access" desc="Control permissions" />
          <ActionCard
            title="Reports"
            onClick={() => navigate("/admin/reports")}
            desc="System activity reports"
          />
          <ActionCard title="Settings" desc="Platform configuration" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.statCard,
        transform: hover ? "scale(1.04)" : "scale(1)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p style={styles.statTitle}>{title}</p>
      <h3 style={styles.statValue}>{value}</h3>
    </div>
  );
};

const ActionCard = ({ title, desc, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick} // 👈 THIS IS THE KEY
      style={{
        ...styles.actionCard,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 18px 40px rgba(0,0,0,0.18)"
          : "0 10px 25px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="button"
    >
      <h4 style={styles.actionTitle}>{title}</h4>
      <p style={styles.actionDesc}>{desc}</p>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "30px",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "#e5e7eb",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#f8fafc",
  },

  subHeading: {
    fontSize: "14px",
    color: "#94a3b8",
    marginTop: "4px",
  },

  adminBadge: {
    padding: "8px 18px",
    background: "linear-gradient(135deg, #7c3aed, #2563eb)",
    borderRadius: "22px",
    fontSize: "14px",
    fontWeight: "500",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },

  statCard: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    borderRadius: "18px",
    padding: "22px",
    transition: "all 0.3s ease",
  },

  statTitle: {
    fontSize: "14px",
    color: "#cbd5f5",
    marginBottom: "6px",
  },

  statValue: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#f1f5f9",
  },

  section: {
    marginTop: "10px",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "18px",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "22px",
  },

  actionCard: {
    background: "linear-gradient(135deg, #1e293b, #020617)",
    borderRadius: "18px",
    padding: "26px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  actionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  actionDesc: {
    fontSize: "14px",
    color: "#94a3b8",
  },

  loaderWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    color: "#cbd5f5",
  },

  loader: {
    width: "42px",
    height: "42px",
    border: "4px solid #334155",
    borderTop: "4px solid #7c3aed",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loaderText: {
    marginTop: "14px",
  },
};

export default AdminDashboard;
