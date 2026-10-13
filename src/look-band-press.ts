import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens, inkButton } from './chrome.ts';
import { firePress } from './events.ts';
import { libraryOf } from './icons.ts';

/**
 * A press on the band: an icon with `label` as its tooltip, or a `word`.
 * A disabled press fires nothing.
 *
 * @fires look-press
 */
@customElement('look-band-press')
export class LookBandPress extends LitElement {
  @property() icon = '';
  @property() word = '';
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  static override styles = [
    chromeTokens,
    inkButton,
    css`
      sl-icon-button {
        font-size: 1.5rem;
      }

      button {
        font: inherit;
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        color: var(--band-ink);
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.55);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
      }

      button:hover,
      button:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        outline: none;
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }
    `,
  ];

  private press(e: Event) {
    if (!this.disabled) firePress(this, e);
  }

  override render() {
    if (this.word)
      return html`<button ?disabled=${this.disabled} title=${this.label} @click=${this.press}>
        ${this.word}
      </button>`;
    return html`<sl-tooltip content=${this.label} placement="bottom">
      <sl-icon-button
        name=${this.icon}
        library=${libraryOf(this.icon)}
        label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.press}
      ></sl-icon-button>
    </sl-tooltip>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-band-press': LookBandPress;
  }
}
