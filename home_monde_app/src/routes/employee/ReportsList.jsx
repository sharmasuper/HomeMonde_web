import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
// path apne project ke according adjust kar lena

const ReportsList = () => {
  const { type } = useParams(); // daily / weekly / monthly
  const [page, setPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [type, page]);
  // console.log("show type", type);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/reports/employee?type=${type}&page=${page}`);

      setReports(res.data.reports);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load reports", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>{type.toUpperCase()} REPORTS</h2>

      <div style={styles.list}>
        {loading ? (
          <div style={styles.item}>Loading...</div>
        ) : reports.length === 0 ? (
          <div style={styles.item}>No reports found</div>
        ) : (
          reports.map((r) => (
            <div key={r._id} style={styles.item}>
              <span>{r.title}</span>
              <a
                href={r.reportUrl}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                View
              </a>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={styles.pageBtn}
        >
          Prev
        </button>

        <span style={styles.pageNo}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={styles.pageBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background: "#f9fafb",
    fontFamily: "system-ui",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  list: {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "15px",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  pageBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    cursor: "pointer",
    background: "#fff",
  },
  pageNo: {
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default ReportsList;
