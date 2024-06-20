import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import dotenvExpand from "dotenv-expand";
import { loadEnv, defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  // This check is important!
  if (mode === "development") {
    const env = loadEnv(mode, process.cwd(), "");
    dotenvExpand.expand({ parsed: env });
  }

  return {
    plugins: [
      build(),
      devServer({
        adapter,
        entry: "src/index.tsx",
      }),
    ],
  };
});
