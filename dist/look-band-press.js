var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens, inkButton } from "./chrome.js";
import { firePress } from "./events.js";
import { libraryOf } from "./icons.js";
/**
 * A press on the band: an icon with `label` as its tooltip, or a `word`.
 * A disabled press fires nothing.
 *
 * @fires look-press
 */
let LookBandPress = class LookBandPress extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = '';
        this.word = '';
        this.label = '';
        this.disabled = false;
    }
    static { this.styles = [
        chromeTokens,
        inkButton,
        css `
      sl-icon-button {
        font-size: 1.5rem;
      }

      button {
        font: inherit;
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        color: var(--band-ink);
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.55);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
      }

      button:hover,
      button:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        outline: none;
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }
    `,
    ]; }
    press(e) {
        if (!this.disabled)
            firePress(this, e);
    }
    render() {
        if (this.word)
            return html `<button ?disabled=${this.disabled} title=${this.label} @click=${this.press}>
        ${this.word}
      </button>`;
        return html `<sl-tooltip content=${this.label} placement="bottom">
      <sl-icon-button
        name=${this.icon}
        library=${libraryOf(this.icon)}
        label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.press}
      ></sl-icon-button>
    </sl-tooltip>`;
    }
};
__decorate([
    property()
], LookBandPress.prototype, "icon", void 0);
__decorate([
    property()
], LookBandPress.prototype, "word", void 0);
__decorate([
    property()
], LookBandPress.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookBandPress.prototype, "disabled", void 0);
LookBandPress = __decorate([
    customElement('look-band-press')
], LookBandPress);
export { LookBandPress };
