import { css, unsafeCSS } from 'lit';
import { tokenDeclarations } from "./tokens.js";
/**
 * Put first in every chrome element's styles. The tokens are declared on each
 * host, so a value set on the page does not reach the chrome.
 */
export const chromeTokens = css `
  :host {
    ${unsafeCSS(tokenDeclarations)}
  }
`;
/** A white icon button on the band or the rail, dimmed on hover. */
export const inkButton = css `
  sl-icon-button {
    color: var(--band-ink);
  }

  sl-icon-button::part(base):hover,
  sl-icon-button::part(base):focus-visible {
    color: rgba(255, 255, 255, 0.7);
  }
`;
