import path from "node:path";
import { randomUUID } from "node:crypto";

import type { Request } from "express";

import multer, { type FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (_req, file, cb) => {
    cb(null, randomUUID() + path.extname(file.originalname).toLowerCase());
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const types = /\.(md|txt)$/i;
  const ext = types.test(file.originalname);

  if (ext) return cb(null, true);
  cb(new Error("Only text or markdown files are allowed!"));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;
