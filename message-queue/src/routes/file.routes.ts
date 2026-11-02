import { Router } from "express";
import type { Request, Response } from "express";
import upload from "../middleware/upload.middleware.ts";

const router = Router();

router.post("/", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  return res.status(201).json({
    message: "File uploaded successfully.",
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});
export default router;
