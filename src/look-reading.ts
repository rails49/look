import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';

/**
 * A status reading on the band, as text: "42 km/h", "3 trains". Where the
 * band is narrow it is cut short with "…"; give it a `title` to show the whole
 * reading.
 *
 * @slot - The reading.
 */
@customElement('look-reading')
export class LookReading extends LitElement {
  static override styles = [
    chromeTokens,
    css`
      :host {
        display: inline-block;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        white-space: nowrap;
        font-size: 0.95rem;
      }
    `,
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-reading': LookReading;
  }
}
