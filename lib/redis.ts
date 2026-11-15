import "server-only";
import { createClient } from "redis";

// make one Redis client using the URL from .env.local
const redis = createClient({ url: process.env.REDIS_URL });

// connect only if we are not connected already
async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export { redis, connectRedis };