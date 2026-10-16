import { LitElement } from 'lit';
/**
 * A press on the band: an icon with `label` as its tooltip, or a `word`.
 * A disabled press fires nothing.
 *
 * @fires look-press
 */
export declare class LookBandPress extends LitElement {
    icon: string;
    word: string;
    label: string;
    disabled: boolean;
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
        'look-band-press': LookBandPress;
    }
}
