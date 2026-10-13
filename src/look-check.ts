#!/usr/bin/env node
// Fails when app code styles the chrome. Usage: look-check <path>...
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { check } from './check.ts';

const EXTENSIONS = new Set(['.css', '.ts', '.js', '.html']);
const SKIP = new Set(['node_modules', 'dist']);

function* files(path: string): Generator<string> {
  if (statSync(path).isFile()) {
    yield path;
    return;
  }
  for (const name of readdirSync(path).sort()) {
    if (SKIP.has(name)) continue;
    const child = join(path, name);
    if (statSync(child).isDirectory()) yield* files(child);
    else if (EXTENSIONS.has(extname(name))) yield child;
  }
}

const paths = process.argv.slice(2);
if (!paths.length) {
  console.error('usage: look-check <path>...');
  process.exit(2);
}

let count = 0;
for (const path of paths)
  for (const file of files(path))
    for (const v of check(file, readFileSync(file, 'utf8'))) {
      console.log(`${file}:${v.line}: ${v.message}`);
      count++;
    }
process.exit(count ? 1 : 0);
