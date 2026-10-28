
import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import pool, { connectDatabase } from "./config/database.js";
import Routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Parse incoming JSON requests.
app.use(express.json());

// Add basic HTTP security headers.
app.use(helmet());

// Configure allowed frontend origins.
// Set FRONTEND_URL in .env when the frontend URL is known.
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// API health check.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Daughters of Gaia API",
    version: "1.0.0",
    status: "Running",
  });
});

// Database health check.
app.get("/health/db", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "Database connection is healthy.",
    });
  } catch (error) {
    next(error);
  }
});

// Mount API routes.
app.use("/api/v1", Routes);

// Handle unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Error handler must remain last.
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Verify the database before starting the API.
async function startServer() {
  try {
    await connectDatabase();
    console.log("PostgreSQL connected successfully.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Daughters of Gaia API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the API:", error.message);
    process.exit(1);
  }
}

startServer();

export default app;
