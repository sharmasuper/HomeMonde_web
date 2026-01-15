import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportsPopup() {
  // ---------- Static dashboards ----------
  const dashboardsData = [
    {
      _id: "1",
      name: "Sales Dashboard",
      rolesAllowed: ["employee", "manager", "admin"],
      reports: Array.from({ length: 10 }, (_, i) => ({
        id: `sales-${i + 1}`,
        name: `Sales Report ${i + 1}`,
      })),
    },
    {
      _id: "2",
      name: "HR Dashboard",
      rolesAllowed: ["manager", "admin"],
      reports: Array.from({ length: 20 }, (_, i) => ({
        id: `hr-${i + 1}`,
        name: `HR Report ${i + 1}`,
      })),
    },
    {
      _id: "3",
      name: "Finance Dashboard",
      rolesAllowed: ["admin"],
      reports: Array.from({ length: 5 }, (_, i) => ({
        id: `finance-${i + 1}`,
        name: `Finance Report ${i + 1}`,
      })),
    },
  ];

  const roles = ["employee", "manager", "admin"];

  // ---------- State ----------
  const [dashboards, setDashboards] = useState(dashboardsData);
  const [selectedRole, setSelectedRole] = useState("");
  const [filteredDashboards, setFilteredDashboards] = useState([]);
  const [selectedDashboard, setSelectedDashboard] = useState("");
  const [currentReports, setCurrentReports] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ---------- Role filtering ----------
  useEffect(() => {
    if (selectedRole) {
      const filtered = dashboards.filter((d) =>
        d.rolesAllowed.includes(selectedRole)
      );
      setFilteredDashboards(filtered);
      setSelectedDashboard("");
      setCurrentReports([]);
      setCurrentPage(1);
    } else {
      setFilteredDashboards([]);
      setSelectedDashboard("");
      setCurrentReports([]);
      setCurrentPage(1);
    }
  }, [selectedRole, dashboards]);

  // ---------- Dashboard selection ----------
  useEffect(() => {
    if (selectedDashboard) {
      const dash = dashboards.find((d) => d._id === selectedDashboard);
      setCurrentReports(dash ? dash.reports : []);
      setCurrentPage(1);
    } else {
      setCurrentReports([]);
      setCurrentPage(1);
    }
  }, [selectedDashboard, dashboards]);

  // ---------- Pagination ----------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedReports = currentReports.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(currentReports.length / itemsPerPage);

  const goNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // ---------- Report Actions ----------
  const handleAddReport = () => {
    const name = prompt("Enter new report name:");
    if (name && selectedDashboard) {
      setDashboards((prev) =>
        prev.map((d) =>
          d._id === selectedDashboard
            ? {
                ...d,
                reports: [...d.reports, { id: Date.now().toString(), name }],
              }
            : d
        )
      );
    }
  };

  const handleEditReport = (reportId) => {
    const newName = prompt("Edit report name:");
    if (newName && selectedDashboard) {
      setDashboards((prev) =>
        prev.map((d) =>
          d._id === selectedDashboard
            ? {
                ...d,
                reports: d.reports.map((r) =>
                  r.id === reportId ? { ...r, name: newName } : r
                ),
              }
            : d
        )
      );
    }
  };

  const handleDeleteReport = (reportId) => {
    if (
      selectedDashboard &&
      window.confirm("Are you sure to delete this report?")
    ) {
      setDashboards((prev) =>
        prev.map((d) =>
          d._id === selectedDashboard
            ? { ...d, reports: d.reports.filter((r) => r.id !== reportId) }
            : d
        )
      );
    }
  };

  // ---------- Styles ----------
  const containerStyle = {
    width: "100%",
    maxWidth: "700px",
    padding: "2rem",
    borderRadius: "20px",
    background: "linear-gradient(to bottom right, #eef2ff, #ffffff)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  };
  const selectStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };
  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    marginRight: "0.5rem",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#4f46e5",
  };

  return (
    <div style={{ padding: "2rem", background: "#e0e7ff", minHeight: "100vh" }}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Admin Reports Management
        </h2>

        {/* Role Selector */}
        <select
          style={selectStyle}
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">-- Select Role --</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        {/* Dashboard Selector */}
        {filteredDashboards.length > 0 && (
          <select
            style={selectStyle}
            value={selectedDashboard}
            onChange={(e) => setSelectedDashboard(e.target.value)}
          >
            <option value="">-- Select Dashboard --</option>
            {filteredDashboards.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        )}

        {/* Action: Add Report */}
        {selectedDashboard && (
          <button
            style={{ ...buttonStyle, marginBottom: "1rem" }}
            onClick={handleAddReport}
          >
            Add Report
          </button>
        )}

        {/* Reports List */}
        <div style={{ display: "grid", gap: "1rem" }}>
          <AnimatePresence>
            {paginatedReports.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "10px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                }}
              >
                <span>{r.name}</span>
                <div>
                  <button
                    style={buttonStyle}
                    onClick={() => handleEditReport(r.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...buttonStyle, backgroundColor: "#dc2626" }}
                    onClick={() => handleDeleteReport(r.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ ...buttonStyle, backgroundColor: "#059669" }}
                    onClick={() => alert(`View ${r.name}`)}
                  >
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {currentReports.length > itemsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              alignItems: "center",
            }}
          >
            <button
              style={{ ...buttonStyle, backgroundColor: "#6b7280" }}
              onClick={goPrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              style={{ ...buttonStyle, backgroundColor: "#6b7280" }}
              onClick={goNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
