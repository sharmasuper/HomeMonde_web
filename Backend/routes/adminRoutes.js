import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";
import { getAllEmployees, getEmployeeById } from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware, adminOnly);

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);

export default router;
