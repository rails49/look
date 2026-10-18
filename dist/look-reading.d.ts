import { LitElement } from 'lit';
/**
 * A status reading on the band, as text: "42 km/h", "3 trains". Where the
 * band is narrow it is cut short with "…"; give it a `title` to show the whole
 * reading.
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
