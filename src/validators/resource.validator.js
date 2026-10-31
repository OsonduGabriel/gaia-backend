
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

// Validate resource creation.
export const validateResourceCreation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Resource title is required.")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be text."),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be text."),

  body("fileUrl")
    .optional()
    .isURL()
    .withMessage("File URL must be a valid URL."),

  body("coverImageUrl")
    .optional()
    .isURL()
    .withMessage("Cover image URL must be a valid URL."),

  checkValidation,
];

// Validate resource updates.
export const validateResourceUpdate = [
  param("id")
    .isUUID()
    .withMessage("Invalid resource ID."),

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

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be text."),

  body("fileUrl")
    .optional()
    .isURL()
    .withMessage("File URL must be a valid URL."),

  body("coverImageUrl")
    .optional()
    .isURL()
    .withMessage("Cover image URL must be a valid URL."),

  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("Invalid resource status."),

  checkValidation,
];

// Validate resource ID.
export const validateResourceId = [
  param("id")
    .isUUID()
    .withMessage("Invalid resource ID."),

  checkValidation,
];
