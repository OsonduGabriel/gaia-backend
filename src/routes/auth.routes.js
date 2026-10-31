
import { Router } from "express";

import { register, login } from "../controllers/auth.controller.js";
import { validateRegistration, validateLogin } from "../validators/auth.validator.js";

const router = Router();

// POST /api/v1/auth/register
router.post("/register", validateRegistration, register);

// Login an existing account.
router.post("/login", validateLogin, login);

export default router;

