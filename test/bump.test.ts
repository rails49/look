// @vitest-environment node
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { bump } from '../scripts/bump.ts';

function consumer(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), 'bump-'));
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  return dir;
}

const read = (dir: string, path: string) => readFileSync(join(dir, path), 'utf8');
const bundle = Buffer.from('new bundle');
const css = Buffer.from('new css');

describe('bump', () => {
  it('moves the git dependency, the jsDelivr url and the gate to the tag', () => {
    const dir = consumer({
      'ui/package.json': '{ "@rails49/look": "github:rails49/look#v0.1.0" }',
      'site/index.html': '<script src="https://cdn.jsdelivr.net/gh/rails49/look@v0.1.0/dist/look.bundle.js">',
      '.github/workflows/ci.yml': 'run: pnpm --package=github:rails49/look#v0.1.0 dlx look-check site',
    });
    expect(bump(dir, 'v0.2.0', bundle, css).map((p) => p.slice(dir.length + 1))).toEqual([
      '.github/workflows/ci.yml',
      'site/index.html',
      'ui/package.json',
    ]);
    expect(read(dir, 'ui/package.json')).toContain('github:rails49/look#v0.2.0');
    expect(read(dir, 'site/index.html')).toContain('rails49/look@v0.2.0/dist');
    expect(read(dir, '.github/workflows/ci.yml')).toContain('rails49/look#v0.2.0 dlx');
  });

  it('replaces a committed single-file build', () => {
    const dir = consumer({ 'page/look/look.bundle.js': 'old bundle' });
    expect(bump(dir, 'v0.2.0', bundle, css)).toHaveLength(1);
    expect(read(dir, 'page/look/look.bundle.js')).toBe('new bundle');
  });

  it('replaces a committed look.css and leaves other stylesheets alone', () => {
    const dir = consumer({
      'page/look/look.css': 'old css',
      'page/look/look.bundle.js': 'old bundle',
      'page/site.css': 'body { margin: 0 }',
      'page/notlook.css': 'old css',
    });
    expect(bump(dir, 'v0.2.0', bundle, css).map((p) => p.slice(dir.length + 1))).toEqual([
      'page/look/look.bundle.js',
      'page/look/look.css',
    ]);
    expect(read(dir, 'page/look/look.css')).toBe('new css');
    expect(read(dir, 'page/site.css')).toBe('body { margin: 0 }');
    expect(read(dir, 'page/notlook.css')).toBe('old css');
  });

  it('leaves lockfiles, node_modules and other references alone', () => {
    const dir = consumer({
      'pnpm-lock.yaml': 'specifier: github:rails49/look#v0.1.0',
      'node_modules/@rails49/look/dist/look.bundle.js': 'old bundle',
      'node_modules/@rails49/look/dist/look.css': 'old css',
      'README.md': 'see rails49/look and rails49/lookout#v1.0.0',
    });
    expect(bump(dir, 'v0.2.0', bundle, css)).toEqual([]);
  });

  it('leaves an ADR and a research note as they were written', () => {
    const pinned = 'pinned at github:rails49/look#v0.1.0';
    const dir = consumer({
      'package.json': '{ "@rails49/look": "github:rails49/look#v0.1.0" }',
      'docs/adr/0001-x.md': pinned,
      'docs/research/x.md': pinned,
      'ui/docs/adr/0002-y.md': pinned,
    });
    expect(bump(dir, 'v0.2.0', bundle, css).map((p) => p.slice(dir.length + 1))).toEqual(['package.json']);
    expect(read(dir, 'package.json')).toContain('github:rails49/look#v0.2.0');
    expect(read(dir, 'docs/adr/0001-x.md')).toBe(pinned);
    expect(read(dir, 'docs/research/x.md')).toBe(pinned);
    expect(read(dir, 'ui/docs/adr/0002-y.md')).toBe(pinned);
  });

  it('leaves a binary file byte for byte', () => {
    const dir = consumer({});
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0xff, 0xfe, 0x00, 0x80]);
    writeFileSync(join(dir, 'image.png'), png);
    expect(bump(dir, 'v0.2.0', bundle, css)).toEqual([]);
    expect(readFileSync(join(dir, 'image.png')).equals(png)).toBe(true);
  });

  it('changes nothing in a consumer already at the tag', () => {
    const dir = consumer({ 'package.json': '"github:rails49/look#v0.2.0"', 'look.bundle.js': 'new bundle', 'look/look.css': 'new css' });
    expect(bump(dir, 'v0.2.0', bundle, css)).toEqual([]);
  });
});
