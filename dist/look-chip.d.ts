import { LitElement } from 'lit';
/**
 * A fault on the band, in red: "station not reachable". A long one is cut
 * short with "…"; give it a `title` to show the whole sentence.
 *
 * @slot - The fault.
 */
export declare class LookChip extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-chip': LookChip;
    }
}
