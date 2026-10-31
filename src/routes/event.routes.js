
import { Router } from "express";

import {
  getEvents,
  getEvent,
  createNewEvent,
  editEvent,
  removeEvent,
} from "../controllers/event.controller.js";

import {
  validateEventCreation,
  validateEventUpdate,
  validateEventId,
} from "../validators/event.validator.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// Public routes.
router.get("/", getEvents);
router.get("/:id", validateEventId, getEvent);

// Admin-only routes.
router.post(
  "/",
  protect,
  authorize("admin"),
  validateEventCreation,
  createNewEvent
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validateEventUpdate,
  editEvent
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  validateEventId,
  removeEvent
);

export default router;
