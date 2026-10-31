
import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

import {  getProfile,  updateProfile,} from "../controllers/profile.controller.js";

import {  validateProfileUpdate,} from "../validators/profile.validator.js";

const router = Router();

// All routes below require authentication.
router.use(protect);

// Get the logged-in user's profile.
router.get("/me", getProfile);

// Update the logged-in user's profile.
router.patch("/me", validateProfileUpdate, updateProfile);

export default router;
