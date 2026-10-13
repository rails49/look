import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { place } from './place.ts';

/**
 * The band: what the UI is about on the left; its status items, the gear and
 * track power on the right, in that order.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot gear - A `look-gear`.
 * @slot power - A `look-power`.
 */
@customElement('look-band')
export class LookBand extends LitElement {
  static override styles = [
    chromeTokens,
    css`
      :host {
        display: block;
        height: 60px;
        flex-shrink: 0;
        position: relative;
        z-index: 100;
        background: var(--band);
        color: var(--band-ink);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: var(--sl-font-sans);
      }

      nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        height: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
      }

      .left {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .right {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
      }

      .tail {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'band');
  }

  override render() {
    return html`
      <nav>
        <div class="left"><slot name="about"></slot></div>
        <div class="right">
          <slot></slot>
          <div class="tail">
            <slot name="gear"></slot>
            <slot name="power"></slot>
          </div>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-band': LookBand;
  }
}
