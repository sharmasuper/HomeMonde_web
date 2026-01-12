import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
// import { FaUserEdit, FaArrowLeft } from "react-icons/fa";

const EmpProfile = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ESC key → back
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && navigate(-1);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  // 🔐 API CALL
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/employee/me");

        setEmployee(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={ui.loaderWrapper}>
        <div style={ui.loader}>Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={ui.loaderWrapper}>
        <div style={ui.error}>{error}</div>
      </div>
    );
  }
  // const navigate = useNavigate()
  return (
    <div style={ui.overlay} onClick={() => navigate(-1)}>
      {/* animation */}
      <style>
        {`
          @keyframes popUp {
            from {
              opacity: 0;
              transform: scale(0.92) translateY(40px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>

      <div style={ui.card} onClick={(e) => e.stopPropagation()}>
        {/* Back */}
        <button style={ui.backBtn} onClick={() => navigate(-1)}>
          {/* <FaArrowLeft />  */}
          Back
        </button>

        {/* Header */}
        <div style={ui.header}>
          <img
            src={employee.avatar || "https://i.pravatar.cc/150"}
            alt="profile"
            style={ui.avatar}
          />

          <div>
            <h2 style={ui.name}>{employee.name}</h2>
            <p style={ui.role}>{employee.role}</p>
          </div>

          <button
            style={ui.editBtn}
            onClick={() => navigate("/employee/profile/edit")}
          >
            {/* <FaUserEdit /> */}
            Edit
          </button>
        </div>

        {/* Body */}
        <div style={ui.body}>
          <Info label="Email" value={employee.email} />
          <Info label="Department" value={employee.department} />
          <Info label="Joining Date" value={employee.joiningDate} />
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div style={ui.field}>
    <span style={ui.label}>{label}</span>
    <p style={ui.value}>{value}</p>
  </div>
);

const ui = {
  overlay: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, rgba(15,32,39,0.85), rgba(44,83,100,0.9))",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },

  card: {
    width: "420px",
    background: "#fff",
    borderRadius: "20px",
    padding: "26px",
    boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
    animation: "popUp 0.6s ease",
    position: "relative",
  },

  backBtn: {
    position: "absolute",
    top: "14px",
    left: "14px",
    background: "transparent",
    border: "none",
    color: "#2c5364",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 500,
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "20px",
    position: "relative",
  },

  avatar: {
    width: "78px",
    height: "78px",
    borderRadius: "50%",
    border: "3px solid #2c5364",
    objectFit: "cover",
  },

  name: {
    margin: 0,
    fontSize: "21px",
    fontWeight: 600,
  },

  role: {
    margin: 0,
    fontSize: "14px",
    color: "#777",
  },

  editBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    background: "#2c5364",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    gap: "6px",
    fontSize: "14px",
  },

  body: {
    marginTop: "28px",
    display: "grid",
    gap: "16px",
  },

  field: {
    background: "#f6f8fa",
    padding: "12px 14px",
    borderRadius: "12px",
  },

  label: {
    fontSize: "12px",
    color: "#888",
  },

  value: {
    margin: "4px 0 0",
    fontSize: "15px",
    fontWeight: 500,
  },

  loaderWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f2027",
    color: "#fff",
  },

  loader: {
    fontSize: "18px",
    animation: "pulse 1.5s infinite",
  },

  error: {
    color: "#ff6b6b",
    fontSize: "16px",
  },
};

export default EmpProfile;
