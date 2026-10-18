import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * The band: the mark, the UI name and what the UI is about on the left; its
 * status items, the gear and track power on the right, in that order.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot gear - A `look-gear`.
 * @slot power - A `look-power`.
 */
export declare class LookBand extends LitElement {
    /** The UI name, drawn after the mark. None on a page that is not a UI. */
    ui: string;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-band': LookBand;
    }
}
