
import { body, validationResult } from "express-validator";

export const validateProfileUpdate = [
  body("phone")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone number cannot exceed 30 characters."),

  body("location")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Location cannot exceed 150 characters."),

  body("bio")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Bio cannot exceed 1000 characters."),

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
