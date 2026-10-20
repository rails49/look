var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { STRIP_MEDIA } from "./tokens.js";
/**
 * A group of commands on the rail. `label` names it to a screen reader; `end`
 * pins it to the rail's far end.
 *
 * @slot - The `look-command`s.
 */
let LookGroup = class LookGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.end = false;
    }
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.45em;
        padding: 0.35em 0;
        width: calc(100% - 8px);
        background: var(--rail-group);
        border-radius: 8px;
      }

      :host([end]) {
        margin-top: auto;
      }

      @media ${unsafeCSS(STRIP_MEDIA)} {
        :host {
          flex-direction: row;
          width: auto;
          gap: 0.75em;
          padding: 0 0.5em;
        }

        :host([end]) {
          margin-top: 0;
          margin-left: auto;
        }
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'group');
    }
    updated() {
        if (this.label)
            this.setAttribute('aria-label', this.label);
        else
            this.removeAttribute('aria-label');
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property()
], LookGroup.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookGroup.prototype, "end", void 0);
LookGroup = __decorate([
    customElement('look-group')
], LookGroup);
export { LookGroup };
