
import { Router } from "express";

import {
  getProgrammes,
  getProgramme,
  createNewProgramme,
  editProgramme,
  removeProgramme,
} from "../controllers/programme.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
  validateProgrammeCreation,
  validateProgrammeUpdate,
  validateProgrammeId,
} from "../validators/programme.validator.js";

const router = Router();

// Public routes: anyone can view published programmes.
router.get("/", getProgrammes);
router.get("/:id", validateProgrammeId, getProgramme);

// Admin routes: only authenticated administrators can manage programmes.
router.post("/", protect, authorize("admin"), validateProgrammeCreation, createNewProgramme);

router.patch("/:id", protect, authorize("admin"), validateProgrammeUpdate, editProgramme);

router.delete("/:id", protect, authorize("admin"),  validateProgrammeId, removeProgramme);

export default router;
