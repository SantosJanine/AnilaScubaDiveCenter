import fs from "fs";
import path from "path";

const apiDir = path.join(process.cwd(), "app", "api");

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  if (!content.includes('export const dynamic = "force-dynamic";')) {
    content = `export const dynamic = "force-dynamic";\n\n${content}`;
    fs.writeFileSync(filePath, content, "utf-8");
    console.log("✔ Added to", filePath);
  } else {
    console.log("ℹ Already exists in", filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file === "route.ts") {
      processFile(fullPath);
    }
  });
}

walkDir(apiDir);
