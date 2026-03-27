import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "../../constants.mjs";
export const validateUsername = (req, res, next) => {
  try {
    const username = req.body?.username?.toString();
    if (!username) {
      const err = new Error("Username is required");
      err.statusCode = 400;
      throw err;
    }
    if (username.length < USERNAME_MIN_LENGTH) {
      const err = new Error("Username must be at least 3 characters long");
      err.statusCode = 400;
      throw err;
    }
    if (username.length > USERNAME_MAX_LENGTH) {
      const err = new Error("Username must be at most 20 characters long");
      err.statusCode = 400;
      throw err;
    }
    if (!USERNAME_REGEX.test(username)) {
      const err = new Error("Username must contain only letters and numbers");
      err.statusCode = 400;
      throw err;
    }
    req.username = username;
    next();
  } catch (err) {
    next(err);
  }
};

export const validateEmail = (req, res, next) => {
  try {
    const email = req.body?.email?.toString();
    if (!email) {
      const err = new Error("Email is required");
      err.statusCode = 400;
      throw err;
    }
    if (!EMAIL_REGEX.test(email)) {
      const err = new Error("Email must be a valid email");
      err.statusCode = 400;
      throw err;
    }
    req.email = email;
    next();
  } catch (err) {
    next(err);
  }
};

export const validatePassword = (req, res, next) => {
  try {
    const password = req.body?.password?.toString();
    if (!password) {
      const err = new Error("Password is required");
      err.statusCode = 400;
      throw err;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      const err = new Error("Password must be at least 8 characters long");
      err.statusCode = 400;
      throw err;
    }
    if (!PASSWORD_REGEX.test(password)) {
      const err = new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
      err.statusCode = 400;
      throw err;
    }
    req.password = password;
    next();
  } catch (err) {
    next(err);
  }
};
