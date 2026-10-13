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
 * A fault on the band, in red: "station not reachable". A long one is cut
 * short with "…"; give it a `title` to show the whole sentence.
 *
 * @slot - The fault.
 */
let LookChip = class LookChip extends LitElement {
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: inline-block;
        max-width: 20rem;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        white-space: nowrap;
        background: var(--stop);
        color: var(--band-ink);
        padding: 0.1rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
      }
    `,
    ]; }
    render() {
        return html `<slot></slot>`;
    }
};
LookChip = __decorate([
    customElement('look-chip')
], LookChip);
export { LookChip };
