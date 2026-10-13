import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
/**
 * One view on the rail: its icon with its word under it. Choosing a view that
 * is not current fires `look-view`; the app shows it and moves `current`.
 *
 * @fires look-view - Detail: the view's `name`.
 */
export declare class LookView extends LitElement {
    name: string;
    icon: string;
    label: string;
    current: boolean;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private choose;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-view': LookView;
    }
}
