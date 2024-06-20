import { Hono } from "hono";
import { renderer } from "./renderer";
import { neon } from "@neondatabase/serverless";
// import { neon } from "@neondatabase/serverless";
// import postgres from "postgres";
// import { createPool } from "@vercel/postgres";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello júlio!</h1>);
});

// const pool = createPool({
//   connectionString: import.meta.env.VITE_DATABASE_URL,
//   maxUses: 1,
// });

const sql = neon(import.meta.env.VITE_DATABASE_URL);

app.get("/listings", async (c) => {
  const listings = await sql`select * from imoveis limit 10;`;

  return c.render(
    <pre>
      {JSON.stringify(
        listings.map((l) => l.id),
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
