import type { LookGapMoveDetail } from './events.ts';
/** The edge of a box a size is measured from. */
export type Edge = 'left' | 'right' | 'top' | 'bottom';
/**
 * The size in CSS pixels of the part between the `from` edge of `box` and a
 * divider at the client point `at`: at least `least`, and at most what leaves
 * the other side `leaves` of the box's width or height. In a box too small for
 * both, `least` holds. The result is a whole number.
 */
export declare function dividerSizeAt(box: Pick<DOMRectReadOnly, 'left' | 'right' | 'top' | 'bottom' | 'width' | 'height'>, at: LookGapMoveDetail, from: Edge, limits: {
    least: number;
    leaves: number;
}): number;
/** The number this browser keeps under `key`; null where it keeps none or refuses the store. */
export declare function keptDivider(key: string): number | null;
/** Keeps `value` under `key` in this browser; does nothing where the browser refuses the store. */
export declare function keepDivider(key: string, value: number): void;
