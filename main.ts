import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RANT =
  "The man ahead of me in the queue waited until the cashier said the total before even looking for his wallet. He then patted every pocket like a magician who had lost his own rabbit, while the rest of us aged quietly behind him.";

function validate(text: string): void {
  const withNewline = text + "\n";
  if (text.length < 1 || withNewline.length > 400) {
    throw new Error(`entry must be 1-400 characters including trailing newline, got ${withNewline.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const sentences = text.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length < 1 || sentences.length > 3) {
    throw new Error(`entry must be a few sentences at most, got ${sentences.length}`);
  }
}

function main(): void {
  validate(RANT);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), RANT + "\n", "utf8");
}

main();
