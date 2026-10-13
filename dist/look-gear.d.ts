import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * Settings, on the band. The app opens its own settings dialog.
 *
 * @fires look-press
 */
export declare class LookGear extends LitElement {
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-gear': LookGear;
    }
}
