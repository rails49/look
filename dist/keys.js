const isApple = () => /Mac|iPhone|iPad/.test(globalThis.navigator?.platform ?? '');
const APPLE = { Mod: '⌘', Shift: '⇧', Alt: '⌥', Ctrl: '⌃' };
/**
 * A key as a tooltip shows it: `Mod+Z` reads `⌘Z` on Apple and `Ctrl+Z`
 * elsewhere, `Shift+Mod+Z` reads `⇧⌘Z` and `Ctrl+Shift+Z`.
 */
export function keyLabel(key, apple = isApple()) {
    const last = key.endsWith('+') ? '+' : key.slice(key.lastIndexOf('+') + 1);
    const parts = [...key.slice(0, key.length - last.length).split('+').filter(Boolean), last];
    if (apple)
        return parts.map((p) => APPLE[p] ?? p).join('');
    const order = ['Mod', 'Ctrl', 'Alt', 'Shift'];
    const mods = parts.filter((p) => order.includes(p)).sort((a, b) => order.indexOf(a) - order.indexOf(b));
    const rest = parts.filter((p) => !order.includes(p));
    return [...new Set(mods.map((p) => (p === 'Mod' ? 'Ctrl' : p))), ...rest].join('+');
}
/** A tooltip: the label, then the key after two spaces. */
export const tip = (label, key) => (key ? `${label}  ${keyLabel(key)}` : label);
