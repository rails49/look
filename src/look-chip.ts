import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StatusText } from './status-text.ts';

/**
 * A fault on the band, in red: "station not reachable". A long one, or one
 * on a narrow band, is cut short with "…". A tap, a hover or keyboard focus
 * shows the whole sentence, or `label` where there is more to say.
 *
 * @slot - The fault.
 */
@customElement('look-chip')
export class LookChip extends StatusText {
  static override styles = [
    StatusText.baseStyles,
    css`
      :host {
        display: inline-block;
        /* The padding, then up to 20rem of text. */
        min-width: 1rem;
        max-width: 21rem;
        vertical-align: middle;
        font-size: 0.85rem;
      }

      button {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        background: var(--stop);
        padding: 0.1rem 0.5rem;
        border-radius: 4px;
      }
    `,
  ];

  override render() {
    return this.inTooltip(html`<slot></slot>`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-chip': LookChip;
  }
}
