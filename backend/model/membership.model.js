import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: ["member", "project_manager"],
      default: "member",
    },
  },
  { timestamps: true },
);

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
