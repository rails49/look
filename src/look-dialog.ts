import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import type SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { chromeTokens } from './chrome.ts';
import { lookTheme } from './theme.ts';

/**
 * The dialog shell: a header on the band's blue with a white close, the body,
 * and a grey footer with its buttons on the right. `open` shows it, set by the
 * app or by `show()` and `hide()`; it turns false when the person closes it.
 * Shoelace's `sl-*` events pass through; `sl-request-close` can be cancelled
 * as on `sl-dialog`.
 *
 * @slot - The body.
 * @slot footer - The buttons.
 */
@customElement('look-dialog')
export class LookDialog extends LitElement {
  @property() label = '';
  @property({ reflect: true }) size: 'small' | 'medium' = 'medium';
  @property({ type: Boolean, reflect: true }) open = false;

  @query('sl-dialog') private dialog!: SlDialog;

  static override styles = [
    chromeTokens,
    lookTheme,
    css`
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
  ];

  async show() {
    await this.updateComplete;
    return this.dialog.show();
  }

  async hide() {
    await this.updateComplete;
    return this.dialog.hide();
  }

  // Only the dialog's own sl-show and sl-hide: a slotted widget's pass through it too.
  private follow(e: Event) {
    if (e.target === e.currentTarget) this.open = e.type === 'sl-show';
  }

  override render() {
    return html`<sl-dialog label=${this.label} ?open=${this.open} @sl-show=${this.follow} @sl-hide=${this.follow}>
      <slot></slot>
      <div slot="footer" class="footer"><slot name="footer"></slot></div>
    </sl-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-dialog': LookDialog;
  }
}
