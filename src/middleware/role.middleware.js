
/**
 * Restrict access to users with specific roles.
 *
 * Example:
 * authorize("admin")
 * authorize("admin", "editor")
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    // Ensure the user has passed authentication first.
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Check whether the user's role is allowed.
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
}
