import { afterEach, describe, expect, it, vi } from 'vitest';
import '../src/index.ts';
import type { LitElement } from 'lit';

/** One press element as an app writes it, with the press's label and the event it fires. */
interface Case {
  readonly name: string;
  readonly markup: (attrs: string) => string;
  readonly label: string;
  /** The word it shows, which is then its name; the label is still its tooltip. */
  readonly word?: string;
  readonly event: string;
  /** The attributes that disable it with a reason, if it can be. */
  readonly reason?: (why: string) => string;
  /** The attributes that disable it with no reason, if it can be. */
  readonly disabled?: string;
}

const command: Case = {
  name: 'look-command',
  markup: (attrs) => `<look-command icon="floppy" label="Save" ${attrs}></look-command>`,
  label: 'Save',
  event: 'look-press',
  reason: (why) => `disabled reason="${why}"`,
  disabled: 'disabled',
};

const bandPress: Case = {
  name: 'look-band-press',
  markup: (attrs) => `<look-band-press icon="github" label="Source" ${attrs}></look-band-press>`,
  label: 'Source',
  event: 'look-press',
  disabled: 'disabled',
};

const commandWord: Case = {
  name: 'look-command word',
  markup: (attrs) => `<look-command word="HOLD" label="Hold every train" ${attrs}></look-command>`,
  label: 'Hold every train',
  word: 'HOLD',
  event: 'look-press',
  reason: (why) => `disabled reason="${why}"`,
  disabled: 'disabled',
};

const bandWord: Case = {
  name: 'look-band-press word',
  markup: (attrs) => `<look-band-press word="GO" label="Start the run" ${attrs}></look-band-press>`,
  label: 'Start the run',
  word: 'GO',
  event: 'look-press',
  disabled: 'disabled',
};

const gear: Case = {
  name: 'look-gear',
  markup: (attrs) => `<look-gear ${attrs}></look-gear>`,
  label: 'Settings',
  event: 'look-press',
};

const powerToggle: Case = {
  name: 'look-power toggle',
  markup: (attrs) => `<look-power state="on" ${attrs}></look-power>`,
  label: 'Track power is on; turn it off',
  event: 'look-power',
  reason: (why) => `toggle-reason="${why}"`,
};

const powerStop: Case = {
  name: 'look-power stop',
  markup: (attrs) => `<look-power state="on" ${attrs}></look-power>`,
  label: 'Stop every train',
  event: 'look-power',
  reason: (why) => `reason="${why}"`,
};

async function mount({ markup }: Case, attrs = '') {
  document.body.innerHTML = markup(attrs);
  const el = document.body.firstElementChild as LitElement;
  await el.updateComplete;
  return el;
}

/** The button a person finds by its name: its aria-label, or else its text. */
function named(el: Element, name: string) {
  const buttons = [...el.shadowRoot!.querySelectorAll('button')];
  const button = buttons.find((b) => (b.getAttribute('aria-label') ?? b.textContent!.trim()) === name);
  if (!button) throw new Error(`no button named ${name}`);
  return button;
}

const tooltip = (button: Element) => button.closest('sl-tooltip')!.getAttribute('content');

function listen(el: Element, event: string) {
  const seen = vi.fn();
  el.addEventListener(event, seen);
  return seen;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe.each([command, commandWord, bandPress, bandWord, gear, powerToggle, powerStop])('$name', (c) => {
  it('is a button named by its label, with the label as its tooltip, and fires when pressed', async () => {
    const el = await mount(c);
    const seen = listen(el, c.event);
    const button = named(el, c.word ?? c.label);
    expect(tooltip(button)).toBe(c.label);
    expect(button.hasAttribute('aria-disabled')).toBe(false);
    expect(button.hasAttribute('aria-pressed')).toBe(false);
    button.click();
    expect(seen).toHaveBeenCalledOnce();
  });
});

describe.each([command, commandWord, powerToggle, powerStop])('$name disabled with a reason', (c) => {
  it('stays focusable, says why in its tooltip and to a screen reader, and fires nothing', async () => {
    const el = await mount(c, c.reason!('Calibrate first.'));
    const seen = listen(el, c.event);
    const button = named(el, c.word ?? c.label);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(tooltip(button)).toBe('Calibrate first.');
    expect(button.getAttribute('aria-description')).toBe('Calibrate first.');
    button.click();
    expect(seen).not.toHaveBeenCalled();
  });
});

describe.each([command, commandWord, bandPress, bandWord])('$name disabled with no reason', (c) => {
  it('stays focusable, keeps its label as its tooltip, and fires nothing', async () => {
    const el = await mount(c, c.disabled!);
    const seen = listen(el, c.event);
    const button = named(el, c.word ?? c.label);
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(tooltip(button)).toBe(c.label);
    button.click();
    expect(seen).not.toHaveBeenCalled();
  });
});

describe('look-command', () => {
  it('carries the Shift key in look-press', async () => {
    const el = await mount(command);
    const seen = listen(el, 'look-press');
    named(el, 'Save').dispatchEvent(new MouseEvent('click', { shiftKey: true, bubbles: true }));
    expect(seen.mock.calls[0]![0].detail).toEqual({ shiftKey: true });
  });

  it('shows its key after the label in the tooltip', async () => {
    const el = await mount(command, 'key="Mod+S"');
    expect(tooltip(named(el, 'Save'))).toMatch(/^Save {2}(⌘S|Ctrl\+S)$/);
  });

  it('ignores a reason while enabled', async () => {
    const el = await mount(command, 'reason="Calibrate first."');
    expect(tooltip(named(el, 'Save'))).toBe('Save');
  });

  it('hoists its tooltip so the rail does not clip it', async () => {
    const el = await mount(command);
    expect(named(el, 'Save').closest('sl-tooltip')!.hasAttribute('hoist')).toBe(true);
  });

  it('marks a pressed command for a screen reader, and unmarks it', async () => {
    const el = (await mount(command, 'pressed')) as HTMLElementTagNameMap['look-command'];
    expect(named(el, 'Save').getAttribute('aria-pressed')).toBe('true');
    el.pressed = false;
    await el.updateComplete;
    expect(named(el, 'Save').hasAttribute('aria-pressed')).toBe(false);
  });
});

describe.each([command, commandWord, bandPress, bandWord, gear])('$name as one press', (c) => {
  it('presses its button when the app clicks it, and not when disabled', async () => {
    const el = await mount(c);
    const seen = listen(el, c.event);
    el.click();
    expect(seen).toHaveBeenCalledOnce();
    if (!c.disabled) return;
    el.setAttribute('disabled', '');
    await el.updateComplete;
    el.click();
    expect(seen).toHaveBeenCalledOnce();
  });
});
