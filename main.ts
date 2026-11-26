// The Worst Pizza Topping — make.fun entry (program/v1).
// Writes one funny line pitching a terrible pizza topping to entry.txt.
// The line was picked by a head-to-head ammo-model ranking of 10 candidates.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Behold the Homework Pizza: soggy maths worksheets soaked in ketchup, extra credit not included, detention guaranteed.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

  // Gate: the sealed scorer accepts 1-200 characters of non-whitespace
  // UTF-8 text on a single line; keep the line inside that window.
  if (LINE.length < 1 || LINE.length > 199) {
    throw new Error(`entry line must be 1-199 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry line must not be blank");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry line must be a single line");
  }

  // Never remove the output folder itself; only create it if missing.
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");

  // Read back what was written and re-check it, so a bad write fails loudly.
  const written = readFileSync(target, "utf8");
  if (written !== LINE) {
    throw new Error("entry.txt does not match the gated line");
  }
}

main();
