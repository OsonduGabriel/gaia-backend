
import { registerUser, loginUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Login an existing user.
export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
