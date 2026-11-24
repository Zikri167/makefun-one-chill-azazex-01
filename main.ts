// One Line, One Chill — make.fun entry (v3, final).
// v3: made the setting concrete ("the hallway outside my bedroom") for
// vividness, and sharpened the close ("as if it had all night") so the last
// words land as the dread that outlasts the line.
// Writes exactly one horror sentence to (MAKEFUN_OUTPUT_DIR || "/output")/entry.txt
// with no trailing newline. Node 22 stdlib only, deterministic, no network.
const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  "I woke to my own voice whispering my name from the hallway outside my bedroom, and the worst part was how patient it sounded, as if it had all night.";

function sentenceCount(line) {
  const marks = line.match(/[.!?]/g);
  return marks ? marks.length : 0;
}

function main() {
  // Gate validation: UTF-8 text, 1-200 chars, not only whitespace,
  // exactly one line, exactly one sentence.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error("entry must be 1-200 characters, got " + ENTRY.length);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading/trailing space");
  }
  if (!/[.!?]$/.test(ENTRY)) {
    throw new Error("entry must end with sentence punctuation");
  }
  if (sentenceCount(ENTRY) !== 1) {
    throw new Error("entry must be exactly one sentence");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
