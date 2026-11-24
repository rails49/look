var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatusText } from "./status-text.js";
/**
 * A fault on the band, in red: "station not reachable". A long one, or one
 * on a narrow band, is cut short with "…". A tap, a hover or keyboard focus
 * shows the whole sentence, or `label` where there is more to say.
 *
 * @slot - The fault.
 */
let LookChip = class LookChip extends StatusText {
    static { this.styles = [
        StatusText.baseStyles,
        css `
      :host {
        display: inline-block;
        /* The padding, then up to 20rem of text. */
        min-width: 1rem;
        max-width: 21rem;
        vertical-align: middle;
        font-size: 0.85rem;
      }

      button {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        background: var(--stop);
        padding: 0.1rem 0.5rem;
        border-radius: 4px;
      }
    `,
    ]; }
    render() {
        return this.inTooltip(html `<slot></slot>`);
    }
};
LookChip = __decorate([
    customElement('look-chip')
], LookChip);
export { LookChip };
