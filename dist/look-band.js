var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from "./chrome.js";
import { MARK_SQUARE, MARK_WIDE } from "./icons.js";
import { place } from "./place.js";
import { NARROW_WIDTH_PX } from "./tokens.js";
/**
 * The band: the mark, the UI name and what the UI is about on the left, with a
 * thin rule between the UI name and what the UI is about; the UI's items, the
 * gear and Help on the right, in that order. Track power is the last of the
 * UI's items.
 * Where the band is too narrow for all of it, the status items cut their text
 * short; then the band drops the UI name with the rule, Help and the gear, in
 * that order and only as far as it must; then what the UI is about is cut
 * short. The mark, a band press and track power keep their size.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot power - A `look-power`.
 * @slot gear - A `look-gear`.
 */
let LookBand = class LookBand extends LitElement {
    constructor() {
        super(...arguments);
        /** The UI name, drawn after the mark. None on a page that is not a UI. */
        this.ui = '';
        /** The address of the UI's docs, where Help links. Without it, the UI's repository. */
        this.help = '';
        this.resize = new ResizeObserver(() => this.fit());
    }
    static { this.styles = [
        chromeTokens,
        css `
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

      /* About the height of the UI name's capitals. */
      .rule {
        flex-shrink: 0;
        width: 1px;
        height: 0.875rem;
        margin-left: 0.35rem;
        background: var(--band-ink);
        opacity: 0.5;
      }

      slot[name='about']::slotted(*) {
        margin-left: 0.35rem;
        flex-shrink: 0;
      }

      .cut slot[name='about']::slotted(*) {
        flex-shrink: 1;
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
        font-size: 1.25rem;
        font-weight: 600;
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
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'band');
        this.resize.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.resize.disconnect();
    }
    updated() {
        this.fit();
    }
    /**
     * Shows everything, then drops the UI name with the rule, Help and the gear
     * in turn until the band fits. Where it still does not fit, what the UI is
     * about is cut.
     */
    fit() {
        const nav = this.renderRoot.querySelector('nav');
        const fits = () => nav.scrollWidth <= nav.clientWidth;
        const drops = ['.ui, .rule', '.help', 'slot[name="gear"]'].map((s) => [
            ...this.renderRoot.querySelectorAll(s),
        ]);
        for (const els of drops)
            for (const el of els)
                el.hidden = false;
        nav.classList.remove('cut');
        for (const els of drops) {
            if (fits())
                return;
            for (const el of els)
                el.hidden = true;
        }
        if (!fits())
            nav.classList.add('cut');
    }
    render() {
        const help = this.help || (this.ui ? `https://github.com/rails49/${this.ui}` : 'https://github.com/rails49');
        return html `
      <nav @slotchange=${() => this.requestUpdate()}>
        <div class="lead">
          <sl-tooltip content="rails49.org" placement="bottom" hoist>
            <a class="mark" href="https://rails49.org" target="_blank" rel="noopener" aria-label="rails49.org">
              <span class="wide" aria-hidden="true">${unsafeHTML(MARK_WIDE)}</span>
              <span class="square" aria-hidden="true">${unsafeHTML(MARK_SQUARE)}</span>
            </a>
          </sl-tooltip>
          ${this.ui ? html `<span class="ui">${this.ui}</span>` : nothing}
        </div>
        ${this.ui && this.querySelector(':scope > [slot="about"]')
            ? html `<span class="rule" aria-hidden="true"></span>`
            : nothing}
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
};
__decorate([
    property()
], LookBand.prototype, "ui", void 0);
__decorate([
    property()
], LookBand.prototype, "help", void 0);
LookBand = __decorate([
    customElement('look-band')
], LookBand);
export { LookBand };
