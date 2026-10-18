var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
/**
 * A connection on the band: a dot, green when up and red when down, then its
 * name. Where the band is narrow the name is cut short with "…" and the dot
 * stays; give it a `title` to show the whole name.
 *
 * @slot - What is connected.
 */
let LookDot = class LookDot extends LitElement {
    constructor() {
        super(...arguments);
        this.state = 'down';
    }
    static { this.styles = [
        chromeTokens,
        css `
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
    ]; }
    render() {
        return html `<span class="dot" role="img" aria-label=${this.state}></span><span class="text"><slot></slot></span>`;
    }
};
__decorate([
    property({ reflect: true })
], LookDot.prototype, "state", void 0);
LookDot = __decorate([
    customElement('look-dot')
], LookDot);
export { LookDot };
