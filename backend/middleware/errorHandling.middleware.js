const mongooseErrorCodes = {
  11000: {
    statusCode: 409,
    message: "Resource already exists",
  },
  ValidationError: {
    statusCode: 400,
    message: "Validation error",
  },
  CastError: {
    statusCode: 400,
    message: "Invalid input",
  },
  DuplicateKeyError: {
    statusCode: 409,
    message: "Resource already exists",
  },
};

export const errorHandler = (err, _req, res, _next) => {
  if (err.name === "MongoServerError" && mongooseErrorCodes[err.code]) {
    const { statusCode, message } = mongooseErrorCodes[err.code];
    return res.status(statusCode).json({ message });
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
};
