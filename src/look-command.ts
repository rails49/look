import { LitElement, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { firePress } from './events.ts';
import { press, pressStyles } from './press.ts';
import { STRIP_MEDIA } from './tokens.ts';

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

  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** Presses the button, as a person would. */
  override click() {
    this.renderRoot.querySelector('button')!.click();
  }

  static override styles = [
    chromeTokens,
    pressStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .icon {
        font-size: 2.1em;
        min-width: var(--rail-button);
        min-height: var(--rail-button);
      }

      .word {
        width: calc(100% - 8px);
        min-height: var(--rail-button);
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
      }

      @media ${unsafeCSS(STRIP_MEDIA)} {
        :host {
          width: auto;
        }

        .icon {
          font-size: 1.6em;
        }

        .word {
          width: auto;
          padding: 0 0.8rem;
        }
      }
    `,
  ];

  override render() {
    return press({
      icon: this.icon,
      word: this.word,
      label: this.label,
      key: this.key,
      disabled: this.disabled,
      reason: this.reason,
      pressed: this.pressed,
      placement: 'right',
      onPress: (e) => firePress(this, e),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-command': LookCommand;
  }
}
