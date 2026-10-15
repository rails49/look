import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { firePress } from './events.ts';
import { place } from './place.ts';
import { press, pressStyles } from './press.ts';

/**
 * Settings, on the band. The app opens its own settings dialog.
 *
 * @fires look-press
 */
@customElement('look-gear')
export class LookGear extends LitElement {
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
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'gear');
  }

  override render() {
    return press({
      icon: 'gear',
      label: 'Settings',
      placement: 'bottom',
      onPress: (e) => firePress(this, e),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-gear': LookGear;
  }
}
