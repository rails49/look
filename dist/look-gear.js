var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens, inkButton } from "./chrome.js";
import { firePress } from "./events.js";
import { place } from "./place.js";
/**
 * Settings, on the band. The app opens its own settings dialog.
 *
 * @fires look-press
 */
let LookGear = class LookGear extends LitElement {
    static { this.styles = [
        chromeTokens,
        inkButton,
        css `
      sl-icon-button {
        font-size: 1.5rem;
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'gear');
    }
    render() {
        return html `<sl-tooltip content="Settings" placement="bottom">
      <sl-icon-button
        name="gear"
        label="Settings"
        @click=${(e) => firePress(this, e)}
      ></sl-icon-button>
    </sl-tooltip>`;
    }
};
LookGear = __decorate([
    customElement('look-gear')
], LookGear);
export { LookGear };
