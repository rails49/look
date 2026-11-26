/// <reference types="@vitest/browser/providers/playwright" />
import { cdp } from '@vitest/browser/context';
import { LitElement, html } from 'lit';
import { afterEach, describe, expect, it } from 'vitest';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '../dist/look.css';
import '../src/index.ts';

// A band item that opens a dialog from its own shadow root, as control's fast clock does.
class BandItem extends LitElement {
  override render() {
    return html`<look-dialog label="Fast clock" open>
      <sl-input label="Day"></sl-input>
      <p>Plain text</p>
    </look-dialog>`;
  }
}
customElements.define('band-item', BandItem);

const part = (root: ShadowRoot, name: string) => root.querySelector(`[part~="${name}"]`) as HTMLElement;

function luminance(color: string) {
  const [r, g, b] = color.match(/[\d.]+/g)!.slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

afterEach(async () => {
  document.body.innerHTML = '';
  await cdp().send('Emulation.setEmulatedMedia', { features: [] });
});

describe('a dialog opened from a band item', () => {
  it.each(['light', 'dark'])('shows its body text on the panel in %s', async (scheme) => {
    await cdp().send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
    document.body.innerHTML = '<look-band><band-item></band-item></look-band>';
    const item = document.querySelector('band-item') as BandItem;
    await item.updateComplete;
    const dialog = item.shadowRoot!.querySelector('look-dialog')!;
    await dialog.updateComplete;
    const slDialog = dialog.shadowRoot!.querySelector('sl-dialog')!;
    const input = item.shadowRoot!.querySelector('sl-input')!;
    await Promise.all([slDialog.updateComplete, input.updateComplete]);

    const panel = getComputedStyle(part(slDialog.shadowRoot!, 'panel')).backgroundColor;
    const label = getComputedStyle(part(input.shadowRoot!, 'form-control-label')).color;
    const text = getComputedStyle(item.shadowRoot!.querySelector('p')!).color;
    expect(matchMedia(`(prefers-color-scheme: ${scheme})`).matches).toBe(true);
    expect(contrast(label, panel), `label ${label} on ${panel}`).toBeGreaterThanOrEqual(4.5);
    expect(contrast(text, panel), `text ${text} on ${panel}`).toBeGreaterThanOrEqual(4.5);
  });
});
