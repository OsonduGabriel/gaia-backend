
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// Verify the user's JWT before allowing access to protected routes.
export async function protect(req, res, next) {
  try {
    // Get the Authorization header.
    const authHeader = req.headers.authorization;

    // Check whether the token was provided.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // Extract the token from the header.
    const token = authHeader.split(" ")[1];

    // Verify the token using our secret key.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token.
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    // Prevent deactivated accounts from accessing protected routes.
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    // Attach the authenticated user to the request.
    req.user = user;

    // Continue to the next middleware or controller.
    next();
  } catch (error) {
    // Handle invalid, expired, or malformed tokens.
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    next(error);
  }
}
