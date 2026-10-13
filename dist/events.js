export function fire(el, type, detail) {
    el.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}
/** A press, with the Shift key a click or key press carried. */
export const firePress = (el, e) => fire(el, 'look-press', { shiftKey: e.shiftKey ?? false });
