import User from "../model/user.model.js";
import { comparePassword } from "./bcrypt.js";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  EMAIL_REGEX,
} from "../../constants.js";
export const checkEmailAndPasswordValidity = ({ email, password }) => {
  if (!email) {
    const err = new Error("Email is required");
    err.statusCode = 400;
    throw err;
  }
  if (!password) {
    const err = new Error("Password is required");
    err.statusCode = 400;
    throw err;
  }
  if (!email.match(EMAIL_REGEX)) {
    const err = new Error("Invalid email");
    err.statusCode = 400;
    throw err;
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    const err = new Error("Password must be at least 8 characters long");
    err.statusCode = 400;
    throw err;
  }
  if (!password.match(PASSWORD_REGEX)) {
    const err = new Error("Invalid password");
    err.statusCode = 400;
    throw err;
  }
};
export const checkEmailUsernameAndPasswordValidity = ({
  email,
  username,
  password,
}) => {
  checkEmailAndPasswordValidity({ email, password });
  if (!username) {
    const err = new Error("Username is required");
    err.statusCode = 400;
    throw err;
  }
  if (username.length < USERNAME_MIN_LENGTH) {
    const err = new Error("Username must be at least 4 characters long");
    err.statusCode = 400;
    throw err;
  }
  if (username.length > USERNAME_MAX_LENGTH) {
    const err = new Error("Username must be at most 16 characters long");
    err.statusCode = 400;
    throw err;
  }
  if (!username.match(USERNAME_REGEX)) {
    const err = new Error("Invalid username");
    err.statusCode = 400;
    throw err;
  }
};
// this helper function checks if the email exists in the database . email must be unique
export const checkEmailExists = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    const err = new Error("Email already exists");
    err.name = "castError";
    err.statusCode = 409;
    throw err;
  }
};

// this helper function checks if the credentials entered by the user are correct
export const checkUserCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Email or password is not correct");
    err.name = "unauthorizedError";
    err.statusCode = 401;
    throw err;
  }
  console.log(user);
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    const err = new Error("Email or password is not correct");
    err.name = "unauthorizedError";
    err.statusCode = 401;
    throw err;
  }
  return user;
};
