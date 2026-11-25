// roast-your-fridge — a one-line roast of my fridge, written to entry.txt.
//
// The gate requires a single line of 1–200 characters, not only whitespace.
// This program holds the line, checks it against exactly those rules, and
// writes it out so the judge can read one roast and nothing else. The roast
// itself stacks three concrete fridge flaws — the hum, the drip, the warm
// milk — and pays them off with a single twist at the end.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "My fridge hums like a lawnmower, drips like a leaky gossip, and after twenty years on the job it still can't keep the milk cold — one job, and it quit.";

const MAX_CHARS = 200;

function validateLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry line must be 1–${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
}

function main(): void {
  validateLine(ENTRY_LINE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_LINE, "utf8");

  console.log(`wrote ${outPath} (${ENTRY_LINE.length} characters)`);
}

main();
