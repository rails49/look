import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from './chrome.ts';
import { pressStyles } from './press.ts';

/**
 * Status text on the band: a button inside a tooltip. A tap, a hover or
 * keyboard focus shows the whole text, which the band may have cut short.
 * It is not a press and fires nothing. With no text and no `label` there is
 * no tooltip.
 */
export abstract class StatusText extends LitElement {
  /** Shown in the tooltip in place of the element's own text. */
  @property() label = '';

  @state() private text = '';

  private readonly textChanges = new MutationObserver(() => this.read());

  /** Put first in the element's styles; its own rules follow and win. */
  static readonly baseStyles = [
    chromeTokens,
    pressStyles,
    css`
      button {
        max-width: 100%;
        box-sizing: border-box;
        padding: 0;
        white-space: nowrap;
        cursor: default;
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.read();
    this.textChanges.observe(this, { childList: true, characterData: true, subtree: true });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.textChanges.disconnect();
  }

  private read() {
    this.text = this.textContent!.trim();
  }

  /** The button inside its tooltip, around `content`, which holds the slot. */
  protected inTooltip(content: unknown) {
    const tip = this.label || this.text;
    return html`<sl-tooltip content=${tip} ?disabled=${!tip} placement="bottom" hoist>
      <button>${content}</button>
    </sl-tooltip>`;
  }
}
