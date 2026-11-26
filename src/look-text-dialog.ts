import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './look-dialog.ts';
import type { LookDialog } from './look-dialog.ts';
import { lookTheme } from './theme.ts';

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
@customElement('look-text-dialog')
export class LookTextDialog extends LitElement {
  @property() label = '';
  @property() text = '';
  @property() error = '';
  @property({ type: Boolean, reflect: true }) open = false;

  @query('look-dialog') private dialog!: LookDialog;

  static override styles = [
    lookTheme,
    css`
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
        user-select: text;
      }

      .error {
        margin: 0;
        color: var(--sl-color-danger-700);
      }
    `,
  ];

  async show() {
    await this.updateComplete;
    return this.dialog.show();
  }

  async hide() {
    await this.updateComplete;
    return this.dialog.hide();
  }

  private follow(e: Event) {
    this.open = e.type === 'sl-show';
  }

  override render() {
    return html`<look-dialog
      size="large"
      label=${this.label}
      ?open=${this.open}
      @sl-show=${this.follow}
      @sl-hide=${this.follow}
    >
      ${this.error ? html`<p class="error">${this.error}</p>` : html`<pre>${this.text}</pre>`}
      <sl-button slot="footer" @click=${() => this.hide()}>Close</sl-button>
    </look-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-text-dialog': LookTextDialog;
  }
}
