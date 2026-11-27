/**
 * The size in CSS pixels of the part between the `from` edge of `box` and a
 * divider at the client point `at`. It is at least `least`, and at most the
 * box's width or height less `leaves`. In a box too small for both, `least`
 * holds. The result is a whole number.
 */
export function dividerSizeAt(box, at, from, limits) {
    const [wanted, room] = {
        left: [at.x - box.left, box.width],
        right: [box.right - at.x, box.width],
        top: [at.y - box.top, box.height],
        bottom: [box.bottom - at.y, box.height],
    }[from];
    return Math.round(Math.max(limits.least, Math.min(wanted, room - limits.leaves)));
}
/** The number this browser keeps under `key`; null where it keeps none, keeps something else, or refuses the store. */
export function keptDivider(key) {
    try {
        const kept = Number(localStorage.getItem(key) ?? NaN);
        return Number.isFinite(kept) ? kept : null;
    }
    catch {
        return null;
    }
}
/** Keeps `value` under `key` in this browser; does nothing where the browser refuses the store. */
export function keepDivider(key, value) {
    try {
        localStorage.setItem(key, String(value));
    }
    catch {
        // The size is not kept over a reload.
    }
}
