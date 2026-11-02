import multer from "multer";
import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        error: "File size exceeds the 5 MB limit.",
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }

  // Custom file-filter error
  if (
    err instanceof Error &&
    err.message === "Only text or markdown files are allowed!"
  ) {
    return res.status(400).json({
      error: err.message,
    });
  }

  // Unexpected errors
  console.error(err);

  return res.status(500).json({
    error: "Internal server error.",
  });
};

export default errorHandler;
