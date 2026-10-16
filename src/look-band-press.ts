import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { firePress } from './events.ts';
import { press, pressStyles } from './press.ts';

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

  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** Presses the button, as a person would. */
  override click() {
    this.renderRoot.querySelector('button')!.click();
  }

  static override styles = [
    chromeTokens,
    pressStyles,
    css`
      .icon {
        font-size: 1.5rem;
      }

      .word {
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        border-color: rgba(255, 255, 255, 0.55);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
      }
    `,
  ];

  override render() {
    return press({
      icon: this.icon,
      word: this.word,
      label: this.label,
      disabled: this.disabled,
      placement: 'bottom',
      onPress: (e) => firePress(this, e),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-band-press': LookBandPress;
  }
}
