import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens, inkButton } from './chrome.ts';
import { firePress } from './events.ts';
import { place } from './place.ts';

/**
 * Settings, on the band. The app opens its own settings dialog.
 *
 * @fires look-press
 */
@customElement('look-gear')
export class LookGear extends LitElement {
  static override styles = [
    chromeTokens,
    inkButton,
    css`
      sl-icon-button {
        font-size: 1.5rem;
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'gear');
  }

  override render() {
    return html`<sl-tooltip content="Settings" placement="bottom">
      <sl-icon-button
        name="gear"
        label="Settings"
        @click=${(e: Event) => firePress(this, e)}
      ></sl-icon-button>
    </sl-tooltip>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-gear': LookGear;
  }
}
