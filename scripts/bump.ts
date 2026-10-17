// Moves a consumer's checkout to a release of look: every `rails49/look#v…` and
// `rails49/look@v…` names the tag, and every committed look.bundle.js is
// replaced by this release's. Prints the files it changed; none means the
// consumer does not take look yet, or is already at the tag. An accepted ADR
// and a research note are records of their day (org ADR-0017), so no file
// under a docs/adr/ or docs/research/ is touched.
// Usage: node scripts/bump.ts <consumer-dir> <tag>
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const SKIP = new Set(['.git', 'node_modules', 'pnpm-lock.yaml']);
const RECORDS = new Set(['adr', 'research']);
const REFERENCE = /rails49\/look([#@])v\d+\.\d+\.\d+/g;

function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir).sort()) {
    if (SKIP.has(name)) continue;
    if (RECORDS.has(name) && basename(dir) === 'docs') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else yield path;
  }
}

export function bump(dir: string, tag: string, bundle: Buffer): string[] {
  const changed: string[] = [];
  for (const path of files(dir)) {
    const before = readFileSync(path);
    let after: Buffer = before;
    if (path.endsWith('/look.bundle.js')) after = bundle;
    else {
      // Only text that names a release is rewritten; other files, binaries
      // among them, are left byte for byte.
      const text = before.toString('utf8');
      const moved = text.replace(REFERENCE, `rails49/look$1${tag}`);
      if (moved !== text) after = Buffer.from(moved, 'utf8');
    }
    if (!after.equals(before)) {
      writeFileSync(path, after);
      changed.push(path);
    }
  }
  return changed;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [dir, tag] = process.argv.slice(2);
  if (!dir || !tag) {
    console.error('usage: node scripts/bump.ts <consumer-dir> <tag>');
    process.exit(2);
  }
  const bundle = readFileSync(new URL('../dist/look.bundle.js', import.meta.url));
  for (const path of bump(dir, tag, bundle)) console.log(path);
}
