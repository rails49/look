import { describe, expect, it } from 'vitest';
import { check } from '../src/check.ts';

const lines = (path: string, text: string) => check(path, text).map((v) => v.line);

describe('look-check', () => {
  it('fails a selector naming a look- element in a stylesheet', () => {
    expect(lines('a.css', 'look-band { background: red; }')).toEqual([1]);
    expect(lines('a.css', '.x,\nlook-rail > look-command:hover { color: red }')).toEqual([2, 2]);
  });

  it('fails a selector in a css template, and not one in an html template', () => {
    const ts = 'const s = css`\n  look-shell { height: 1px; }\n`;\nhtml`<look-band>${x}</look-band>`;';
    expect(lines('a.ts', ts)).toEqual([2]);
  });

  it('fails a selector in a style element', () => {
    expect(lines('a.html', '<look-band></look-band>\n<style>\nlook-band { color: red }\n</style>')).toEqual([3]);
  });

  it('passes classes, attributes, custom properties and comments that mention look-', () => {
    expect(lines('a.css', '.look-x, [data-a="look-band"], #look-y { --look-z: 1px }\n/* look-band { } */')).toEqual([]);
  });

  it('fails setting a package token or a Shoelace property', () => {
    expect(lines('a.css', ':root { --band: red; }')).toEqual([1]);
    expect(lines('a.css', ':host {\n  --sl-color-primary-600: red;\n}')).toEqual([2]);
    expect(lines('a.html', '<div style="--stop:#000"></div>')).toEqual([1]);
    expect(lines('a.ts', "el.style.setProperty('--rail-button', '10px');")).toEqual([1]);
  });

  it('passes reading tokens, and the app setting its own properties', () => {
    expect(lines('a.css', '.x { color: var(--band); --rail-width: 3px; --stopwatch: 1; }')).toEqual([]);
  });

  it('fails a ::part() rule on a Shoelace widget', () => {
    expect(lines('a.css', 'sl-button::part(base) { color: red }')).toEqual([1]);
    expect(lines('a.ts', 'css`sl-icon-button.active::part(base) {}`')).toEqual([1]);
  });

  it('passes ::part() on the app\'s own elements', () => {
    expect(lines('a.css', 'my-view::part(body) { color: red }')).toEqual([]);
  });
});
