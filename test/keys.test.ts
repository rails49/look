import { describe, expect, it } from 'vitest';
import { keyLabel } from '../src/keys.ts';

describe('keyLabel', () => {
  it('reads Mod as Command on Apple and Ctrl elsewhere', () => {
    expect(keyLabel('Mod+Z', true)).toBe('⌘Z');
    expect(keyLabel('Mod+Z', false)).toBe('Ctrl+Z');
  });

  it('orders modifiers the platform way', () => {
    expect(keyLabel('Shift+Mod+Z', true)).toBe('⇧⌘Z');
    expect(keyLabel('Mod+Shift+Z', false)).toBe('Ctrl+Shift+Z');
  });

  it('leaves single keys alone', () => {
    expect(keyLabel('N', false)).toBe('N');
    expect(keyLabel('+', true)).toBe('+');
    expect(keyLabel('Mod++', false)).toBe('Ctrl++');
  });
});
