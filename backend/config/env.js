import dotenv from "dotenv";
dotenv.config();

const { PORT, JWT_SECRET, JWT_EXPIRES_IN, MONGO_URI } = process.env;

if (!PORT || !JWT_SECRET || !JWT_EXPIRES_IN || !MONGO_URI) {
  throw new Error("Missing required environment variables");
}

export { PORT, JWT_SECRET, JWT_EXPIRES_IN, MONGO_URI };
