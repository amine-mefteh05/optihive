import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import chalk from "chalk";
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`));
});
