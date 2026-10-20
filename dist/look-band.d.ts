import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * The band: the mark, the UI name and what the UI is about on the left; the
 * UI's items, the gear and Help on the right, in that order. Track power is
 * the last of the UI's items.
 * Where the band is too narrow for all of it, the status items cut their text
 * short; then the band drops the UI name, Help and the gear, in that order and
 * only as far as it must; then what the UI is about is cut short. The mark, a
 * band press and track power keep their size.
 *
 * @slot about - A `look-about`.
 * @slot - Status items: `look-reading`, `look-chip`, `look-dot`, `look-band-press`.
 * @slot power - A `look-power`.
 * @slot gear - A `look-gear`.
 */
export declare class LookBand extends LitElement {
    /** The UI name, drawn after the mark. None on a page that is not a UI. */
    ui: string;
    /** The address of the UI's docs, where Help links. Without it, the UI's repository. */
    help: string;
    private readonly resize;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(): void;
    /**
     * Shows everything, then drops the UI name, Help and the gear in turn until
     * the band fits. Where it still does not fit, what the UI is about is cut.
     */
    private fit;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-band': LookBand;
    }
}
