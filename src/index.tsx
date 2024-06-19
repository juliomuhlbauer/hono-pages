import { Hono } from "hono";
import { renderer } from "./renderer";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello júlio!</h1>);
});

app.get("/projects/:name", (c) => {
  return c.render(<h1>project {c.req.param("name")}</h1>);
});

export default app;
