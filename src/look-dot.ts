import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';

/**
 * A connection on the band: a dot, green when up and red when down, then its
 * name.
 *
 * @slot - What is connected.
 */
@customElement('look-dot')
export class LookDot extends LitElement {
  @property({ reflect: true }) state: 'up' | 'down' = 'down';

  static override styles = [
    chromeTokens,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        white-space: nowrap;
        font-size: 0.85rem;
      }

      .dot {
        width: 0.8rem;
        height: 0.8rem;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid var(--band-ink);
        background: var(--stop);
      }

      :host([state='up']) .dot {
        background: var(--power-on);
      }
    `,
  ];

  override render() {
    return html`<span class="dot" role="img" aria-label=${this.state}></span><slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-dot': LookDot;
  }
}
