import { Queue } from "bullmq";
import { redisConfig } from "../config/redis.connection.ts";

const queue = new Queue("document-processing", {
  connection: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: false,
    removeOnFail: false,
  },
});

export default queue;
