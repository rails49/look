var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { TURN_HEIGHT_PX } from "./tokens.js";
/**
 * The page: the band on top, the rail on the left, the work pane beside it.
 * With no rail, the work pane takes the width. At or below the turn height the
 * rail lies along the top of the work pane.
 *
 * @slot band - A `look-band`.
 * @slot rail - A `look-rail`.
 * @slot - The work pane.
 */
let LookShell = class LookShell extends LitElement {
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: flex;
        flex-direction: column;
        height: 100dvh;
      }

      .body {
        flex: 1;
        display: flex;
        min-height: 0;
      }

      .work {
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow: auto;
        position: relative;
      }

      @media (max-height: ${unsafeCSS(TURN_HEIGHT_PX)}px) {
        .body {
          flex-direction: column;
        }
      }
    `,
    ]; }
    render() {
        return html `
      <slot name="band"></slot>
      <div class="body">
        <slot name="rail"></slot>
        <div class="work"><slot></slot></div>
      </div>
    `;
    }
};
LookShell = __decorate([
    customElement('look-shell')
], LookShell);
export { LookShell };
