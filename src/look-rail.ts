import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { place } from './place.ts';
import { TURN_HEIGHT_PX } from './tokens.ts';

/**
 * The rail: the views as its first group, then the command groups. At or below
 * the turn height it lies down as a strip along the top of the work pane.
 *
 * @slot views - The `look-view`s; each puts itself here.
 * @slot - The `look-group`s.
 */
@customElement('look-rail')
export class LookRail extends LitElement {
  @state() private hasViews = false;

  static override styles = [
    chromeTokens,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        padding: 0.6em 0.3em;
        width: 78px;
        box-sizing: border-box;
        flex-shrink: 0;
        background: var(--rail);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
        overflow-y: auto;
        user-select: none;
        position: relative;
        z-index: 50;
        font-family: var(--sl-font-sans);
      }

      .views {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em 0;
        width: calc(100% - 8px);
        background: rgba(0, 0, 0, 0.25);
        border-radius: 8px;
      }

      .views[hidden] {
        display: none;
      }

      @media (max-height: ${unsafeCSS(TURN_HEIGHT_PX)}px) {
        :host {
          flex-direction: row;
          width: auto;
          gap: 0.75em;
          padding: 0.4em 0.5em;
          overflow-x: auto;
          overflow-y: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .views {
          flex-direction: row;
          width: auto;
          padding: 0 0.35em;
        }
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'rail');
  }

  private onViews(e: Event) {
    this.hasViews = (e.target as HTMLSlotElement).assignedElements().length > 0;
  }

  override render() {
    return html`
      <div class="views" role="group" aria-label="View" ?hidden=${!this.hasViews}>
        <slot name="views" @slotchange=${this.onViews}></slot>
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-rail': LookRail;
  }
}
