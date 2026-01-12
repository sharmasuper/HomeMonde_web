import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { employeeOnly } from "../middlewares/role.middleware.js";
import { getMe, updateMe } from "../controllers/employeeController.js";

const router = express.Router();

router.use(authMiddleware, employeeOnly);

router.get("/me", getMe);
router.put("/me", updateMe);

export default router;
