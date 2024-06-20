import { Hono } from "hono";
import { renderer } from "./renderer";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "drizzle-orm";
import { sql as VercelSql } from "@vercel/postgres";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello júlio!</h1>);
});

export const db = drizzle(VercelSql);

app.get("/listings", async (c) => {
  const listings = await db.execute(sql`select * from listings limit 10;`);

  return c.render(
    <pre>
      {JSON.stringify(
        listings.rows.map((l) => l.id),
        null,
        2
      )}
    </pre>
  );
});

app.get("/projects/:name", (c) => {
  return c.render(<h1>project {c.req.param("name")}</h1>);
});

export default app;
