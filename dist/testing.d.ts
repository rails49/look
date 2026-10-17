import type { LookBandPress } from './look-band-press.ts';
import type { LookCommand } from './look-command.ts';
import type { LookGear } from './look-gear.ts';
import type { LookPower } from './look-power.ts';
import type { LookView } from './look-view.ts';
/** Which of `look-power`'s two presses: the power toggle or the stop sign. */
export type PowerPress = 'toggle' | 'stop';
/**
 * Presses a look element as a person would: a `click` on the button it draws,
 * bubbling, composed and carrying `init`. A disabled press fires nothing.
 * Await the element's `updateComplete` first.
 */
export declare function press<E extends LookCommand | LookBandPress | LookGear | LookView>(el: E & (E extends LookPower ? never : unknown), init?: MouseEventInit): void;
export declare function press(el: LookPower, which: PowerPress, init?: MouseEventInit): void;
