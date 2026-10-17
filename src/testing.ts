// For an app's tests, at `@rails49/look/testing`; not in `.` or the bundle.
import type { LookBandPress } from './look-band-press.ts';
import type { LookCommand } from './look-command.ts';
import type { LookGear } from './look-gear.ts';
import type { LookPower } from './look-power.ts';
import type { LookView } from './look-view.ts';

/** Which of `look-power`'s two presses: the power toggle or the stop sign. */
export type PowerPress = 'toggle' | 'stop';

const POWER_PRESS: Record<PowerPress, string> = { toggle: '.power', stop: '.stop' };

/**
 * Presses a look element as a person would: a `click` on the button it draws,
 * bubbling, composed and carrying `init`. A disabled press fires nothing.
 * Await the element's `updateComplete` first.
 */
export function press(el: LookCommand | LookBandPress | LookGear | LookView, init?: MouseEventInit): void;
export function press(el: LookPower, which: PowerPress, init?: MouseEventInit): void;
export function press(el: HTMLElement, which?: PowerPress | MouseEventInit, init?: MouseEventInit) {
  const power = el.localName === 'look-power';
  if (power !== (typeof which === 'string')) {
    throw new Error(power ? "press() on look-power needs 'toggle' or 'stop'" : `${el.localName} has one press`);
  }
  const selector = typeof which === 'string' ? POWER_PRESS[which] : 'button';
  const button = el.shadowRoot?.querySelector(selector);
  if (!button) throw new Error(`${el.localName} draws no ${selector}; is it rendered?`);
  const options = typeof which === 'string' ? init : which;
  button.dispatchEvent(new MouseEvent('click', { ...options, bubbles: true, composed: true, cancelable: true }));
}
