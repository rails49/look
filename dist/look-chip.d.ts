import { StatusText } from './status-text.ts';
/**
 * A fault on the band, in red: "station not reachable". A long one, or one
 * on a narrow band, is cut short with "…". A tap, a hover or keyboard focus
 * shows the whole sentence, or `label` where there is more to say.
 *
 * @slot - The fault.
 */
export declare class LookChip extends StatusText {
    static styles: (import("lit").CSSResult | import("lit").CSSResult[])[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-chip': LookChip;
    }
}
