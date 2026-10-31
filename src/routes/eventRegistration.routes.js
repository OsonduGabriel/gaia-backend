
import { Router } from "express";

import {
  createEventRegistration,
  getMyEventRegistrations,
  cancelMyEventRegistration,
  getRegistrationsForEvent,
} from "../controllers/eventRegistration.controller.js";

import {
  validateEventRegistration,
  validateRegistrationId,
  validateRegistrationEventId,
} from "../validators/eventRegistration.validator.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// All registration routes require authentication.
router.use(protect);

// User routes.
router.post(
  "/",
  validateEventRegistration,
  createEventRegistration
);

router.get("/my-registrations", getMyEventRegistrations);

router.patch(
  "/:registrationId/cancel",
  validateRegistrationId,
  cancelMyEventRegistration
);

// Admin route.
router.get(
  "/event/:eventId",
  authorize("admin"),
  validateRegistrationEventId,
  getRegistrationsForEvent
);

export default router;
