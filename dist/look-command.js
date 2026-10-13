var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from "./chrome.js";
import { firePress } from "./events.js";
import { libraryOf } from "./icons.js";
import { tip } from "./keys.js";
import { TURN_HEIGHT_PX } from "./tokens.js";
/**
 * A command on the rail: an icon with its label and key as the tooltip, or a
 * `word`. `pressed` marks the command that is in force, such as the editor's
 * current tool. A disabled command fires nothing. Binding the key is the
 * app's.
 *
 * @fires look-press
 */
let LookCommand = class LookCommand extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = '';
        this.word = '';
        this.label = '';
        this.key = '';
        this.pressed = false;
        this.disabled = false;
    }
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      sl-icon-button {
        font-size: 2.1em;
        transition: transform 0.1s;
      }

      sl-icon-button::part(base) {
        color: white;
        justify-content: center;
        min-width: var(--rail-button);
        min-height: var(--rail-button);
      }

      sl-icon-button::part(base):hover,
      sl-icon-button::part(base):focus-visible {
        color: rgba(255, 255, 255, 0.7);
      }

      sl-icon-button:not([disabled]):hover {
        transform: scale(1.1);
      }

      sl-icon-button[disabled] {
        opacity: 0.35;
      }

      :host([pressed]) sl-icon-button::part(base) {
        background: rgba(255, 255, 255, 0.22);
        border-radius: 8px;
      }

      button {
        width: calc(100% - 8px);
        min-height: var(--rail-button);
        font: inherit;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: white;
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        cursor: pointer;
      }

      button:hover,
      button:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        outline: none;
      }

      :host([pressed]) button {
        background: rgba(255, 255, 255, 0.22);
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }

      @media (max-height: ${unsafeCSS(TURN_HEIGHT_PX)}px) {
        :host {
          width: auto;
        }

        sl-icon-button {
          font-size: 1.6em;
        }

        button {
          width: auto;
          padding: 0 0.8rem;
        }
      }
    `,
    ]; }
    press(e) {
        if (!this.disabled)
            firePress(this, e);
    }
    render() {
        const content = tip(this.label, this.key);
        if (this.word)
            return html `<button
        ?disabled=${this.disabled}
        title=${content}
        aria-pressed=${this.pressed ? 'true' : nothing}
        @click=${this.press}
      >
        ${this.word}
      </button>`;
        return html `<sl-tooltip content=${content} placement="right">
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
], LookCommand.prototype, "icon", void 0);
__decorate([
    property()
], LookCommand.prototype, "word", void 0);
__decorate([
    property()
], LookCommand.prototype, "label", void 0);
__decorate([
    property()
], LookCommand.prototype, "key", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookCommand.prototype, "pressed", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookCommand.prototype, "disabled", void 0);
LookCommand = __decorate([
    customElement('look-command')
], LookCommand);
export { LookCommand };
