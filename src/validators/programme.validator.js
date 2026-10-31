
import { body, param, validationResult } from "express-validator";

// Validate programme creation.
export const validateProgrammeCreation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Programme title is required.")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters."),

  body("summary")
    .optional({ nullable: true })
    .isString()
    .withMessage("Summary must be text."),

  body("description")
    .optional({ nullable: true })
    .isString()
    .withMessage("Description must be text."),

  body("imageUrl")
    .optional({ nullable: true })
    .isURL({ require_protocol: true })
    .withMessage("Please provide a valid image URL."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    next();
  },
];

// Validate programme updates.
export const validateProgrammeUpdate = [
  param("id")
    .isUUID()
    .withMessage("A valid programme ID is required."),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Programme title cannot be empty.")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters."),

  body("summary")
    .optional({ nullable: true })
    .isString()
    .withMessage("Summary must be text."),

  body("description")
    .optional({ nullable: true })
    .isString()
    .withMessage("Description must be text."),

  body("imageUrl")
    .optional({ nullable: true })
    .isURL({ require_protocol: true })
    .withMessage("Please provide a valid image URL."),

  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Invalid programme status."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    next();
  },
];

// Validate programme ID in the URL.
export const validateProgrammeId = [
  param("id")
    .isUUID()
    .withMessage("A valid programme ID is required."),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    next();
  },
];
