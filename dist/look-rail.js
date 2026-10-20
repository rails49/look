var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { place } from "./place.js";
import { STRIP_MEDIA } from "./tokens.js";
/**
 * The rail: the views as its first group, then the command groups. On a short
 * or narrow window it lies down as a strip along the top of the work pane.
 *
 * @slot views - The `look-view`s; each puts itself here.
 * @slot - The `look-group`s.
 */
let LookRail = class LookRail extends LitElement {
    constructor() {
        super(...arguments);
        this.hasViews = false;
    }
    static { this.styles = [
        chromeTokens,
        css `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        padding: 0.6em 0.3em;
        width: 78px;
        box-sizing: border-box;
        flex-shrink: 0;
        background: var(--rail);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
        overflow-y: auto;
        user-select: none;
        position: relative;
        z-index: 50;
        font-family: var(--sl-font-sans);
      }

      .views {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em 0;
        width: calc(100% - 8px);
        background: rgba(0, 0, 0, 0.25);
        border-radius: 8px;
      }

      .views[hidden] {
        display: none;
      }

      @media ${unsafeCSS(STRIP_MEDIA)} {
        :host {
          flex-direction: row;
          width: auto;
          gap: 0.75em;
          padding: 0.4em 0.5em;
          overflow-x: auto;
          overflow-y: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .views {
          flex-direction: row;
          width: auto;
          padding: 0 0.35em;
        }
      }
    `,
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'rail');
    }
    onViews(e) {
        this.hasViews = e.target.assignedElements().length > 0;
    }
    render() {
        return html `
      <div class="views" role="group" aria-label="View" ?hidden=${!this.hasViews}>
        <slot name="views" @slotchange=${this.onViews}></slot>
      </div>
      <slot></slot>
    `;
    }
};
__decorate([
    state()
], LookRail.prototype, "hasViews", void 0);
LookRail = __decorate([
    customElement('look-rail')
], LookRail);
export { LookRail };
