import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { chromeTokens } from './chrome.ts';
import { fire, type LookViewDetail } from './events.ts';
import { libraryOf } from './icons.ts';
import { place } from './place.ts';
import { TURN_HEIGHT_PX } from './tokens.ts';

/**
 * One view on the rail: its icon with its word under it. Choosing a view that
 * is not current fires `look-view`; the app shows it and moves `current`.
 *
 * @fires look-view - Detail: the view's `name`.
 */
@customElement('look-view')
export class LookView extends LitElement {
  @property() name = '';
  @property() icon = '';
  @property() label = '';
  @property({ type: Boolean, reflect: true }) current = false;

  static override styles = [
    chromeTokens,
    css`
      :host {
        display: block;
        width: 100%;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.1em;
        width: 100%;
        min-height: var(--rail-button);
        padding: 0.25em 0;
        box-sizing: border-box;
        font: inherit;
        font-size: 0.7rem;
        color: white;
        background: none;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      sl-icon {
        font-size: 1.75rem;
        transition: transform 0.1s;
      }

      button:hover,
      button:focus-visible {
        color: rgba(255, 255, 255, 0.7);
        outline: none;
      }

      button:hover sl-icon {
        transform: scale(1.1);
      }

      :host([current]) button {
        background: rgba(255, 255, 255, 0.22);
        color: white;
        cursor: default;
      }

      :host([current]) button:hover sl-icon {
        transform: none;
      }

      @media (max-height: ${unsafeCSS(TURN_HEIGHT_PX)}px) {
        :host {
          width: auto;
        }

        button {
          min-width: var(--rail-button);
          padding: 0.2em 0.5em;
        }
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'views');
  }

  private choose() {
    if (!this.current) fire<LookViewDetail>(this, 'look-view', { name: this.name });
  }

  override render() {
    return html`<button aria-current=${this.current ? 'page' : nothing} @click=${this.choose}>
      <sl-icon name=${this.icon} library=${libraryOf(this.icon)}></sl-icon>${this.label}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-view': LookView;
  }
}
