import { LitElement } from 'lit';
/**
 * A command on the rail: an icon with its label and key as the tooltip, or a
 * `word`. `pressed` marks the command that is in force, such as the editor's
 * current tool. A disabled command fires nothing; its `reason`, if set, is its
 * tooltip. Binding the key is the app's.
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
    reason: string;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** Presses the button, as a person would. */
    click(): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-command': LookCommand;
    }
}
