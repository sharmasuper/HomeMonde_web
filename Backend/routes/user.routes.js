import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { getAllUsers, getMyProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", authMiddleware, isAdmin, getAllUsers);
router.get("/me", authMiddleware, getMyProfile);

export default router;
