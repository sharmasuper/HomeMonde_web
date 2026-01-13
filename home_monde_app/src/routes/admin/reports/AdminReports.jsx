import React from "react";
import { useNavigate } from "react-router-dom";

const AdminReports = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Daily Updated Reports",
      desc: "View all daily generated reports",
      color: "#2563eb", // blue
      path: "/admin/reports/daily",
    },
    {
      title: "Weekly Updated Reports",
      desc: "View all weekly generated reports",
      color: "#16a34a", // green
      path: "/admin/reports/weekly",
    },
    {
      title: "Monthly Updated Reports",
      desc: "View all monthly generated reports",
      color: "#f59e0b", // orange
      path: "/admin/reports/monthly",
    },
    {
      title: "Yearly Updated Reports",
      desc: "View all yearly generated reports",
      color: "#dc2626", // red
      path: "/admin/reports/yearly",
    },
  ];

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Reports</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "14px",
              padding: "22px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              borderTop: `5px solid ${card.color}`,
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{card.title}</h3>

            <p style={{ color: "#6b7280", fontSize: "14px" }}>{card.desc}</p>

            <button
              onClick={() => navigate(card.path)}
              style={{
                marginTop: "16px",
                backgroundColor: card.color,
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              View Reports →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
