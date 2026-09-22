import fs from "node:fs";
import path from "node:path";

// TanStack Start SPA mode prerenders the app shell to `_shell.html`.
// Cloudflare Workers Static Assets serves `index.html` for `/` and falls
// back to it for SPA routes, so promote the shell to `index.html`.
const dir = path.resolve(".output/public");
const shell = path.join(dir, "_shell.html");
const index = path.join(dir, "index.html");

if (!fs.existsSync(shell)) {
  console.error(`SPA shell not found: ${shell}`);
  process.exit(1);
}

fs.copyFileSync(shell, index);
console.log("Copied _shell.html -> index.html");
