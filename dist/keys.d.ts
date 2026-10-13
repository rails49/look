/**
 * A key as a tooltip shows it: `Mod+Z` reads `⌘Z` on Apple and `Ctrl+Z`
 * elsewhere, `Shift+Mod+Z` reads `⇧⌘Z` and `Ctrl+Shift+Z`.
 */
export declare function keyLabel(key: string, apple?: boolean): string;
/** A tooltip: the label, then the key after two spaces. */
export declare const tip: (label: string, key: string) => string;
