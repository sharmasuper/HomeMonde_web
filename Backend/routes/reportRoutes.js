import express from "express";
import {
  createReport,
  updateReport,
  deleteReport,
  getEmployeeReports,
  getAdminReports,
} from "../controllers/reportController.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

/* ADMIN */
router.get(
  "/admin",
  authMiddleware,
  isAdmin,
  getAdminReports
);

router.post("/admin", authMiddleware, isAdmin, createReport);
router.put("/admin/:id", authMiddleware, isAdmin, updateReport);
router.delete("/admin/:id", authMiddleware, isAdmin, deleteReport);

/* EMPLOYEE */
router.get("/employee", authMiddleware, getEmployeeReports);

export default router;
