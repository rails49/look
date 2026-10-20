import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NARROW_WIDTH_PX } from '../src/index.ts';
import type { Window } from 'happy-dom';
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

const setViewport = (width: number, height: number) =>
  (window as unknown as Window).happyDOM.setViewport({ width, height });

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

  it('sets its box inside its own width, so its text is not cut short', async () => {
    const about = await mount('<look-about name="otira" pressable></look-about>', 'look-about');
    expect(getComputedStyle(inner(about, '.about')).marginLeft).not.toMatch(/^-/);
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

  it('draws the UI name in the same type as what the UI is about', async () => {
    const band = await mount('<look-band ui="control"><look-about name="otira"></look-about></look-band>', 'look-band');
    const type = (el: Element) => {
      const style = getComputedStyle(el);
      return [style.fontSize, style.fontWeight];
    };
    expect(type(inner(band, '.ui'))).toEqual(type(inner(document.querySelector('look-about')!, '.about')));
  });

  it('draws the mark alone with no ui', async () => {
    const band = await mount('<look-band></look-band>', 'look-band');
    expect(inner(band, 'a.mark')).not.toBeNull();
    expect(inner(band, '.ui')).toBeNull();
  });

  it("draws the UI's items, track power, the gear, then Help at the far right", async () => {
    const band = await mount('<look-band ui="control"></look-band>', 'look-band');
    const right = ['slot:not([name])', 'slot[name="power"]', 'slot[name="gear"]', '.help'].map((s) => inner(band, s));
    for (let i = 1; i < right.length; i++) {
      expect(right[i - 1]!.compareDocumentPosition(right[i]!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    expect(inner(band, 'nav').lastElementChild!.lastElementChild).toBe(inner(band, '.help'));
  });

  const help = async (markup: string) => {
    const band = await mount(markup, 'look-band');
    const tip = inner(band, '.help');
    const link = tip.querySelector('a')!;
    return {
      link: ['href', 'target', 'rel', 'aria-label'].map((a) => link.getAttribute(a)),
      tip: [tip.getAttribute('content'), tip.getAttribute('placement')],
      icon: link.querySelector('sl-icon')!.getAttribute('name'),
    };
  };

  it("links Help to the UI's repository in a new tab", async () => {
    expect(await help('<look-band ui="control"></look-band>')).toEqual({
      link: ['https://github.com/rails49/control', '_blank', 'noopener', 'Help'],
      tip: ['Help', 'bottom'],
      icon: 'question-circle',
    });
  });

  it('links Help to rails49 with no ui', async () => {
    expect((await help('<look-band></look-band>')).link[0]).toBe('https://github.com/rails49');
  });

  it('links Help to the help address', async () => {
    const markup = '<look-band ui="control" help="https://rails49.org/control/docs"></look-band>';
    expect((await help(markup)).link[0]).toBe('https://rails49.org/control/docs');
  });
});

describe('where the band does not fit', () => {
  // happy-dom lays nothing out and observes no resize, so the test gives the
  // band its width and calls the observer. The mark and track power take
  // 140px, and what the UI is about 60px until it is cut; the UI name, Help
  // and the gear take theirs while they show.
  const WIDTHS = { ui: 70, help: 40, gear: 40 };
  let resized: () => void;

  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          resized = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  const narrowing = async (ui: string) => {
    const band = await mount(
      `<look-band ui="${ui}"><look-about name="otira"></look-about><look-reading>3 trains</look-reading><look-power></look-power><look-gear></look-gear></look-band>`,
      'look-band',
    );
    const nav = inner(band, 'nav');
    const parts = { ui: inner(band, '.ui'), help: inner(band, '.help'), gear: inner(band, 'slot[name="gear"]') };
    // happy-dom applies no ::slotted rule, so the test reads the band's state.
    const cut = () => nav.classList.contains('cut');
    const shown = () =>
      (Object.keys(parts) as (keyof typeof parts)[]).filter(
        (k) => parts[k] && getComputedStyle(parts[k]).display !== 'none',
      );
    let width = 0;
    Object.defineProperty(nav, 'clientWidth', { get: () => width });
    Object.defineProperty(nav, 'scrollWidth', {
      get: () => {
        const rest = shown().reduce((sum, k) => sum + WIDTHS[k], 140);
        return cut() ? Math.max(rest, width) : rest + 60;
      },
    });
    return (w: number) => {
      width = w;
      resized();
      return cut() ? [...shown(), 'about cut'] : shown();
    };
  };

  it('drops the UI name, then Help, then the gear, only as far as it must', async () => {
    const at = await narrowing('control');
    expect(at(400)).toEqual(['ui', 'help', 'gear']);
    expect(at(350)).toEqual(['ui', 'help', 'gear']);
    expect(at(300)).toEqual(['help', 'gear']);
    expect(at(250)).toEqual(['gear']);
    expect(at(200)).toEqual([]);
  });

  it('cuts what the UI is about only once the gear is gone', async () => {
    const at = await narrowing('control');
    expect(at(150)).toEqual(['about cut']);
    expect(at(400)).toEqual(['ui', 'help', 'gear']);
  });

  it('shows them again as the band widens', async () => {
    const at = await narrowing('control');
    at(150);
    expect(at(300)).toEqual(['help', 'gear']);
    expect(at(400)).toEqual(['ui', 'help', 'gear']);
  });

  it('drops Help first where there is no UI name', async () => {
    const at = await narrowing('');
    expect(at(270)).toEqual(['gear']);
  });
});

describe('a narrow band', () => {
  const cutShort = (el: Element) => {
    const style = getComputedStyle(el);
    return [style.minWidth, style.overflow, style.textOverflow, style.whiteSpace];
  };
  const shrink = (el: Element) => getComputedStyle(el).flexShrink;

  it('cuts status text short', async () => {
    const band = await mount(
      `<look-band ui="dccex">
        <look-reading>no railroad loaded</look-reading>
        <look-chip>station not reachable</look-chip>
        <look-dot state="up">v5.6.4-rails49.9</look-dot>
      </look-band>`,
      'look-band',
    );
    const short = ['0', 'hidden', 'ellipsis', 'nowrap'];
    expect(cutShort(band.querySelector('look-reading')!)).toEqual(short);
    expect(cutShort(band.querySelector('look-chip')!)).toEqual(short);
    expect(cutShort(inner(band.querySelector('look-dot')!, '.text'))).toEqual(short);
  });

  it('keeps the dot whole', async () => {
    const dot = await mount('<look-dot state="up">v5.6.4-rails49.9</look-dot>', 'look-dot');
    expect(shrink(inner(dot, '.dot'))).toBe('0');
    expect(getComputedStyle(dot).minWidth).toBe(getComputedStyle(inner(dot, '.dot')).width);
  });

  it('leaves no room for a name on a dot without one', async () => {
    const dot = await mount('<look-dot state="up"></look-dot>', 'look-dot');
    expect(getComputedStyle(inner(dot, '.text')).display).toBe('none');
  });

  it('keeps the mark, the UI name, a band press, the gear and track power whole', async () => {
    const band = await mount('<look-band ui="dccex"><look-band-press word="HOLD"></look-band-press></look-band>', 'look-band');
    const press = document.querySelector('look-band-press')!;
    expect([shrink(inner(band, '.lead')), shrink(press), shrink(inner(band, '.tail'))]).toEqual(['0', '0', '0']);
  });

  it('lays the status items out beside the mark, the gear and track power', async () => {
    const band = await mount('<look-band ui="dccex"></look-band>', 'look-band');
    const parents = ['.lead', 'slot:not([name])', '.tail'].map((s) => inner(band, s).parentElement);
    expect(parents).toEqual([inner(band, 'nav'), inner(band, 'nav'), inner(band, 'nav')]);
  });
});

describe('the strip', () => {
  const lying = async (width: number, height: number) => {
    setViewport(width, height);
    const shell = await mount(
      `<look-shell>
        <look-rail><look-view name="run"></look-view><look-group><look-command word="GO"></look-command></look-group></look-rail>
      </look-shell>`,
      'look-shell',
    );
    const row = (el: Element) => getComputedStyle(el).flexDirection === 'row';
    const view = document.querySelector('look-view')!;
    const command = document.querySelector('look-command')!;
    return [
      getComputedStyle(inner(shell, '.body')).flexDirection === 'column',
      row(document.querySelector('look-rail')!),
      row(document.querySelector('look-group')!),
      getComputedStyle(view).width === 'auto',
      getComputedStyle(command).width === 'auto',
    ];
  };

  afterEach(() => setViewport(1024, 768));

  it('lies along the top on an upright phone', async () => {
    expect(await lying(390, 844)).toEqual([true, true, true, true, true]);
  });

  it('lies along the top on a phone held sideways', async () => {
    expect(await lying(844, 390)).toEqual([true, true, true, true, true]);
  });

  it('stands down the left on a window wide and tall enough', async () => {
    expect(await lying(1024, 768)).toEqual([false, false, false, false, false]);
  });

  it('turns at the width the band draws the square mark', async () => {
    expect(NARROW_WIDTH_PX).toBe(600);
    expect(await lying(NARROW_WIDTH_PX, 844)).toEqual([true, true, true, true, true]);
    expect(await lying(NARROW_WIDTH_PX + 1, 844)).toEqual([false, false, false, false, false]);
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
