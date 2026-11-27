import { afterEach, describe, expect, it, vi } from 'vitest';
import { dividerSizeAt, keepDivider, keptDivider } from '../src/index.ts';

// A box 400 wide and 300 high, its top left corner at (100, 50).
const box = { left: 100, right: 500, top: 50, bottom: 350, width: 400, height: 300 };
const limits = { least: 80, leaves: 60 };

describe('dividerSizeAt', () => {
  it('from left is the distance from the left edge, held to least and leaves', () => {
    expect(dividerSizeAt(box, { x: 300, y: 0 }, 'left', limits)).toBe(200);
    expect(dividerSizeAt(box, { x: 120, y: 0 }, 'left', limits)).toBe(80);
    expect(dividerSizeAt(box, { x: 490, y: 0 }, 'left', limits)).toBe(340);
  });

  it('from right is the distance from the right edge, held to least and leaves', () => {
    expect(dividerSizeAt(box, { x: 350, y: 0 }, 'right', limits)).toBe(150);
    expect(dividerSizeAt(box, { x: 480, y: 0 }, 'right', limits)).toBe(80);
    expect(dividerSizeAt(box, { x: 110, y: 0 }, 'right', limits)).toBe(340);
  });

  it('from top is the distance from the top edge, held to least and leaves', () => {
    expect(dividerSizeAt(box, { x: 0, y: 150 }, 'top', limits)).toBe(100);
    expect(dividerSizeAt(box, { x: 0, y: 60 }, 'top', limits)).toBe(80);
    expect(dividerSizeAt(box, { x: 0, y: 340 }, 'top', limits)).toBe(240);
  });

  it('from bottom is the distance from the bottom edge, held to least and leaves', () => {
    expect(dividerSizeAt(box, { x: 0, y: 200 }, 'bottom', limits)).toBe(150);
    expect(dividerSizeAt(box, { x: 0, y: 330 }, 'bottom', limits)).toBe(80);
    expect(dividerSizeAt(box, { x: 0, y: 60 }, 'bottom', limits)).toBe(240);
  });

  it('in a box smaller than least and leaves together is least', () => {
    const small = { left: 0, right: 100, top: 0, bottom: 100, width: 100, height: 100 };
    expect(dividerSizeAt(small, { x: 50, y: 50 }, 'left', limits)).toBe(80);
    expect(dividerSizeAt(small, { x: 50, y: 50 }, 'bottom', limits)).toBe(80);
  });

  it('at a fraction of a pixel is a whole number', () => {
    expect(dividerSizeAt(box, { x: 300.6, y: 0 }, 'left', limits)).toBe(201);
    expect(dividerSizeAt(box, { x: 0, y: 150.4 }, 'top', limits)).toBe(100);
  });
});

describe('keptDivider and keepDivider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('keptDivider is null for a key nothing was kept under', () => {
    expect(keptDivider('test.left')).toBeNull();
  });

  it('keptDivider is the number keepDivider kept', () => {
    keepDivider('test.left', 240);
    expect(keptDivider('test.left')).toBe(240);
  });

  it('keptDivider is null where the kept value is not a number', () => {
    localStorage.setItem('test.left', 'wide');
    expect(keptDivider('test.left')).toBeNull();
  });

  it('where the browser refuses the store, keptDivider is null and keepDivider does nothing', () => {
    const refused = () => {
      throw new DOMException('refused', 'SecurityError');
    };
    keepDivider('test.left', 240);
    vi.spyOn(localStorage, 'getItem').mockImplementation(refused);
    vi.spyOn(localStorage, 'setItem').mockImplementation(refused);
    expect(() => keepDivider('test.left', 240)).not.toThrow();
    expect(keptDivider('test.left')).toBeNull();
  });
});
