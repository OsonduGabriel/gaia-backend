
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";


//*User registration
export async function registerUser(userData) {
  const { fullName, email, password } = userData;

  // Check whether the email is already registered.
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    const error = new Error("An account with this email already exists.");
    error.status = 409;
    throw error;
  }

  // Hash the password before saving it.
  const passwordHash = await bcrypt.hash(password, 12);

  // Create the user account.
  // The role is not accepted from the request.
  const user = await User.create({
    fullName,
    email,
    passwordHash,
  });

  // Return only safe user information.
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

//*User login
export async function loginUser(loginData) {
  const { email, password } = loginData;

  // Find the user using their email address.
  const user = await User.findOne({
    where: { email },
  });

  // Return a generic error if the account does not exist.
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  // Compare the submitted password with the stored password hash.
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  // Prevent inactive accounts from logging in.
  if (!user.isActive) {
    const error = new Error("Your account has been deactivated.");
    error.status = 403;
    throw error;
  }

  // Generate a JWT access token.
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  // Return the token and safe user information.
  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
}

