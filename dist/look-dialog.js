var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { chromeTokens } from "./chrome.js";
import { lookTheme } from "./theme.js";
/**
 * The dialog shell: a header on the band's blue with a white close, the body,
 * and a grey footer with its buttons on the right. Shoelace's `sl-*` events
 * pass through; `sl-request-close` can be cancelled as on `sl-dialog`.
 *
 * @slot - The body.
 * @slot footer - The buttons.
 */
let LookDialog = class LookDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.size = 'medium';
    }
    static { this.styles = [
        chromeTokens,
        lookTheme,
        css `
      sl-dialog {
        --width: 560px;
      }

      :host([size='small']) sl-dialog {
        --width: 420px;
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-x-small);
      }
    `,
    ]; }
    get open() {
        return this.dialog?.open ?? false;
    }
    async show() {
        await this.updateComplete;
        return this.dialog.show();
    }
    async hide() {
        await this.updateComplete;
        return this.dialog.hide();
    }
    render() {
        return html `<sl-dialog label=${this.label}>
      <slot></slot>
      <div slot="footer" class="footer"><slot name="footer"></slot></div>
    </sl-dialog>`;
    }
};
__decorate([
    property()
], LookDialog.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], LookDialog.prototype, "size", void 0);
__decorate([
    query('sl-dialog')
], LookDialog.prototype, "dialog", void 0);
LookDialog = __decorate([
    customElement('look-dialog')
], LookDialog);
export { LookDialog };
