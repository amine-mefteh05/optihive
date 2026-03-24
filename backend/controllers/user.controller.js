import User from "../model/user.model.js";
import { generateToken } from "../helpers/token.helpers.js";
import {
  checkEmailExists,
  checkUserCredentials,
  checkEmailUsernameAndPasswordValidity,
} from "../helpers/user.helpers.js";
import { hashPassword } from "../helpers/bcrypt.js";
// US1 - Register
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    checkEmailUsernameAndPasswordValidity({ username, email, password });
    await checkEmailExists(email);
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: user._id });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// US2 - Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await checkUserCredentials(email, password);
    const token = generateToken({ id: user._id });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.name = "UserNotFound";
      error.statusCode = 404;
      next(error);
    }
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
