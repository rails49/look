import { LitElement, css, html, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fire, type LookGapMoveDetail } from './events.ts';
import { GAP_PX } from './tokens.ts';

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
@customElement('look-gap')
export class LookGap extends LitElement {
  @property({ reflect: true }) axis: 'x' | 'y' = 'x';

  static override styles = css`
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
  `;

  constructor() {
    super();
    this.addEventListener('pointerdown', (e) => this.grab(e));
    this.addEventListener('pointermove', (e) => this.move(e));
    this.addEventListener('pointerup', () => this.release());
    this.addEventListener('pointercancel', () => this.release());
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('axis')) this.release();
  }

  override render() {
    return html`<div></div>`;
  }

  private grab(e: PointerEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    this.setPointerCapture?.(e.pointerId);
    this.toggleAttribute('dragging', true);
  }

  private move(e: PointerEvent) {
    if (this.hasAttribute('dragging')) fire<LookGapMoveDetail>(this, 'look-gap-move', { x: e.clientX, y: e.clientY });
  }

  private release() {
    this.removeAttribute('dragging');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-gap': LookGap;
  }
}
