export const errorHandler = (err, req, res, next) => {
  console.log(`Error Middleware Triggered: ${err}`);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    success: false,
  });
};
