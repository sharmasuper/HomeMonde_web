import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { employeeOnly } from "../middlewares/role.middleware.js";
import { getMe, getMyDashboard, updateMe } from "../controllers/employeeController.js";
import { addDashboard } from "../controllers/DashboardController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getMyDashboard);
router.post("/dashboard", authMiddleware, addDashboard);

router.use(authMiddleware, employeeOnly);

router.get("/me", getMe);
router.put("/me", updateMe);


export default router;
