export type DocumentResult = {
  filename: string;
  wordCount: number;
  characterCount: number;
  lineCount: number;
  readingTime: number;
  topWords: {
    word: string;
    count: number;
  }[];
};

export type DocumentInput = {
  filename: string;
  originalName: string;
  path: string;
};
