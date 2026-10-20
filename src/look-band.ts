import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from './chrome.ts';
import { MARK_SQUARE, MARK_WIDE } from './icons.ts';
import { place } from './place.ts';
import { NARROW_WIDTH_PX } from './tokens.ts';

/**
 * The band: the mark, the UI name and what the UI is about on the left; the
 * UI's items, the gear and Help on the right, in that order. Track power is
 * the last of the UI's items.
 * Where the band is too narrow for all of it, the status items and what the
 * UI is about cut their text short; then the band drops the UI name, Help and
 * the gear, in that order and only as far as it must. The mark, a band press
 * and track power keep their size.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot power - A `look-power`.
 * @slot gear - A `look-gear`.
 */
@customElement('look-band')
export class LookBand extends LitElement {
  /** The UI name, drawn after the mark. None on a page that is not a UI. */
  @property() ui = '';

  /** The address of the UI's docs, where Help links. Without it, the UI's repository. */
  @property() help = '';

  private readonly resize = new ResizeObserver(() => this.fit());

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
        gap: 0.75rem;
        height: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
      }

      slot[name='about']::slotted(*) {
        margin-left: 0.75rem;
      }

      /* Pushes the status items to the far right; with the gaps either side, at least 1rem. */
      .space {
        flex: 1 0 0;
        margin-left: -0.5rem;
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

      .tail {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
      }

      .help a {
        display: flex;
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 1.5rem;
        color: inherit;
        transition: transform 0.1s;
      }

      .help a:hover,
      .help a:focus-visible {
        color: rgba(255, 255, 255, 0.7);
      }

      .help a:hover {
        transform: scale(1.1);
      }

      .help a:focus-visible {
        outline: var(--sl-focus-ring-width, 2px) solid rgba(255, 255, 255, 0.7);
        outline-offset: 1px;
      }

      [hidden] {
        display: none;
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'band');
    this.resize.observe(this);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resize.disconnect();
  }

  override updated() {
    this.fit();
  }

  /** Shows everything, then drops the UI name, Help and the gear in turn until the band fits. */
  private fit() {
    const nav = this.renderRoot.querySelector('nav')!;
    const drops = ['.ui', '.help', 'slot[name="gear"]'].map((s) => this.renderRoot.querySelector<HTMLElement>(s));
    for (const el of drops) if (el) el.hidden = false;
    for (const el of drops) {
      if (nav.scrollWidth <= nav.clientWidth) break;
      if (el) el.hidden = true;
    }
  }

  override render() {
    const help = this.help || (this.ui ? `https://github.com/rails49/${this.ui}` : 'https://github.com/rails49');
    return html`
      <nav @slotchange=${() => this.fit()}>
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
        <span class="space"></span>
        <slot></slot>
        <div class="tail">
          <slot name="power"></slot>
          <slot name="gear"></slot>
          <sl-tooltip class="help" content="Help" placement="bottom" hoist>
            <a href=${help} target="_blank" rel="noopener" aria-label="Help">
              <sl-icon name="question-circle"></sl-icon>
            </a>
          </sl-tooltip>
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
