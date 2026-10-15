import { LitElement } from 'lit';
/**
 * Settings, on the band. The app opens its own settings dialog.
 *
 * @fires look-press
 */
export declare class LookGear extends LitElement {
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
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-gear': LookGear;
    }
}
