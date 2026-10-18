import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';

/**
 * A connection on the band: a dot, green when up and red when down, then its
 * name. Where the band is narrow the name is cut short with "…" and the dot
 * stays; give it a `title` to show the whole name.
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
        min-width: 0.8rem;
        white-space: nowrap;
        font-size: 0.85rem;
      }

      .dot {
        flex-shrink: 0;
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

      :host(:empty) .text {
        display: none;
      }

      .text {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];

  override render() {
    return html`<span class="dot" role="img" aria-label=${this.state}></span><span class="text"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-dot': LookDot;
  }
}
