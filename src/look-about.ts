import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { chromeTokens } from './chrome.ts';
import { firePress } from './events.ts';
import { place } from './place.ts';

/**
 * What the UI is about, on the band's left: a name and a quieter detail.
 * When `pressable`, it is a button and fires `look-press`; the app opens its
 * own picker.
 *
 * @fires look-press
 */
@customElement('look-about')
export class LookAbout extends LitElement {
  @property() name = '';
  @property() detail = '';
  @property({ type: Boolean, reflect: true }) pressable = false;

  static override styles = [
    chromeTokens,
    css`
      :host {
        display: block;
        min-width: 0;
      }

      .about {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        font: inherit;
        font-size: 1.25rem;
        font-weight: 600;
        color: inherit;
        background: none;
        border: none;
        border-radius: 4px;
        padding: 0.2rem 0.4rem;
      }

      button.about {
        cursor: pointer;
      }

      button.about:hover,
      button.about:focus-visible {
        background: rgba(255, 255, 255, 0.15);
        outline: none;
      }

      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      small {
        font-weight: 400;
        opacity: 0.75;
        font-size: 0.8em;
        margin-left: 0.5rem;
      }

      sl-icon {
        flex-shrink: 0;
        font-size: 0.8em;
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'about');
  }

  override render() {
    const text = html`<span class="text"
      >${this.name}${this.detail ? html`<small>${this.detail}</small>` : nothing}</span
    >`;
    if (!this.pressable) return html`<div class="about">${text}</div>`;
    return html`<button class="about" @click=${(e: Event) => firePress(this, e)}>
      ${text}<sl-icon name="chevron-down"></sl-icon>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-about': LookAbout;
  }
}
