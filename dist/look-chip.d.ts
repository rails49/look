import { LitElement } from 'lit';
/**
 * A fault on the band, in red: "station not reachable".
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
