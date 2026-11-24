var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { StatusText } from "./status-text.js";
/**
 * A connection on the band: a dot, green when up and red when down, then its
 * name. Where the band is narrow the name is cut short with "…" and the dot
 * stays. A tap, a hover or keyboard focus shows the whole name, or `label`
 * where there is more to say.
 *
 * @slot - What is connected.
 */
let LookDot = class LookDot extends StatusText {
    constructor() {
        super(...arguments);
        this.state = 'down';
    }
    static { this.styles = [
        StatusText.baseStyles,
        css `
      :host {
        display: inline-flex;
        min-width: 0.8rem;
        font-size: 0.85rem;
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        min-width: 0;
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
        return this.inTooltip(html `<span class="dot" role="img" aria-label=${this.state}></span><span class="text"><slot></slot></span>`);
    }
};
__decorate([
    property({ reflect: true })
], LookDot.prototype, "state", void 0);
LookDot = __decorate([
    customElement('look-dot')
], LookDot);
export { LookDot };
