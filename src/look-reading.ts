import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatusText } from './status-text.ts';

/**
 * A status reading on the band, as text: "42 km/h", "3 trains". Where the
 * band is narrow it is cut short with "…". A tap, a hover or keyboard focus
 * shows the whole reading, or `label` where there is more to say.
 *
 * @slot - The reading.
 */
@customElement('look-reading')
export class LookReading extends StatusText {
  static override styles = [
    StatusText.baseStyles,
    css`
      :host {
        display: inline-block;
        min-width: 0;
        vertical-align: middle;
        font-size: 0.95rem;
      }

      button {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];

  override render() {
    return this.inTooltip(html`<slot></slot>`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-reading': LookReading;
  }
}
