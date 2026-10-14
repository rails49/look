import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import type SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from './chrome.ts';
import { firePress } from './events.ts';
import { libraryOf } from './icons.ts';
import { tip } from './keys.ts';
import { TURN_HEIGHT_PX } from './tokens.ts';

/**
 * A command on the rail: an icon with its label and key as the tooltip, or a
 * `word`. `pressed` marks the command that is in force, such as the editor's
 * current tool. A disabled command fires nothing; its `reason`, if set, is its
 * tooltip. Binding the key is the app's.
 *
 * @fires look-press
 */
@customElement('look-command')
export class LookCommand extends LitElement {
  @property() icon = '';
  @property() word = '';
  @property() label = '';
  @property() key = '';
  @property({ type: Boolean, reflect: true }) pressed = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() reason = '';

  @query('sl-icon-button') private iconButton?: SlIconButton;

  static override styles = [
    chromeTokens,
    css`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      sl-icon-button {
        font-size: 2.1em;
        transition: transform 0.1s;
      }

      sl-icon-button::part(base) {
        color: white;
        justify-content: center;
        min-width: var(--rail-button);
        min-height: var(--rail-button);
      }

      sl-icon-button::part(base):hover,
      sl-icon-button::part(base):focus-visible {
        color: rgba(255, 255, 255, 0.7);
      }

      sl-icon-button:not([disabled], .off):hover {
        transform: scale(1.1);
      }

      sl-icon-button[disabled],
      .off {
        opacity: 0.35;
      }

      .off::part(base) {
        cursor: default;
      }

      :host([pressed]) sl-icon-button::part(base) {
        background: rgba(255, 255, 255, 0.22);
        border-radius: 8px;
      }

      button {
        width: calc(100% - 8px);
        min-height: var(--rail-button);
        font: inherit;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: white;
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        cursor: pointer;
      }

      button:hover,
      button:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        outline: none;
      }

      :host([pressed]) button {
        background: rgba(255, 255, 255, 0.22);
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }

      @media (max-height: ${unsafeCSS(TURN_HEIGHT_PX)}px) {
        :host {
          width: auto;
        }

        sl-icon-button {
          font-size: 1.6em;
        }

        button {
          width: auto;
          padding: 0 0.8rem;
        }
      }
    `,
  ];

  private press(e: Event) {
    if (!this.disabled) firePress(this, e);
  }

  // sl-icon-button passes no aria-pressed to the button inside it.
  override async updated() {
    if (!this.iconButton) return;
    await this.iconButton.updateComplete;
    const button = this.iconButton.shadowRoot!.querySelector('button')!;
    if (this.pressed) button.setAttribute('aria-pressed', 'true');
    else button.removeAttribute('aria-pressed');
  }

  override render() {
    // Not disabled when there is a reason: a disabled sl-icon-button takes no
    // pointer events, and the tooltip has to open to say why.
    const held = this.disabled && !!this.reason;
    const content = held ? this.reason : tip(this.label, this.key);
    if (this.word)
      return html`<button
        ?disabled=${this.disabled}
        title=${content}
        aria-pressed=${this.pressed ? 'true' : nothing}
        @click=${this.press}
      >
        ${this.word}
      </button>`;
    return html`<sl-tooltip content=${content} placement="right" hoist>
      <sl-icon-button
        name=${this.icon}
        library=${libraryOf(this.icon)}
        label=${this.label}
        class=${held ? 'off' : ''}
        ?disabled=${this.disabled && !held}
        @click=${this.press}
      ></sl-icon-button>
    </sl-tooltip>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-command': LookCommand;
  }
}
