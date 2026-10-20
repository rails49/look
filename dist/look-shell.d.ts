import { LitElement } from 'lit';
/**
 * The page: the band on top, the rail on the left, the work pane beside it.
 * With no rail, the work pane takes the width. On a short or narrow window the
 * rail lies along the top of the work pane.
 *
 * @slot band - A `look-band`.
 * @slot rail - A `look-rail`.
 * @slot - The work pane.
 */
export declare class LookShell extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-shell': LookShell;
    }
}
