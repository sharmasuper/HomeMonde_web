// routes/dashboardRoutes.js
import express from "express";
import { addDashboard } from "../controllers/DashboardController.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST route
router.post("/dashboard", authMiddleware, addDashboard);

export default router;
