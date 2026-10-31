
import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import programmeRoutes from "./programme.routes.js";
import resourceRoutes from "./resource.routes.js";
import eventRoutes from "./event.routes.js";

const router = Router();

// Authentication endpoints.
router.use("/auth", authRoutes);

// User endpoints.
router.use("/users", userRoutes);

// Programme endpoints.
router.use("/programmes", programmeRoutes);

//Resource endpoints
router.use("/resources", resourceRoutes)

//Event endpoints
router.use("/events", eventRoutes)

export default router;
