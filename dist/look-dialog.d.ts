import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
/**
 * The dialog shell: a header on the band's blue with a white close, the body,
 * and a grey footer with its buttons on the right. `open` shows it, set by the
 * app or by `show()` and `hide()`; it turns false when the person closes it.
 * Shoelace's `sl-*` events pass through; `sl-request-close` can be cancelled
 * as on `sl-dialog`.
 *
 * @slot - The body.
 * @slot footer - The buttons.
 */
export declare class LookDialog extends LitElement {
    label: string;
    size: 'small' | 'medium';
    open: boolean;
    private dialog;
    static styles: import("lit").CSSResult[];
    show(): Promise<void>;
    hide(): Promise<void>;
    private follow;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-dialog': LookDialog;
    }
}
