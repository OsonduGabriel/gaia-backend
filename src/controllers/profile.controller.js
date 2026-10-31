
import {
  getUserProfile,
  updateUserProfile,
} from "../services/profile.service.js";

// Get the logged-in user's profile.
export async function getProfile(req, res, next) {
  try {
    const profile = await getUserProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      data: {
        user: {
          id: req.user.id,
          fullName: req.user.fullName,
          email: req.user.email,
          role: req.user.role,
        },
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Update the logged-in user's profile.
export async function updateProfile(req, res, next) {
  try {
    const profile = await updateUserProfile(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
}
