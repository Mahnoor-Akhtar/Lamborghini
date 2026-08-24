import { readdirSync, writeFileSync, renameSync, rmSync } from "fs";

// Scan built assets
const assets = readdirSync("dist/client/assets");
const css    = assets.find(f => f.endsWith(".css")) ?? "";
const jsFiles = assets.filter(f => f.startsWith("index-") && f.endsWith(".js"));

if (!jsFiles.length) {
  console.error("No JS entry files found in dist/client/assets");
  process.exit(1);
}

const cssTag = css
  ? `  <link rel="stylesheet" crossorigin href="/assets/${css}" />`
  : "";

const jsTags = jsFiles
  .map(f => `  <script type="module" crossorigin src="/assets/${f}"></script>`)
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lamborghini – Power. Luxury. Legacy.</title>
  <meta name="description" content="Explore the Lamborghini lineup: Revuelto SV, Urus SE Performante, and Temerario." />
${cssTag}
${jsTags}
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

writeFileSync("dist/client/index.html", html, "utf-8");
console.log("✅ Generated dist/client/index.html with assets:", jsFiles, css);

try {
  // Move client folder to a temporary location outside of dist
  renameSync("dist/client", "dist-client-temp");
  // Delete the old dist folder (which now only contains server artifacts)
  rmSync("dist", { recursive: true, force: true });
  // Rename the temporary folder back to dist, making it the root
  renameSync("dist-client-temp", "dist");
  console.log("✅ Restructured output directory for Vercel deployment.");
} catch (e) {
  console.error("❌ Failed to restructure output directory:", e);
  process.exit(1);
}

