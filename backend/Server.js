import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import cors from "cors"; 

dotenv.config();

const app = express();
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);                                                                           
// 
app.use("/api/users", userRoutes);
// 
app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);
// 
app.use("/api/reports", reportRoutes);

app.listen(process.env.PORT, () => console.log("Server running on port ",process.env.PORT));
