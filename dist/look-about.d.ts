import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
/**
 * What the UI is about, on the band's left: a name and a quieter detail.
 * When `pressable`, it is a button and fires `look-press`; the app opens its
 * own picker.
 *
 * @fires look-press
 */
export declare class LookAbout extends LitElement {
    name: string;
    detail: string;
    pressable: boolean;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-about': LookAbout;
    }
}
