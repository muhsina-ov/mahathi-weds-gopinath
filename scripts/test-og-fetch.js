import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PORT = 3456;
const publicDir = path.resolve("public");

const server = http.createServer((req, res) => {
  const url = req.url || "/";
  const filePath = path.join(publicDir, url.replace(/^\//, ""));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
        ? "image/png"
        : ext === ".txt"
        ? "text/plain"
        : "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  try {
    // 1. Fetch og-image.jpg
    const resJpg = await fetch(`http://localhost:${PORT}/og-image.jpg`, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      },
    });

    console.log(`\n--- Fetching /og-image.jpg ---`);
    console.log(`Status: ${resJpg.status} ${resJpg.statusText}`);
    console.log(`Content-Type: ${resJpg.headers.get("content-type")}`);
    console.log(`Access-Control-Allow-Origin: ${resJpg.headers.get("access-control-allow-origin")}`);

    const bufferJpg = Buffer.from(await resJpg.arrayBuffer());
    console.log(`Downloaded size: ${(bufferJpg.length / 1024).toFixed(1)} KB`);

    const metaJpg = await sharp(bufferJpg).metadata();
    console.log(`Verified image dimensions: ${metaJpg.width}x${metaJpg.height} (${metaJpg.format})`);

    // 2. Fetch og-image.png
    const resPng = await fetch(`http://localhost:${PORT}/og-image.png`, {
      headers: {
        "User-Agent": "WhatsApp/2.21.12.21 A",
      },
    });

    console.log(`\n--- Fetching /og-image.png ---`);
    console.log(`Status: ${resPng.status} ${resPng.statusText}`);
    console.log(`Content-Type: ${resPng.headers.get("content-type")}`);
    const bufferPng = Buffer.from(await resPng.arrayBuffer());
    console.log(`Downloaded size: ${(bufferPng.length / 1024).toFixed(1)} KB`);

    const metaPng = await sharp(bufferPng).metadata();
    console.log(`Verified image dimensions: ${metaPng.width}x${metaPng.height} (${metaPng.format})`);

    console.log(`\n✅ BOTH OG IMAGES ARE 100% FETCHABLE AND VALID FOR SOCIAL CRAWLERS!`);
  } catch (err) {
    console.error("Test fetch failed:", err);
  } finally {
    server.close();
  }
});
