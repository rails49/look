const POWER_PRESS = { toggle: '.power', stop: '.stop' };
const ONE_PRESS = ['look-command', 'look-band-press', 'look-gear', 'look-view'];
export function press(el, which, init) {
    const power = el.localName === 'look-power';
    if (!power && !ONE_PRESS.includes(el.localName))
        throw new Error(`${el.localName} is not a press`);
    if (power !== (typeof which === 'string')) {
        throw new Error(power ? "press() on look-power needs 'toggle' or 'stop'" : `${el.localName} has one press`);
    }
    const selector = typeof which === 'string' ? POWER_PRESS[which] : 'button';
    const button = el.shadowRoot?.querySelector(selector);
    if (!button)
        throw new Error(`${el.localName} draws no ${selector}; is it rendered?`);
    const options = typeof which === 'string' ? init : which;
    button.dispatchEvent(new MouseEvent('click', { ...options, bubbles: true, composed: true, cancelable: true }));
}
