var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from "./chrome.js";
import { pressStyles } from "./press.js";
/**
 * Status text on the band: a button inside a tooltip. A tap, a hover or
 * keyboard focus shows the whole text, which the band may have cut short.
 * It is not a press and fires nothing. With no text and no `label` there is
 * no tooltip.
 */
export class StatusText extends LitElement {
    constructor() {
        super(...arguments);
        /** Shown in the tooltip in place of the element's own text. */
        this.label = '';
        this.text = '';
        this.textChanges = new MutationObserver(() => this.read());
    }
    /** Put first in the element's styles; its own rules follow and win. */
    static { this.baseStyles = [
        chromeTokens,
        pressStyles,
        css `
      button {
        max-width: 100%;
        box-sizing: border-box;
        padding: 0;
        white-space: nowrap;
        cursor: default;
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        this.read();
        this.textChanges.observe(this, { childList: true, characterData: true, subtree: true });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.textChanges.disconnect();
    }
    read() {
        this.text = this.textContent.trim();
    }
    /** The button inside its tooltip, around `content`, which holds the slot. */
    inTooltip(content) {
        const tip = this.label || this.text;
        return html `<sl-tooltip content=${tip} ?disabled=${!tip} placement="bottom" hoist>
      <button>${content}</button>
    </sl-tooltip>`;
    }
}
__decorate([
    property()
], StatusText.prototype, "label", void 0);
__decorate([
    state()
], StatusText.prototype, "text", void 0);
