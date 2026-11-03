import { readFile } from "node:fs/promises";

import type { DocumentResult } from "../types/document.ts";

export const processDocument = async (
  filePath: string,
  originalName: string,
): Promise<DocumentResult> => {
  const content = await readFile(filePath, "utf-8");

  const words = content.match(/\b[\p{L}\p{N}]+\b/gu) ?? [];

  const wordCount = words.length;

  const characterCount = content.length;

  const lineCount =
    content.length === 0 ? 0 : content.split(/\r\n|\n|\r/).length;

  const readingTime = Math.ceil(wordCount / 200);

  const wordFrequency = new Map<string, number>();

  for (const word of words) {
    const normalizedWord = word.toLowerCase();

    wordFrequency.set(
      normalizedWord,
      (wordFrequency.get(normalizedWord) ?? 0) + 1,
    );
  }

  const topWords = Array.from(wordFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
    }));

  return {
    filename: originalName,
    wordCount,
    characterCount,
    lineCount,
    readingTime,
    topWords,
  };
};
