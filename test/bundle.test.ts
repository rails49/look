import { describe, expect, it } from 'vitest';

describe('the single-file build', () => {
  it('defines sl-switch, for a setting on a static page (#50)', async () => {
    await import('../bundle/look.bundle.ts');
    expect(customElements.get('sl-switch')).toBeDefined();
  });
});
