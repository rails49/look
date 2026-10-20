var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { chromeTokens } from "./chrome.js";
import { fire } from "./events.js";
import { libraryOf } from "./icons.js";
import { place } from "./place.js";
import { STRIP_MEDIA } from "./tokens.js";
/**
 * One view on the rail: its icon with its word under it. Choosing a view that
 * is not current fires `look-view`; the app shows it and moves `current`.
 *
 * @fires look-view - Detail: the view's `name`.
 */
let LookView = class LookView extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.icon = '';
        this.label = '';
        this.current = false;
    }
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: block;
        width: 100%;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.1em;
        width: 100%;
        min-height: var(--rail-button);
        padding: 0.25em 0;
        box-sizing: border-box;
        font: inherit;
        font-size: 0.7rem;
        color: white;
        background: none;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      sl-icon {
        font-size: 1.75rem;
        transition: transform 0.1s;
      }

      button:hover,
      button:focus-visible {
        color: rgba(255, 255, 255, 0.7);
        outline: none;
      }

      button:hover sl-icon {
        transform: scale(1.1);
      }

      :host([current]) button {
        background: rgba(255, 255, 255, 0.22);
        color: white;
        cursor: default;
      }

      :host([current]) button:hover sl-icon {
        transform: none;
      }

      @media ${unsafeCSS(STRIP_MEDIA)} {
        :host {
          width: auto;
        }

        button {
          min-width: var(--rail-button);
          padding: 0.2em 0.5em;
        }
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'views');
    }
    choose() {
        if (!this.current)
            fire(this, 'look-view', { name: this.name });
    }
    render() {
        return html `<button aria-current=${this.current ? 'page' : nothing} @click=${this.choose}>
      <sl-icon name=${this.icon} library=${libraryOf(this.icon)}></sl-icon>${this.label}
    </button>`;
    }
};
__decorate([
    property()
], LookView.prototype, "name", void 0);
__decorate([
    property()
], LookView.prototype, "icon", void 0);
__decorate([
    property()
], LookView.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookView.prototype, "current", void 0);
LookView = __decorate([
    customElement('look-view')
], LookView);
export { LookView };
