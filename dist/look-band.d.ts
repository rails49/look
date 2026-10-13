import { LitElement } from 'lit';
/**
 * The band: what the UI is about on the left; its status items, the gear and
 * track power on the right, in that order.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot gear - A `look-gear`.
 * @slot power - A `look-power`.
 */
export declare class LookBand extends LitElement {
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-band': LookBand;
    }
}
