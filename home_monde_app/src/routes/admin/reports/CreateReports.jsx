import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const CreateReports = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "",
    type: "",
    reportUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const departments = [
    "HR",
    "Sales",
    "Finance",
    "Marketing",
    "Operations",
    "IT",
    "Analytics",
  ];

  const reportTypes = ["daily", "weekly", "monthly", "yearly"];

  /* ---------------- SUBMIT REPORT ---------------- */
  const handleSubmit = async () => {
    if (!form.title || !form.department || !form.type || !form.reportUrl) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setSuccess("");

      await api.post("/reports/admin", form);

      setSuccess("Report created successfully");

      // Auto navigate back after 1.5 sec
      setTimeout(() => {
        navigate("/admin/reports");
      }, 1500);
    } catch (err) {
      alert(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Back button always visible */}
      <button style={styles.topBack} onClick={() => navigate("/admin/reports")}>
        ← Back
      </button>

      <h2 style={styles.heading}>Admin – Create Department Report</h2>
      <p style={styles.subHeading}>
        Admin controls all department-wise Power BI reports
      </p>

      <div style={styles.card}>
        {/* Title */}
        <div style={styles.field}>
          <label style={styles.label}>Report Title</label>
          <input
            style={styles.input}
            placeholder="e.g. HR Attendance Dashboard"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Department */}
        <div style={styles.field}>
          <label style={styles.label}>Department</label>
          <select
            style={styles.input}
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div style={styles.field}>
          <label style={styles.label}>Report Type</label>
          <select
            style={styles.input}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="">Select Frequency</option>
            {reportTypes.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* URL */}
        <div style={styles.field}>
          <label style={styles.label}>Report URL</label>
          <input
            style={styles.input}
            placeholder="https://powerbi.com/..."
            value={form.reportUrl}
            onChange={(e) => setForm({ ...form, reportUrl: e.target.value })}
          />
        </div>

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Report"}
        </button>

        {success && <p style={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

export default CreateReports;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: 24,
    fontFamily: "Inter, system-ui",
  },
  topBack: {
    background: "transparent",
    border: "none",
    color: "#2563eb",
    fontSize: 14,
    cursor: "pointer",
    marginBottom: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: 600,
    color: "#0f172a",
  },
  subHeading: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  },
  card: {
    maxWidth: 520,
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
    display: "block",
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },
  button: {
    width: "100%",
    marginTop: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 0",
    borderRadius: 10,
    fontSize: 15,
    cursor: "pointer",
  },
  success: {
    marginTop: 12,
    textAlign: "center",
    color: "#16a34a",
    fontSize: 14,
  },
};
