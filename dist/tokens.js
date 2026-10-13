/**
 * The chrome's values. They stay the same in light and dark. An app may read
 * them with `var()` and may not set them; `look-check` fails on a setting.
 */
export const TOKENS = {
    '--band': '#1d4ed8',
    '--band-ink': '#ffffff',
    '--rail': '#064e3b',
    '--rail-group': '#059669',
    '--rail-button': '44px',
    '--power-on': '#4ade80',
    '--stop': '#ef4444',
};
/** Window height at or below which the shell and rail turn into a strip. */
export const TURN_HEIGHT_PX = 640;
/** The tokens as declarations, for a `:root` or `:host` block. */
export const tokenDeclarations = Object.entries(TOKENS)
    .map(([name, value]) => `${name}: ${value};`)
    .join('\n');
/**
 * The theme layer's Shoelace values: primary is the band's blue, controls one
 * step smaller, a 3px radius, a thin blue focus ring, tooltips on the band.
 */
export const SHOELACE_VALUES = {
    '--sl-color-primary-50': 'var(--sl-color-blue-100)',
    '--sl-color-primary-100': 'var(--sl-color-blue-200)',
    '--sl-color-primary-200': 'var(--sl-color-blue-300)',
    '--sl-color-primary-300': 'var(--sl-color-blue-400)',
    '--sl-color-primary-400': 'var(--sl-color-blue-500)',
    '--sl-color-primary-500': 'var(--sl-color-blue-600)',
    '--sl-color-primary-600': 'var(--sl-color-blue-700)',
    '--sl-color-primary-700': 'var(--sl-color-blue-800)',
    '--sl-color-primary-800': 'var(--sl-color-blue-900)',
    '--sl-color-primary-900': 'var(--sl-color-blue-950)',
    '--sl-color-primary-950': 'var(--sl-color-blue-950)',
    '--sl-input-height-small': '1.75rem',
    '--sl-input-height-medium': '2.25rem',
    '--sl-input-font-size-medium': 'var(--sl-font-size-small)',
    '--sl-button-font-size-medium': 'var(--sl-font-size-small)',
    '--sl-border-radius-medium': '3px',
    '--sl-focus-ring-width': '2px',
    '--sl-focus-ring-color': 'color-mix(in srgb, var(--band) 60%, transparent)',
    '--sl-tooltip-background-color': 'var(--band)',
    '--sl-tooltip-color': 'var(--band-ink)',
    '--sl-tooltip-font-size': 'var(--sl-font-size-x-small)',
};
