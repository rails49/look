var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fire } from "./events.js";
import { GAP_PX } from "./tokens.js";
/**
 * A gap a person drags between two parts of a work pane (#62). `axis` is the
 * way it is dragged: `x` for a gap between a left and a right part, `GAP_PX`
 * wide; `y` for one between a top and a bottom part, `GAP_PX` tall.
 *
 * A left-button or touch press starts a drag and captures the pointer. While
 * dragged it fires `look-gap-move` with the pointer's client point and sets
 * `dragging`. Release, cancel or a change of `axis` ends the drag. It knows
 * nothing of sizes: the caller works out what the point means and sizes the
 * parts either side.
 *
 * What takes the press is wider than the gap and lies over the parts either
 * side, wider again under a finger. At rest the gap is clear; on hover and
 * while dragged it is `--sl-color-primary-600`.
 */
let LookGap = class LookGap extends LitElement {
    static { this.styles = css `
    :host {
      --reach: 0.3rem;
      display: block;
      position: relative;
      z-index: 1;
      touch-action: none;
    }

    @media (pointer: coarse) {
      :host {
        --reach: 0.7rem;
      }
    }

    :host([axis='x']) {
      width: ${unsafeCSS(GAP_PX)}px;
      cursor: col-resize;
    }

    :host([axis='y']) {
      height: ${unsafeCSS(GAP_PX)}px;
      cursor: row-resize;
    }

    div {
      position: absolute;
    }

    :host([axis='x']) div {
      inset: 0 calc(-1 * var(--reach));
    }

    :host([axis='y']) div {
      inset: calc(-1 * var(--reach)) 0;
    }

    :host(:hover),
    :host([dragging]) {
      background: var(--sl-color-primary-600);
    }
  `; }
    constructor() {
        super();
        this.axis = 'x';
        this.addEventListener('pointerdown', (e) => this.grab(e));
        this.addEventListener('pointermove', (e) => this.move(e));
        this.addEventListener('pointerup', () => this.release());
        this.addEventListener('pointercancel', () => this.release());
    }
    willUpdate(changed) {
        if (changed.has('axis'))
            this.release();
    }
    render() {
        return html `<div></div>`;
    }
    grab(e) {
        if (e.button !== 0)
            return;
        e.preventDefault();
        this.setPointerCapture?.(e.pointerId);
        this.toggleAttribute('dragging', true);
    }
    move(e) {
        if (this.hasAttribute('dragging'))
            fire(this, 'look-gap-move', { x: e.clientX, y: e.clientY });
    }
    release() {
        this.removeAttribute('dragging');
    }
};
__decorate([
    property({ reflect: true })
], LookGap.prototype, "axis", void 0);
LookGap = __decorate([
    customElement('look-gap')
], LookGap);
export { LookGap };
