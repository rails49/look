import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { STRIP_MEDIA } from './tokens.ts';

/**
 * The page: the band on top, the rail on the left, the work pane beside it.
 * With no rail, the work pane takes the width. On a short or narrow window the
 * rail lies along the top of the work pane.
 *
 * @slot band - A `look-band`.
 * @slot rail - A `look-rail`.
 * @slot - The work pane.
 */
@customElement('look-shell')
export class LookShell extends LitElement {
  static override styles = [
    chromeTokens,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100dvh;
      }

      .body {
        flex: 1;
        display: flex;
        min-height: 0;
      }

      .work {
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow: auto;
        position: relative;
      }

      @media ${unsafeCSS(STRIP_MEDIA)} {
        .body {
          flex-direction: column;
        }
      }
    `,
  ];

  override render() {
    return html`
      <slot name="band"></slot>
      <div class="body">
        <slot name="rail"></slot>
        <div class="work"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-shell': LookShell;
  }
}
