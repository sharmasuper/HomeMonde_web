import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/employee/me");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put("/employee/me", profile);
      alert("Profile updated successfully!");
      navigate("/employee/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
        Loading profile...
      </p>
    );

  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "600",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    color: "#555",
    fontWeight: "500",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
    transition: "0.2s all",
  };

  const inputFocusStyle = {
    borderColor: "#4caf50",
    boxShadow: "0 0 5px rgba(76,175,80,0.3)",
  };

  const buttonsStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const buttonStyle = {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.2s all",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4caf50",
    color: "#fff",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f0f0f0",
    color: "#555",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "department"].map((field) => (
          <div key={field}>
            <label style={labelStyle}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={profile[field] || ""}
              onChange={handleChange}
              required={field === "name" || field === "email"}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>
        ))}

        <div style={buttonsStyle}>
          <button type="submit" style={saveButtonStyle} disabled={updating}>
            {updating ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            style={cancelButtonStyle}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
