const fs = require("fs");
const path = require("path");

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) fix(p);
  }
}

function fix(file) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("motion")) return;
  const orig = s;
  s = s.replace(/<\/motion>/g, "</div>");
  s = s.replace(/<motion className="([^"]+)">/g, '<motion className="$1">');
  s = s.replace(/<motion>/g, "<div>");
  s = s.replace(/<motion /g, "<div ");
  if (s !== orig) {
    fs.writeFileSync(file, s);
    console.log("fixed", file);
  }
}

walk(path.join(__dirname, "../src"));
console.log("done");
