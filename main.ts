// Entry for make.fun bounty post-x-promote-make-your-own-bounty-01.
// The program copies POST.json from the repository root into the output
// directory, where the grader reads it. That is all it does: the entry
// itself is the X post named in POST.json, a quote of make.fun's
// make-your-own-bounty post (https://x.com/makefunai/status/2124915864336236646)
// with a photo of its own attached. Nothing this program writes about the
// post is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22+, standard library only. No network, no wall clock, no files
// outside the repository, no environment secrets.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Validate POST.json before copying: it must be valid JSON whose `url`
// names the X post this entry promotes. A bad file fails fast with a
// clear error instead of silently shipping an unusable entry.
const postPath = join(BOT_DIR, 'POST.json');
let post: unknown;
try {
  post = JSON.parse(readFileSync(postPath, 'utf8'));
} catch (err) {
  console.error(`POST.json in ${BOT_DIR} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
const url = (post as { url?: unknown } | null)?.url;
if (
  typeof url !== 'string' ||
  (!url.startsWith('https://x.com/') && !url.startsWith('https://twitter.com/'))
) {
  console.error(
    `POST.json in ${BOT_DIR} has no valid X status URL: expected "url" to start with https://x.com/ or https://twitter.com/, got ${JSON.stringify(url)}`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
