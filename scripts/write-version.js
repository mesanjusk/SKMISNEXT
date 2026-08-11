// Keeps public/version.json in sync with package.json's version so the
// client-side update checker (src/legacy-client/utils/versionChecker.js)
// never sees a permanent mismatch — that would reload the page in a loop.
const fs = require("fs");
const path = require("path");

const { version } = require("../package.json");
const outPath = path.join(__dirname, "..", "public", "version.json");

fs.writeFileSync(outPath, JSON.stringify({ version }, null, 2) + "\n");
console.log(`[write-version] public/version.json -> ${version}`);
