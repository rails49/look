import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './look-dialog.ts';
/**
 * A `look-dialog` of `size="large"` that shows a long text (#60): a stored
 * file, a log. `text` is shown as is in a monospace block that keeps line
 * breaks and spaces, scrolls inside the dialog and can be selected. `error`
 * is a line shown in place of the text; while it is set no text is shown.
 * The caller sets `text` or `error`; the element reads nothing.
 *
 * `open`, `show()` and `hide()` are as on `look-dialog`. Close, Escape and
 * the header's close hide it, and `sl-*` events pass through.
 */
export declare class LookTextDialog extends LitElement {
    label: string;
    text: string;
    error: string;
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
        'look-text-dialog': LookTextDialog;
    }
}
