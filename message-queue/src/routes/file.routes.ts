import { Router } from "express";

import type { Request, Response } from "express";

import upload from "../middleware/upload.middleware.ts";
import { unlink } from "node:fs/promises";
import { enqueueDocument } from "../services/document.service.ts";
import { getDocumentJob } from "../services/job.service.ts";

const router = Router();

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const job = await enqueueDocument({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
    });

    return res.status(202).json({
      message: "File uploaded and queued for processing.",
      jobId: job.id,
      status: "waiting",
    });
  } catch (error) {
    await unlink(req.file.path).catch(() => undefined);
    throw error;
  }
});

router.get("/:jobId", async (req: Request, res: Response) => {
  const job = await getDocumentJob(req.params.jobId as string);

  if (!job) {
    return res.status(404).json({
      message: "Job not found.",
    });
  }

  return res.status(200).json(job);
});

export default router;
