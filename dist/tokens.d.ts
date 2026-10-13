/**
 * The chrome's values. They stay the same in light and dark. An app may read
 * them with `var()` and may not set them; `look-check` fails on a setting.
 */
export declare const TOKENS: {
    readonly '--band': "#1d4ed8";
    readonly '--band-ink': "#ffffff";
    readonly '--rail': "#064e3b";
    readonly '--rail-group': "#059669";
    readonly '--rail-button': "44px";
    readonly '--power-on': "#4ade80";
    readonly '--stop': "#ef4444";
};
/** Window height at or below which the shell and rail turn into a strip. */
export declare const TURN_HEIGHT_PX = 640;
/** The tokens as declarations, for a `:root` or `:host` block. */
export declare const tokenDeclarations: string;
/**
 * The theme layer's Shoelace values: primary is the band's blue, controls one
 * step smaller, a 3px radius, a thin blue focus ring, tooltips on the band.
 */
export declare const SHOELACE_VALUES: {
    readonly '--sl-color-primary-50': "var(--sl-color-blue-100)";
    readonly '--sl-color-primary-100': "var(--sl-color-blue-200)";
    readonly '--sl-color-primary-200': "var(--sl-color-blue-300)";
    readonly '--sl-color-primary-300': "var(--sl-color-blue-400)";
    readonly '--sl-color-primary-400': "var(--sl-color-blue-500)";
    readonly '--sl-color-primary-500': "var(--sl-color-blue-600)";
    readonly '--sl-color-primary-600': "var(--sl-color-blue-700)";
    readonly '--sl-color-primary-700': "var(--sl-color-blue-800)";
    readonly '--sl-color-primary-800': "var(--sl-color-blue-900)";
    readonly '--sl-color-primary-900': "var(--sl-color-blue-950)";
    readonly '--sl-color-primary-950': "var(--sl-color-blue-950)";
    readonly '--sl-input-height-small': "1.75rem";
    readonly '--sl-input-height-medium': "2.25rem";
    readonly '--sl-input-font-size-medium': "var(--sl-font-size-small)";
    readonly '--sl-button-font-size-medium': "var(--sl-font-size-small)";
    readonly '--sl-border-radius-medium': "3px";
    readonly '--sl-focus-ring-width': "2px";
    readonly '--sl-focus-ring-color': "color-mix(in srgb, var(--band) 60%, transparent)";
    readonly '--sl-tooltip-background-color': "var(--band)";
    readonly '--sl-tooltip-color': "var(--band-ink)";
    readonly '--sl-tooltip-font-size': "var(--sl-font-size-x-small)";
};
