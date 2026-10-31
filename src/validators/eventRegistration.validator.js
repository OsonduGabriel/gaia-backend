
import { body, param, validationResult } from "express-validator";

// Handle validation errors.
function checkValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
}

// Validate event registration.
export const validateEventRegistration = [
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required.")
    .isUUID()
    .withMessage("Invalid event ID."),

  checkValidation,
];

// Validate registration ID.
export const validateRegistrationId = [
  param("registrationId")
    .isUUID()
    .withMessage("Invalid registration ID."),

  checkValidation,
];

// Validate event ID for admin registration list.
export const validateRegistrationEventId = [
  param("eventId")
    .isUUID()
    .withMessage("Invalid event ID."),

  checkValidation,
];
