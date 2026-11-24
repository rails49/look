import { StatusText } from './status-text.ts';
/**
 * A connection on the band: a dot, green when up and red when down, then its
 * name. Where the band is narrow the name is cut short with "…" and the dot
 * stays. A tap, a hover or keyboard focus shows the whole name, or `label`
 * where there is more to say.
 *
 * @slot - What is connected.
 */
export declare class LookDot extends StatusText {
    state: 'up' | 'down';
    static styles: (import("lit").CSSResult | import("lit").CSSResult[])[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-dot': LookDot;
    }
}
