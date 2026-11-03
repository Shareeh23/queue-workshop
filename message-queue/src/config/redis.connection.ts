const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not defined.");
}

const redisConnection = new URL(redisUrl);

export const redisConfig = {
  host: redisConnection.hostname,
  port: Number(redisConnection.port) || 6379,
  ...(redisConnection.password && {
    password: decodeURIComponent(redisConnection.password),
  }),
};
