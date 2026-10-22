import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * One view on the rail: its icon with its word under it. Choosing a view that
 * is not current fires `look-view`; the app shows it and moves `current`. A
 * disabled view fires nothing; its `reason`, if set, is its tooltip.
 *
 * @fires look-view - Detail: the view's `name`.
 */
export declare class LookView extends LitElement {
    name: string;
    icon: string;
    label: string;
    current: boolean;
    disabled: boolean;
    reason: string;
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
