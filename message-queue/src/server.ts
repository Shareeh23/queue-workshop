import express from "express";
import helmet from "helmet";
import type { Request, Response } from "express";
import errorHandler from "./middleware/error.middleware.ts";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.disable("x-powered-by");

app.use(helmet());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down...`);

  server.close(() => {
    console.log("HTTP server closed.");
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
