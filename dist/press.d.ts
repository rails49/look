import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/** What a press is drawn from. */
export interface Press {
    readonly icon?: string;
    /** Shown in place of an icon, and then the button's name. */
    readonly word?: string;
    /** The button's name, or its tooltip alone when there is a word. */
    readonly label: string;
    /** Shown in the tooltip after the label. */
    readonly key?: string;
    /** Fires nothing; stays focusable, and its tooltip says why. */
    readonly disabled?: boolean;
    /** Why it is disabled: its tooltip, in place of the label. */
    readonly reason?: string;
    /** In force, such as the current tool. */
    readonly pressed?: boolean;
    readonly placement: 'right' | 'bottom';
    /** A class on the button, for the element's own CSS. */
    readonly part?: string;
    /** Called only when not disabled. */
    readonly onPress: (e: Event) => void;
}
/** A press in the chrome: a button inside its tooltip. */
export declare function press(p: Press): import("lit").TemplateResult<1>;
/**
 * Put after `chromeTokens` in an element that draws presses. Every rule is in
 * `:where()`, so the element's own rules win: its sizes, layout and colours.
 */
export declare const pressStyles: import("lit").CSSResult;
