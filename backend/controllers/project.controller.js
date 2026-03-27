import Project from "../model/project.model.js";

export const createProject = async (req, res, next) => {
  try {
    const { projectName, projectDescription, deadline } = req.body;
    if (!projectName || !projectDescription || !deadline) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }
    const project = await Project.create({
      creatorId: req.userId,
      projectName,
      projectDescription,
      deadline,
    });
    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (err) {
    next(err);
  }
};
