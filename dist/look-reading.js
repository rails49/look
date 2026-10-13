var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
/**
 * A status reading on the band, as text: "42 km/h", "3 trains".
 *
 * @slot - The reading.
 */
let LookReading = class LookReading extends LitElement {
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        white-space: nowrap;
        font-size: 0.95rem;
      }
    `,
    ]; }
    render() {
        return html `<slot></slot>`;
    }
};
LookReading = __decorate([
    customElement('look-reading')
], LookReading);
export { LookReading };
