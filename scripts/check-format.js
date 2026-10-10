import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

let failed = false;

function report(file, line, message) {
  console.error(`${file}:${line}: ${message}`);
  failed = true;
}

function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);

    if (entry.isDirectory()) {
      checkDirectory(file);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".js")) {
      continue;
    }

    const content = readFileSync(file, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (/[ \t]+$/.test(line)) {
        report(file, index + 1, "Trailing whitespace");
      }

      if (/^[ \t]*\t/.test(line)) {
        report(file, index + 1, "Use spaces for indentation");
      }
    });

    if (!content.endsWith("\n")) {
      report(file, lines.length, "Missing final newline");
    }
  }
}

for (const directory of ["src", "test", "scripts"]) {
  checkDirectory(directory);
}

process.exitCode = failed ? 1 : 0;

if (!failed) {
  console.log("Format check passed");
}
