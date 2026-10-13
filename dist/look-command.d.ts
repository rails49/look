import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * A command on the rail: an icon with its label and key as the tooltip, or a
 * `word`. `pressed` marks the command that is in force, such as the editor's
 * current tool. A disabled command fires nothing. Binding the key is the
 * app's.
 *
 * @fires look-press
 */
export declare class LookCommand extends LitElement {
    icon: string;
    word: string;
    label: string;
    key: string;
    pressed: boolean;
    disabled: boolean;
    static styles: import("lit").CSSResult[];
    private press;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-command': LookCommand;
    }
}
