import mongoose from "mongoose";

const dashboardConfigSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true
  },
  department: {
    type: String,
    enum: [
      "HR",
      "Sales",
      "Finance",
      "Marketing",
      "Operations",
      "IT",
      "Analytics"
    ],
    required: true
  },
  welcomeText: {
    type: String
  },
  menus: [
    {
      label: String,
      path: String,
      icon: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("DashboardConfig", dashboardConfigSchema);
