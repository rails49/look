var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { firePress } from "./events.js";
import { place } from "./place.js";
import { press, pressStyles } from "./press.js";
/**
 * Settings, on the band. The app opens its own settings dialog.
 *
 * @fires look-press
 */
let LookGear = class LookGear extends LitElement {
    static { this.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }; }
    /** Presses the button, as a person would. */
    click() {
        this.renderRoot.querySelector('button').click();
    }
    static { this.styles = [
        chromeTokens,
        pressStyles,
        css `
      .icon {
        font-size: 1.5rem;
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'gear');
    }
    render() {
        return press({
            icon: 'gear',
            label: 'Settings',
            placement: 'bottom',
            onPress: (e) => firePress(this, e),
        });
    }
};
LookGear = __decorate([
    customElement('look-gear')
], LookGear);
export { LookGear };
