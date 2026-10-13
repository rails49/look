/**
 * Puts a package element in its parent's named slot, so an app declares the
 * band and rail as plain children and writes no `slot` attribute.
 */
export function place(el: HTMLElement, slot: string) {
  if (!el.slot) el.slot = slot;
}
