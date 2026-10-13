import { LitElement } from 'lit';
/**
 * The rail: the views as its first group, then the command groups. At or below
 * the turn height it lies down as a strip along the top of the work pane.
 *
 * @slot views - The `look-view`s; each puts itself here.
 * @slot - The `look-group`s.
 */
export declare class LookRail extends LitElement {
    private hasViews;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private onViews;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-rail': LookRail;
    }
}
