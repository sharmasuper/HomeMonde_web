import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  // 🔴 LOGOUT
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/employee/dashboard");
        setDashboardData(res.data.dashboard);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  if (!dashboardData)
    return <p style={{ padding: "20px" }}>No dashboard data found.</p>;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>{dashboardData.welcomeText}</h2>

        <div style={styles.headerRight}>
          <span style={styles.roleBadge}>
            {dashboardData.role || "Employee"}
          </span>

          {/* Logout */}
          <span style={styles.logoutBtn} title="Logout" onClick={handleLogout}>
            ⎋
          </span>
        </div>
      </div>

      {/* Action Cards */}
      <div style={styles.cardsGrid}>
        {dashboardData.menus.map((menu) => (
          <ActionCard
            key={menu._id}
            title={menu.label}
            desc={`Go to ${menu.label}`}
            onClick={() => navigate(`/employee/${menu.path}`)}
          />
        ))}
      </div>
    </div>
  );
};

// Action Card
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

// Styles
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

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
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

  logoutBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#e2e8f0",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
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
