var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { firePress } from "./events.js";
import { press, pressStyles } from "./press.js";
import { STRIP_MEDIA } from "./tokens.js";
/**
 * A command on the rail: an icon with its label and key as the tooltip, or a
 * `word`. `pressed` marks the command that is in force, such as the editor's
 * current tool. A disabled command fires nothing; its `reason`, if set, is its
 * tooltip. Binding the key is the app's.
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
        this.reason = '';
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
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .icon {
        font-size: 2.1em;
        min-width: var(--rail-button);
        min-height: var(--rail-button);
      }

      .word {
        width: calc(100% - 8px);
        min-height: var(--rail-button);
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
      }

      @media ${unsafeCSS(STRIP_MEDIA)} {
        :host {
          width: auto;
        }

        .icon {
          font-size: 1.6em;
        }

        .word {
          width: auto;
          padding: 0 0.8rem;
        }
      }
    `,
    ]; }
    render() {
        return press({
            icon: this.icon,
            word: this.word,
            label: this.label,
            key: this.key,
            disabled: this.disabled,
            reason: this.reason,
            pressed: this.pressed,
            placement: 'right',
            onPress: (e) => firePress(this, e),
        });
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
__decorate([
    property()
], LookCommand.prototype, "reason", void 0);
LookCommand = __decorate([
    customElement('look-command')
], LookCommand);
export { LookCommand };
