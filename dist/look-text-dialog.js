var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./look-dialog.js";
import { lookTheme } from "./theme.js";
/**
 * A `look-dialog` of `size="large"` that shows a long text (#60): a stored
 * file, a log. `text` is shown as is in a monospace block that keeps line
 * breaks and spaces, scrolls inside the dialog and can be selected. `error`
 * is a line shown in place of the text; while it is set no text is shown.
 * The caller sets `text` or `error`; the element reads nothing.
 *
 * `open`, `show()` and `hide()` are as on `look-dialog`. Close, Escape and
 * the header's close hide it, and `sl-*` events pass through.
 */
let LookTextDialog = class LookTextDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.text = '';
        this.error = '';
        this.open = false;
    }
    static { this.styles = [
        lookTheme,
        css `
      pre {
        margin: 0;
        max-height: 60vh;
        overflow: auto;
        padding: var(--sl-spacing-small);
        border: 1px solid var(--sl-color-neutral-200);
        border-radius: var(--sl-border-radius-medium);
        font-family: var(--sl-font-mono);
        font-size: var(--sl-font-size-small);
        white-space: pre;
      }

      .error {
        margin: 0;
        color: var(--sl-color-danger-700);
      }
    `,
    ]; }
    async show() {
        await this.updateComplete;
        return this.dialog.show();
    }
    async hide() {
        await this.updateComplete;
        return this.dialog.hide();
    }
    follow(e) {
        this.open = e.type === 'sl-show';
    }
    render() {
        return html `<look-dialog
      size="large"
      label=${this.label}
      ?open=${this.open}
      @sl-show=${this.follow}
      @sl-hide=${this.follow}
    >
      ${this.error ? html `<p class="error">${this.error}</p>` : html `<pre>${this.text}</pre>`}
      <sl-button slot="footer" @click=${() => this.hide()}>Close</sl-button>
    </look-dialog>`;
    }
};
__decorate([
    property()
], LookTextDialog.prototype, "label", void 0);
__decorate([
    property()
], LookTextDialog.prototype, "text", void 0);
__decorate([
    property()
], LookTextDialog.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LookTextDialog.prototype, "open", void 0);
__decorate([
    query('look-dialog')
], LookTextDialog.prototype, "dialog", void 0);
LookTextDialog = __decorate([
    customElement('look-text-dialog')
], LookTextDialog);
export { LookTextDialog };
