import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmpReports = () => {
  const navigate = useNavigate();
  const { department } = useParams();
  //   console.log(department);

  const reports = [
    { title: "Daily Updated Reports", type: "daily", color: "#2563eb" },
    { title: "Weekly Updated Reports", type: "weekly", color: "#16a34a" },
    { title: "Monthly Updated Reports", type: "monthly", color: "#f59e0b" },
    { title: "Yearly Updated Reports", type: "yearly", color: "#dc2626" },
  ];

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Employee Reports</h2>

      <div style={styles.grid}>
        {reports.map((r) => (
          <div
            key={r.type}
            style={{ ...styles.card, borderTop: `5px solid ${r.color}` }}
            onClick={() =>
              navigate(`/employee/${department}/reports/${r.type}`)
            }
          >
            <h3 style={styles.cardTitle}>{r.title}</h3>
            <p style={styles.cardDesc}>View all {r.type} generated reports</p>
            <button style={{ ...styles.button, background: r.color }}>
              View Reports →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(180deg,#f8fafc,#eef2f7)",
    fontFamily: "system-ui",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
    gap: "24px",
  },
  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.3s",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "18px",
  },
  button: {
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default EmpReports;
