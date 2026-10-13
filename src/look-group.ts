import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { TURN_HEIGHT_PX } from './tokens.ts';

/**
 * A group of commands on the rail. `end` pins it to the rail's far end.
 *
 * @slot - The `look-command`s.
 */
@customElement('look-group')
export class LookGroup extends LitElement {
  @property({ type: Boolean, reflect: true }) end = false;

  static override styles = [
    chromeTokens,
    css`
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

      @media (max-height: ${unsafeCSS(TURN_HEIGHT_PX)}px) {
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
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-group': LookGroup;
  }
}
