
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;

const poolConfig = {
  max: 5,
  min: 0,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 30000,
};

let pool;

if (databaseUrl) {
  // Use a connection URL for Railway or another hosted PostgreSQL database.
  pool = new Pool({
    connectionString: databaseUrl,
    ...poolConfig,
    ...(isProduction && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }),
  });
} else {
  // Use individual environment variables for local development.
  const requiredVariables = [
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "DB_PORT",
  ];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing database environment variables: ${missingVariables.join(", ")}`
    );
  }

  pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    ...poolConfig,
  });
}

// Log unexpected errors on idle connections.
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error.message);
});

// Test the database connection.
export async function connectDatabase() {
  const result = await pool.query("SELECT 1 AS connected");
  return result.rows[0];
}

// Export the pool so services can run parameterised SQL queries.
export default pool;
