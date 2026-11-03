import queue from "../queues/document.queue.ts";

export async function getDocumentJob(jobId: string) {
  const job = await queue.getJob(jobId);

  if (!job) {
    return null;
  }

  const state = await job.getState();

  return {
    jobId: job.id,
    state,
    result: job.returnvalue,
    failedReason: job.failedReason,
  };
}
