import { Hono } from "hono";
import { renderer } from "./renderer";
import { neon } from "@neondatabase/serverless";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello júlio!</h1>);
});

const sql = neon(import.meta.env.VITE_DATABASE_URL);

app.get("/listings", async (c) => {
  const listings = await sql`select * from listings limit 10;`;

  return c.render(<div>{JSON.stringify(listings, null, 2)}</div>);
});

app.get("/projects/:name", (c) => {
  return c.render(<h1>project {c.req.param("name")}</h1>);
});

export default app;
