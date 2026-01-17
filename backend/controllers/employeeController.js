    // new file create for two api 
import User from "../models/User.model.js";
import DashboardConfig from "../models/DashboardConfig.js";
// GET /employee/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /employee/me
export const updateMe = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dashboard = await DashboardConfig.findOne({
      role: user.role,
      department: user.department
    });

    if (!dashboard) {
      return res.status(404).json({
        message: "Dashboard not configured for this department"
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        department: user.department
      },
      dashboard: {
        welcomeText: dashboard.welcomeText,
        menus: dashboard.menus
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};