// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BAND_HEIGHT_PX } from '../src/tokens.ts';

const css = readFileSync(new URL('../dist/look.css', import.meta.url), 'utf8');

describe('look.css', () => {
  it('holds the band its space and colour before look-band is defined', () => {
    const rule = css.match(/look-band:not\(:defined\)\s*\{([^}]*)\}/)?.[1] ?? '';
    expect(rule).toMatch(/display:\s*block;/);
    expect(rule).toMatch(new RegExp(`height:\\s*${BAND_HEIGHT_PX}px;`));
    expect(rule).toMatch(/background:\s*var\(--band\);/);
  });

  it('fetches nothing else', () => {
    expect(css).not.toMatch(/url\(|@import/);
  });
});
