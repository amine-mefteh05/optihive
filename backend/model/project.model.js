import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    invitationCode: {
      type: String,
      default: crypto.randomBytes(8).toString("hex"),
    },
    deadline: {
      type: Date,
      required: true,
    },
    Status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
