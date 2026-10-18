import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from './chrome.ts';
import { MARK_SQUARE, MARK_WIDE } from './icons.ts';
import { place } from './place.ts';
import { NARROW_WIDTH_PX } from './tokens.ts';

/**
 * The band: the mark, the UI name and what the UI is about on the left; its
 * status items, the gear and track power on the right, in that order.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot gear - A `look-gear`.
 * @slot power - A `look-power`.
 */
@customElement('look-band')
export class LookBand extends LitElement {
  /** The UI name, drawn after the mark. None on a page that is not a UI. */
  @property() ui = '';

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
        gap: 1.5rem;
        min-width: 0;
      }

      .lead {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        flex-shrink: 0;
      }

      .mark {
        display: flex;
        color: inherit;
        border-radius: 4px;
        padding: 0.2rem 0.3rem;
        margin-left: -0.3rem;
      }

      .mark:hover,
      .mark:focus-visible {
        background: rgba(255, 255, 255, 0.15);
        outline: none;
      }

      .mark svg {
        display: block;
        height: 32px;
        width: auto;
      }

      .square {
        display: none;
      }

      @media (max-width: ${unsafeCSS(NARROW_WIDTH_PX)}px) {
        .wide {
          display: none;
        }

        .square {
          display: block;
        }
      }

      .ui {
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 0.04em;
        white-space: nowrap;
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
        <div class="left">
          <div class="lead">
            <sl-tooltip content="rails49.org" placement="bottom" hoist>
              <a class="mark" href="https://rails49.org" target="_blank" rel="noopener" aria-label="rails49.org">
                <span class="wide" aria-hidden="true">${unsafeHTML(MARK_WIDE)}</span>
                <span class="square" aria-hidden="true">${unsafeHTML(MARK_SQUARE)}</span>
              </a>
            </sl-tooltip>
            ${this.ui ? html`<span class="ui">${this.ui}</span>` : nothing}
          </div>
          <slot name="about"></slot>
        </div>
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
