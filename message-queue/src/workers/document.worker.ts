import { Worker } from "bullmq";

import { redisConfig } from "../config/redis.connection.ts";
import { processDocument } from "../processors/document.processor.ts";

const worker = new Worker(
  "document-processing",
  async (job) => {
    return processDocument(job.data.path, job.data.originalName);
  },
  {
    connection: redisConfig,
  },
);

const shutdown = async () => {
  await worker.close();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default worker;
