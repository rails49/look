import { css, unsafeCSS } from 'lit';
import { tokenDeclarations } from './tokens.ts';

/**
 * Put first in every chrome element's styles. The tokens are declared on each
 * host, so a value set on the page does not reach the chrome.
 */
export const chromeTokens = css`
  :host {
    ${unsafeCSS(tokenDeclarations)}
  }
`;

