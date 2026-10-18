var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { chromeTokens } from "./chrome.js";
import { firePress } from "./events.js";
import { place } from "./place.js";
/**
 * What the UI is about, on the band's left: a name and a quieter detail.
 * When `pressable`, it is a button and fires `look-press`; the app opens its
 * own picker.
 *
 * @fires look-press
 */
let LookAbout = class LookAbout extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.detail = '';
        this.pressable = false;
    }
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: block;
        min-width: 0;
      }

      .about {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        font: inherit;
        font-size: 1.25rem;
        font-weight: 600;
        color: inherit;
        background: none;
        border: none;
        border-radius: 4px;
        padding: 0.2rem 0.4rem;
        margin-left: -0.4rem;
      }

      button.about {
        cursor: pointer;
      }

      button.about:hover,
      button.about:focus-visible {
        background: rgba(255, 255, 255, 0.15);
        outline: none;
      }

      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      small {
        font-weight: 400;
        opacity: 0.75;
        font-size: 0.8em;
        margin-left: 0.5rem;
      }

      sl-icon {
        flex-shrink: 0;
        font-size: 0.8em;
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'about');
    }
    render() {
        const text = html `<span class="text"
      >${this.name}${this.detail ? html `<small>${this.detail}</small>` : nothing}</span
    >`;
        if (!this.pressable)
            return html `<div class="about">${text}</div>`;
        return html `<button class="about" @click=${(e) => firePress(this, e)}>
      ${text}<sl-icon name="chevron-down"></sl-icon>
    </button>`;
    }
};
__decorate([
    property()
], LookAbout.prototype, "name", void 0);
__decorate([
    property()
], LookAbout.prototype, "detail", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookAbout.prototype, "pressable", void 0);
LookAbout = __decorate([
    customElement('look-about')
], LookAbout);
export { LookAbout };
