import { LitElement, type PropertyValues } from 'lit';
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
export declare class LookGap extends LitElement {
    axis: 'x' | 'y';
    static styles: import("lit").CSSResult;
    constructor();
    willUpdate(changed: PropertyValues<this>): void;
    render(): import("lit").TemplateResult<1>;
    private grab;
    private move;
    private release;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-gap': LookGap;
    }
}
