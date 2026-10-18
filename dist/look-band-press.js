var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { firePress } from "./events.js";
import { press, pressStyles } from "./press.js";
/**
 * A press on the band: an icon with `label` as its tooltip, or a `word`.
 * A disabled press fires nothing.
 *
 * @fires look-press
 */
let LookBandPress = class LookBandPress extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = '';
        this.word = '';
        this.label = '';
        this.disabled = false;
    }
    static { this.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }; }
    /** Presses the button, as a person would. */
    click() {
        this.renderRoot.querySelector('button').click();
    }
    static { this.styles = [
        chromeTokens,
        pressStyles,
        css `
      :host {
        flex-shrink: 0;
      }

      .icon {
        font-size: 1.5rem;
      }

      .word {
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        border-color: rgba(255, 255, 255, 0.55);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
      }
    `,
    ]; }
    render() {
        return press({
            icon: this.icon,
            word: this.word,
            label: this.label,
            disabled: this.disabled,
            placement: 'bottom',
            onPress: (e) => firePress(this, e),
        });
    }
};
__decorate([
    property()
], LookBandPress.prototype, "icon", void 0);
__decorate([
    property()
], LookBandPress.prototype, "word", void 0);
__decorate([
    property()
], LookBandPress.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookBandPress.prototype, "disabled", void 0);
LookBandPress = __decorate([
    customElement('look-band-press')
], LookBandPress);
export { LookBandPress };
