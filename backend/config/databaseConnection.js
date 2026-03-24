import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";
import chalk from "chalk";
const connectDB = async () => {
  try {
    console.log(chalk.yellow(MONGO_URI));
    await mongoose.connect(MONGO_URI);
    console.log(chalk.cyan("MongoDB connected"));
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
