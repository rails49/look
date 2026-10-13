import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';

/**
 * A fault on the band, in red: "station not reachable". A long one is cut
 * short with "…"; give it a `title` to show the whole sentence.
 *
 * @slot - The fault.
 */
@customElement('look-chip')
export class LookChip extends LitElement {
  static override styles = [
    chromeTokens,
    css`
      :host {
        display: inline-block;
        max-width: 20rem;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        white-space: nowrap;
        background: var(--stop);
        color: var(--band-ink);
        padding: 0.1rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
      }
    `,
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-chip': LookChip;
  }
}
