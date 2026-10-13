import { LitElement } from 'lit';
/**
 * A status reading on the band, as text: "42 km/h", "3 trains".
 *
 * @slot - The reading.
 */
export declare class LookReading extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-reading': LookReading;
    }
}
