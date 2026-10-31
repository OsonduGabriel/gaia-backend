
import { Router } from "express";

import {
  getResources,
  getResource,
  createNewResource,
  editResource,
  removeResource,
} from "../controllers/resource.controller.js";

import {
  validateResourceCreation,
  validateResourceUpdate,
  validateResourceId,
} from "../validators/resource.validator.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// Public routes.
router.get("/", getResources);
router.get("/:id", validateResourceId, getResource);

// Admin-only routes.
router.post(
  "/",
  protect,
  authorize("admin"),
  validateResourceCreation,
  createNewResource
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validateResourceUpdate,
  editResource
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  validateResourceId,
  removeResource
);

export default router;
