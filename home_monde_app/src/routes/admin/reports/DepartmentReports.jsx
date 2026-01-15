import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
const DepartmentReports = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const [department, setDepartment] = useState("HR");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const departments = [
    "HR",
    "Sales",
    "Finance",
    "Marketing",
    "Operations",
    "IT",
    "Analytics",
  ];

  // 🔹 Fetch reports when department changes
  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/reports/admin?department=${department}&type=${type}&page=1&limit=10`
      );

      setReports(res.data.data || []);
    } catch (err) {
      console.error(err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [department]);

  // 🔹 Delete report
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await api.delete(`/reports/admin/${id}`);
      fetchReports();
    } catch (err) {
      alert("Failed to delete report");
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{type.toUpperCase()} REPORTS</h1>

        <button
          style={styles.addBtn}
          onClick={() => navigate("/admin/reports/create")}
        >
          <Plus size={18} /> Add Report
        </button>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <label style={styles.label}>Department</label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.select}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* CONTENT */}
      <div style={styles.card}>
        {loading ? (
          <p style={styles.empty}>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p style={styles.empty}>No reports created for this department</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Created</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td style={styles.td}>{report.title}</td>
                  <td style={styles.td}>{report.department}</td>
                  <td style={styles.td}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.iconBtn}
                      onClick={() =>
                        navigate(`/admin/reports/edit/${report._id}`)
                      }
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      style={{ ...styles.iconBtn, color: "#dc2626" }}
                      onClick={() => handleDelete(report._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background: "#f8fafc",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  label: {
    fontWeight: 600,
  },
  select: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
  },
  empty: {
    textAlign: "center",
    color: "#64748b",
    padding: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #f1f5f9",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default DepartmentReports;
