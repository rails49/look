import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
/**
 * The dialog shell: a header on the band's blue with a white close, the body,
 * and a grey footer with its buttons on the right. Shoelace's `sl-*` events
 * pass through; `sl-request-close` can be cancelled as on `sl-dialog`.
 *
 * @slot - The body.
 * @slot footer - The buttons.
 */
export declare class LookDialog extends LitElement {
    label: string;
    size: 'small' | 'medium';
    private dialog;
    static styles: import("lit").CSSResult[];
    get open(): boolean;
    show(): Promise<void>;
    hide(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-dialog': LookDialog;
    }
}
