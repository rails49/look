import { afterEach, describe, expect, it, vi } from 'vitest';
import '../src/index.ts';
import type { LitElement } from 'lit';
import { libraryOf } from '../src/icons.ts';
import { press } from '../src/testing.ts';

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

describe('look-about', () => {
  it('fires look-press from a pressable about', async () => {
    const about = await mount('<look-about name="otira" pressable></look-about>', 'look-about');
    const seen = vi.fn();
    about.addEventListener('look-press', seen);
    inner(about, 'button').click();
    expect(seen).toHaveBeenCalledOnce();
  });

  it('draws an about that is not pressable as text', async () => {
    const about = await mount('<look-about name="otira" detail="N scale"></look-about>', 'look-about');
    expect(inner(about, 'button')).toBeNull();
    expect(inner(about, '.about').textContent).toContain('N scale');
  });
});

describe('look-band', () => {
  it('draws the mark as a link to rails49.org in a new tab', async () => {
    const band = await mount('<look-band ui="control"></look-band>', 'look-band');
    const mark = inner(band, 'a.mark');
    expect([mark.getAttribute('href'), mark.getAttribute('target'), mark.getAttribute('rel')]).toEqual([
      'https://rails49.org',
      '_blank',
      'noopener',
    ]);
    expect(mark.querySelectorAll('svg')).toHaveLength(2);
  });

  it('draws the UI name after the mark and ahead of the about slot', async () => {
    const band = await mount('<look-band ui="control"></look-band>', 'look-band');
    const ui = inner(band, '.ui');
    expect(ui.textContent).toBe('control');
    const about = inner(band, 'slot[name="about"]');
    expect(ui.compareDocumentPosition(about) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('draws the mark alone with no ui', async () => {
    const band = await mount('<look-band></look-band>', 'look-band');
    expect(inner(band, 'a.mark')).not.toBeNull();
    expect(inner(band, '.ui')).toBeNull();
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
    press(run!);
    press(edit!);
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
  const ask = async (state: string, which: 'toggle' | 'stop', reason = '') => {
    const power = await mount<HTMLElementTagNameMap['look-power']>(
      `<look-power state="${state}" reason="${reason}"></look-power>`,
      'look-power',
    );
    const seen: string[] = [];
    power.addEventListener('look-power', (e) => seen.push(e.detail.state));
    press(power, which);
    return seen;
  };

  it('asks for off when on, and for on when off or stopped', async () => {
    expect(await ask('on', 'toggle')).toEqual(['off']);
    expect(await ask('off', 'toggle')).toEqual(['on']);
    expect(await ask('stopped', 'toggle')).toEqual(['on']);
  });

  it('asks for on while draining, and keeps the stop sign live', async () => {
    expect(await ask('draining', 'toggle')).toEqual(['on']);
    expect(await ask('draining', 'stop')).toEqual(['stopped']);
    expect(inner(document.querySelector('look-power')!, 'sl-tooltip').getAttribute('content')).toMatch(/^Draining/);
  });

  it('asks for stopped from the stop sign', async () => {
    expect(await ask('on', 'stop')).toEqual(['stopped']);
  });

  it('asks for nothing while a reason disables it, and shows the reason', async () => {
    expect(await ask('on', 'toggle', 'no station')).toEqual([]);
    expect(await ask('on', 'stop', 'no station')).toEqual([]);
    expect(inner(document.querySelector('look-power')!, 'sl-tooltip').getAttribute('content')).toBe('no station');
  });

  it('disables only the toggle for a toggle reason, and keeps the stop sign live', async () => {
    const power = await mount<HTMLElementTagNameMap['look-power']>(
      '<look-power state="off" toggle-reason="no station"></look-power>',
      'look-power',
    );
    const seen: string[] = [];
    power.addEventListener('look-power', (e) => seen.push(e.detail.state));
    press(power, 'toggle');
    press(power, 'stop');
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
