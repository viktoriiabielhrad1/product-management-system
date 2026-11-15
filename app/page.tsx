// app/page.tsx
import { redis, connectRedis } from "@/lib/redis";
import Image from "next/image";
//load the page fresh on every visit so it always reads from redis
export const dynamic = "force-dynamic";

export default async function Home() {
  await connectRedis();

  //get all the home page text from the redis cache
  const text = await redis.hGetAll("home");

  return (
    <section className="page">
      <p className="eyebrow">{text.eyebrow}</p>
      <h1>{text.title}</h1>
      <p className="description">{text.description}</p>

      <div className="card">
        <h2>{text.cardTitle}</h2>
        <p>{text.cardText}</p>
        <br></br><br></br><br></br>
        <Image
  src="https://res.cloudinary.com/mrhojmpl/image/upload/v1794769940/banner.jpg"
  width={676}
  height={380}
  alt="Laptops on a desk"
  priority
  style={{ width: "100%", height: "auto", borderRadius: 20, marginBottom: 18 }}
/>
      </div>
    </section>
  );
}