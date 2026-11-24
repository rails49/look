import { StatusText } from './status-text.ts';
/**
 * A status reading on the band, as text: "42 km/h", "3 trains". Where the
 * band is narrow it is cut short with "…". A tap, a hover or keyboard focus
 * shows the whole reading, or `label` where there is more to say.
 *
 * @slot - The reading.
 */
export declare class LookReading extends StatusText {
    static styles: (import("lit").CSSResult | import("lit").CSSResult[])[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-reading': LookReading;
    }
}
