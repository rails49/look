import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import type SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { chromeTokens } from './chrome.ts';
import { lookTheme } from './theme.ts';

/**
 * The dialog shell: a header on the band's blue with a white close, the body,
 * and a grey footer with its buttons on the right. Shoelace's `sl-*` events
 * pass through; `sl-request-close` can be cancelled as on `sl-dialog`.
 *
 * @slot - The body.
 * @slot footer - The buttons.
 */
@customElement('look-dialog')
export class LookDialog extends LitElement {
  @property() label = '';
  @property({ reflect: true }) size: 'small' | 'medium' = 'medium';

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

  override render() {
    return html`<sl-dialog label=${this.label}>
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
