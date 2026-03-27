import User from "../model/user.model.js";
import { comparePassword } from "./bcrypt.js";

// this helper function checks if the credentials entered by the user are correct
export const checkUserCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Email or password is not correct");
    err.name = "unauthorizedError";
    err.statusCode = 401;
    throw err;
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    const err = new Error("Email or password is not correct");
    err.name = "unauthorizedError";
    err.statusCode = 401;
    throw err;
  }
  return user;
};
