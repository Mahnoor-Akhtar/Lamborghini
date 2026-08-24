import { readdirSync, writeFileSync } from "fs";

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
</body>
</html>
`;

writeFileSync("dist/client/index.html", html, "utf-8");
console.log("✅ Generated dist/client/index.html with assets:", jsFiles, css);
