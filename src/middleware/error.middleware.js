
export function errorHandler(error, req, res, next) {
  // If the response has already started, let Express handle the error.
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);

  res.status(error.status || 500).json({
    success: false,
    message:
      error.status && error.status < 500
        ? error.message
        : "Internal server error.",
  });
}
