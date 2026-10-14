import { afterEach, describe, expect, it, vi } from 'vitest';
import '../src/index.ts';
import type { LitElement } from 'lit';
import { libraryOf } from '../src/icons.ts';

async function mount<T extends Element = HTMLElement>(markup: string, selector: string): Promise<T> {
  document.body.innerHTML = markup;
  const all = [...document.body.querySelectorAll('*')] as LitElement[];
  await Promise.all(all.map((el) => el.updateComplete));
  return document.querySelector(selector) as T;
}

const inner = (el: Element, selector: string) => el.shadowRoot!.querySelector(selector) as HTMLElement;

afterEach(() => {
  document.body.innerHTML = '';
});

describe('placement', () => {
  it('puts each element in its slot with no slot attribute from the app', async () => {
    const shell = await mount(
      `<look-shell>
        <look-band><look-about name="otira"></look-about><look-reading>3 trains</look-reading><look-gear></look-gear><look-power></look-power></look-band>
        <look-rail><look-view name="run"></look-view><look-group></look-group></look-rail>
        <main>work</main>
      </look-shell>`,
      'look-shell',
    );
    const slotOf = (s: string) => document.querySelector(s)!.slot;
    expect([slotOf('look-band'), slotOf('look-rail'), slotOf('main')]).toEqual(['band', 'rail', '']);
    expect([slotOf('look-about'), slotOf('look-reading'), slotOf('look-gear'), slotOf('look-power')]).toEqual([
      'about',
      '',
      'gear',
      'power',
    ]);
    expect([slotOf('look-view'), slotOf('look-group')]).toEqual(['views', '']);
    expect(shell.shadowRoot).not.toBeNull();
  });

  it('keeps a slot the app wrote', async () => {
    await mount('<look-band><look-gear slot="about"></look-gear></look-band>', 'look-band');
    expect(document.querySelector('look-gear')!.slot).toBe('about');
  });
});

describe('presses', () => {
  it('fires look-press with the Shift key from a command, and nothing when disabled', async () => {
    const cmd = await mount('<look-command icon="floppy" label="Save" key="Mod+S"></look-command>', 'look-command');
    const seen = vi.fn();
    document.body.addEventListener('look-press', (e) => seen(e.target, e.detail));
    inner(cmd, 'sl-icon-button').dispatchEvent(new MouseEvent('click', { shiftKey: true, bubbles: true }));
    expect(seen).toHaveBeenCalledWith(cmd, { shiftKey: true });

    seen.mockClear();
    (cmd as unknown as { disabled: boolean }).disabled = true;
    await (cmd as unknown as LitElement).updateComplete;
    inner(cmd, 'sl-icon-button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(seen).not.toHaveBeenCalled();
  });

  it('shows the label and key in the tooltip', async () => {
    const cmd = await mount('<look-command icon="arrow-counterclockwise" label="Undo" key="Mod+Z"></look-command>', 'look-command');
    expect(inner(cmd, 'sl-tooltip').getAttribute('content')).toMatch(/^Undo {2}(⌘Z|Ctrl\+Z)$/);
  });

  it('draws a word command as a button', async () => {
    const cmd = await mount('<look-command word="HOLD" label="Hold every train"></look-command>', 'look-command');
    expect(inner(cmd, 'button').textContent!.trim()).toBe('HOLD');
  });

  it('keeps a disabled command with a reason hoverable, with the reason as its tooltip, and fires nothing', async () => {
    const cmd = await mount(
      '<look-command icon="car-front" label="Car" disabled reason="Calibrate first."></look-command>',
      'look-command',
    );
    const seen = vi.fn();
    cmd.addEventListener('look-press', seen);
    const button = inner(cmd, 'sl-icon-button');
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(button.classList.contains('off')).toBe(true);
    expect(inner(cmd, 'sl-tooltip').getAttribute('content')).toBe('Calibrate first.');
    button.click();
    expect(seen).not.toHaveBeenCalled();
  });

  it('ignores a reason on an enabled command', async () => {
    const cmd = await mount('<look-command icon="car-front" label="Car" reason="Calibrate first."></look-command>', 'look-command');
    expect(inner(cmd, 'sl-tooltip').getAttribute('content')).toBe('Car');
  });

  it('sets aria-pressed on the button inside an icon command', async () => {
    const cmd = await mount('<look-command icon="car-front" label="Car" pressed></look-command>', 'look-command');
    const button = () => inner(cmd, 'sl-icon-button').shadowRoot!.querySelector('button')!;
    await vi.waitFor(() => expect(button().getAttribute('aria-pressed')).toBe('true'));
    (cmd as unknown as { pressed: boolean }).pressed = false;
    await vi.waitFor(() => expect(button().hasAttribute('aria-pressed')).toBe(false));
  });

  it('fires look-press from the gear, a band press and a pressable about', async () => {
    const band = await mount(
      `<look-band>
        <look-about name="otira" pressable></look-about>
        <look-band-press word="GO"></look-band-press>
        <look-gear></look-gear>
      </look-band>`,
      'look-band',
    );
    const seen: string[] = [];
    band.addEventListener('look-press', (e) => seen.push((e.target as Element).localName));
    inner(document.querySelector('look-about')!, 'button').click();
    inner(document.querySelector('look-band-press')!, 'button').click();
    inner(document.querySelector('look-gear')!, 'sl-icon-button').click();
    expect(seen).toEqual(['look-about', 'look-band-press', 'look-gear']);
  });

  it('draws an about that is not pressable as text', async () => {
    const about = await mount('<look-about name="otira" detail="N scale"></look-about>', 'look-about');
    expect(inner(about, 'button')).toBeNull();
    expect(inner(about, '.about').textContent).toContain('N scale');
  });
});

describe('look-group', () => {
  it('is a group named by its label', async () => {
    const group = await mount('<look-group label="Edit"></look-group>', 'look-group');
    expect([group.getAttribute('role'), group.getAttribute('aria-label')]).toEqual(['group', 'Edit']);
  });
});

describe('views', () => {
  it('fires look-view with the name, and nothing for the current view', async () => {
    const rail = await mount(
      '<look-rail><look-view name="run" label="Run" current></look-view><look-view name="edit" label="Edit"></look-view></look-rail>',
      'look-rail',
    );
    const seen: string[] = [];
    rail.addEventListener('look-view', (e) => seen.push(e.detail.name));
    const [run, edit] = document.querySelectorAll('look-view');
    inner(run!, 'button').click();
    inner(edit!, 'button').click();
    expect(seen).toEqual(['edit']);
    expect(inner(run!, 'button').getAttribute('aria-current')).toBe('page');
  });

  it('hides the views group when there are no views', async () => {
    const rail = await mount('<look-rail><look-group></look-group></look-rail>', 'look-rail');
    await new Promise((r) => setTimeout(r));
    expect(inner(rail, '.views').hidden).toBe(true);
  });
});

describe('look-power', () => {
  const press = async (state: string, which: string, reason = '') => {
    const power = await mount(`<look-power state="${state}" reason="${reason}"></look-power>`, 'look-power');
    const seen: string[] = [];
    power.addEventListener('look-power', (e) => seen.push(e.detail.state));
    inner(power, which).click();
    return seen;
  };

  it('asks for off when on, and for on when off or stopped', async () => {
    expect(await press('on', '.power')).toEqual(['off']);
    expect(await press('off', '.power')).toEqual(['on']);
    expect(await press('stopped', '.power')).toEqual(['on']);
  });

  it('asks for on while draining, and keeps the stop sign live', async () => {
    expect(await press('draining', '.power')).toEqual(['on']);
    expect(await press('draining', '.stop')).toEqual(['stopped']);
    expect(inner(document.querySelector('look-power')!, 'sl-tooltip').getAttribute('content')).toMatch(/^Draining/);
  });

  it('asks for stopped from the stop sign', async () => {
    expect(await press('on', '.stop')).toEqual(['stopped']);
  });

  it('asks for nothing while a reason holds it, and shows the reason', async () => {
    expect(await press('on', '.power', 'no station')).toEqual([]);
    expect(await press('on', '.stop', 'no station')).toEqual([]);
    expect(inner(document.querySelector('look-power')!, 'sl-tooltip').getAttribute('content')).toBe('no station');
  });

  it('holds only the toggle for a toggle reason, and keeps the stop sign live', async () => {
    const power = await mount('<look-power state="off" toggle-reason="no station"></look-power>', 'look-power');
    const seen: string[] = [];
    power.addEventListener('look-power', (e) => seen.push(e.detail.state));
    inner(power, '.power').click();
    inner(power, '.stop').click();
    expect(seen).toEqual(['stopped']);
    const tips = [...power.shadowRoot!.querySelectorAll('sl-tooltip')].map((t) => t.getAttribute('content'));
    expect(tips).toEqual(['no station', 'Stop every train']);
  });
});

describe('look-dialog', () => {
  it('opens and closes, with the footer in the shell', async () => {
    const dialog = await mount(
      '<look-dialog label="Settings" size="small"><p>body</p><sl-button slot="footer">Close</sl-button></look-dialog>',
      'look-dialog',
    );
    const d = dialog as unknown as { show(): Promise<void>; hide(): Promise<void>; open: boolean };
    expect(d.open).toBe(false);
    await d.show();
    expect(d.open).toBe(true);
    await d.hide();
    expect(d.open).toBe(false);
    expect(inner(dialog, '.footer slot[name=footer]')).not.toBeNull();
  });

  it('opens from the open attribute', async () => {
    const dialog = await mount('<look-dialog label="Settings" open></look-dialog>', 'look-dialog');
    expect((inner(dialog, 'sl-dialog') as unknown as { open: boolean }).open).toBe(true);
  });

  it('turns open false when the person closes it, and not for a widget inside hiding', async () => {
    const dialog = await mount('<look-dialog label="Settings"><sl-input></sl-input></look-dialog>', 'look-dialog');
    const d = dialog as unknown as LitElement & { open: boolean };
    const shown = new Promise((r) => dialog.addEventListener('sl-after-show', r, { once: true }));
    d.open = true;
    await shown;

    document.querySelector('sl-input')!.dispatchEvent(new CustomEvent('sl-hide', { bubbles: true, composed: true }));
    expect(d.open).toBe(true);

    await (inner(dialog, 'sl-dialog') as unknown as { hide(): Promise<void> }).hide();
    await d.updateComplete;
    expect(dialog.hasAttribute('open')).toBe(false);
  });
});

describe('icons', () => {
  it('draws rails49 glyphs from the rails49 library and the rest from Bootstrap', () => {
    expect(libraryOf('throttle')).toBe('rails49');
    expect(libraryOf('rotate')).toBe('rails49');
    expect(libraryOf('floppy')).toBe('default');
  });
});
