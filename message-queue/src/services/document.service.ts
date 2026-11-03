import queue from "../queues/document.queue.ts";
import type { DocumentInput } from "../types/document.ts";

export async function enqueueDocument(document: DocumentInput) {
  return queue.add("process-document", document);
}
