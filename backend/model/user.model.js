import mongoose from "mongoose";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
  EMAIL_REGEX,
} from "../../constants.mjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: USERNAME_MIN_LENGTH,
      maxlength: USERNAME_MAX_LENGTH,
      match: USERNAME_REGEX,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [EMAIL_REGEX, "Please use a valid email"],
    },
    password: {
      //validate password in helper because password is hashed
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      default: 1,
    },
    roleName: {
      type: String,
      default: "",
    },
    roleDescription: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
