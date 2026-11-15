// app/page.tsx
import { redis, connectRedis } from "@/lib/redis";

// load the page fresh on every visit, so it always reads from Redis
export const dynamic = "force-dynamic";

export default async function Home() {
  await connectRedis();

  // get all the home page text from the Redis cache
  const text = await redis.hGetAll("home");

  return (
    <section className="page">
      <p className="eyebrow">{text.eyebrow}</p>
      <h1>{text.title}</h1>
      <p className="description">{text.description}</p>

      <div className="card">
        <h2>{text.cardTitle}</h2>
        <p>{text.cardText}</p>
      </div>
    </section>
  );
}