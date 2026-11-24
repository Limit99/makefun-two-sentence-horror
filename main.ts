import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Do Not Trust This Version: a two-sentence horror story, at most 400 characters.
const LINE =
  "The update finished at 3 a.m. and the house went quiet — every screen dark, every light out, except the fridge, which hummed my name. I opened the door, and the note inside said: do not trust the version that wrote this.";
const MAX_CHARS = 400;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  // Revision: exactly two sentences ("3 a.m." is an abbreviation, not a sentence break).
  const sentences = LINE.replaceAll("a.m.", "am").split(".").filter((s) => s.trim().length > 0);
  if (sentences.length !== 2) {
    throw new Error(`entry must be exactly two sentences, found ${sentences.length}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
