
import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// Authentication endpoints.
router.use("/auth", authRoutes);

// User endpoints.
router.use("/users", userRoutes);

export default router;
