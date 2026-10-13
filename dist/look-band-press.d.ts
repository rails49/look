import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * A press on the band: an icon with `label` as its tooltip, or a `word`.
 * A disabled press fires nothing.
 *
 * @fires look-press
 */
export declare class LookBandPress extends LitElement {
    icon: string;
    word: string;
    label: string;
    disabled: boolean;
    static styles: import("lit").CSSResult[];
    private press;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-band-press': LookBandPress;
    }
}
