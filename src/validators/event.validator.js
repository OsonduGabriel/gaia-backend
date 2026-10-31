
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

// Validate event creation.
export const validateEventCreation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Event title is required.")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be text."),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be text."),

  body("startsAt")
    .notEmpty()
    .withMessage("Event start date and time are required.")
    .isISO8601()
    .withMessage("Start date must be valid."),

  body("endsAt")
    .notEmpty()
    .withMessage("Event end date and time are required.")
    .isISO8601()
    .withMessage("End date must be valid.")
    .custom((value, { req }) => {
      if (
        req.body.startsAt &&
        new Date(value) < new Date(req.body.startsAt)
      ) {
        throw new Error("Event end time cannot be before start time.");
      }

      return true;
    }),

  body("coverImageUrl")
    .optional()
    .isURL()
    .withMessage("Cover image URL must be a valid URL."),

  checkValidation,
];

// Validate event updates.
export const validateEventUpdate = [
  param("id")
    .isUUID()
    .withMessage("Invalid event ID."),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty.")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be text."),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be text."),

  body("startsAt")
    .optional()
    .isISO8601()
    .withMessage("Start date must be valid."),

  body("endsAt")
    .optional()
    .isISO8601()
    .withMessage("End date must be valid.")
    .custom((value, { req }) => {
      const start = req.body.startsAt;

      if (start && new Date(value) < new Date(start)) {
        throw new Error("Event end time cannot be before start time.");
      }

      return true;
    }),

  body("coverImageUrl")
    .optional()
    .isURL()
    .withMessage("Cover image URL must be a valid URL."),

  body("status")
    .optional()
    .isIn(["draft", "published", "cancelled", "completed"])
    .withMessage("Invalid event status."),

  checkValidation,
];

// Validate event ID.
export const validateEventId = [
  param("id")
    .isUUID()
    .withMessage("Invalid event ID."),

  checkValidation,
];
