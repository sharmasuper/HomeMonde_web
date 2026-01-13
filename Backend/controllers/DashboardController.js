// controllers/DashboardController.js
import DashboardConfig from "../models/DashboardConfig.js";

// POST /api/employee/dashboard
export const addDashboard = async (req, res) => {
  try {
    const { role, department, welcomeText, menus } = req.body;

    if (!role || !department) {
      return res.status(400).json({ message: "Role and department are required" });
    }

    const existing = await DashboardConfig.findOne({ role, department });
    if (existing) {
      return res.status(400).json({ message: "Dashboard for this department already exists" });
    }

    const newDashboard = await DashboardConfig.create({
      role,
      department,
      welcomeText: welcomeText || `Welcome ${department} Employee`,
      menus: menus || []
    });

    return res.status(201).json({
      message: "Dashboard added successfully",
      dashboard: newDashboard
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
