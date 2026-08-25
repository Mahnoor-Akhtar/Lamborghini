import { readFileSync, writeFileSync, rmSync, cpSync } from "fs";

// Read the compiler-generated SPA shell
let html;
try {
  html = readFileSync("dist/client/_shell.html", "utf-8");
  console.log("✅ Read dist/client/_shell.html successfully.");
} catch (e) {
  console.error("❌ Failed to read dist/client/_shell.html:", e);
  process.exit(1);
}

// Write the shell content as index.html
writeFileSync("dist/client/index.html", html, "utf-8");
console.log("✅ Copied SPA shell to dist/client/index.html");

try {
  // Copy client folder to a temporary location outside of dist
  cpSync("dist/client", "dist-client-temp", { recursive: true });
  // Delete the old dist folder (which now only contains server artifacts)
  rmSync("dist", { recursive: true, force: true });
  // Copy the temporary folder back to dist, making it the root
  cpSync("dist-client-temp", "dist", { recursive: true });
  // Delete the temporary folder
  rmSync("dist-client-temp", { recursive: true, force: true });
  console.log("✅ Restructured output directory for Vercel deployment.");
} catch (e) {
  console.error("❌ Failed to restructure output directory:", e);
  process.exit(1);
}

