/// <reference types="@vitest/browser/providers/playwright" />
import { userEvent } from '@vitest/browser/context';
import { afterEach, describe, expect, it } from 'vitest';
import '../dist/look.css';
import '../src/index.ts';
import type { LookGap } from '../src/index.ts';

async function gap(axis: 'x' | 'y') {
  document.body.innerHTML = `<look-gap axis="${axis}"></look-gap>`;
  const el = document.querySelector('look-gap') as LookGap;
  await el.updateComplete;
  return el;
}

/** The page's primary colour, as a computed background. */
function primary() {
  const probe = document.createElement('div');
  probe.style.background = 'var(--sl-color-primary-600)';
  document.body.append(probe);
  const color = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return color;
}

const reach = (el: LookGap) => el.shadowRoot!.querySelector('div')!.getBoundingClientRect();

afterEach(() => {
  document.body.innerHTML = '';
});

describe('look-gap (#62)', () => {
  it('is 6px wide on axis x and 6px tall on axis y', async () => {
    expect((await gap('x')).getBoundingClientRect().width).toBe(6);
    expect((await gap('y')).getBoundingClientRect().height).toBe(6);
  });

  it('takes the press over an area wider than the gap', async () => {
    const x = await gap('x');
    expect(reach(x).width).toBeGreaterThan(x.getBoundingClientRect().width);
    const y = await gap('y');
    expect(reach(y).height).toBeGreaterThan(y.getBoundingClientRect().height);
  });

  it('is clear at rest and the primary colour on hover and while dragged', async () => {
    const el = await gap('y');
    expect(getComputedStyle(el).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(primary()).not.toBe('rgba(0, 0, 0, 0)');

    el.toggleAttribute('dragging', true);
    expect(getComputedStyle(el).backgroundColor).toBe(primary());
    el.removeAttribute('dragging');

    await userEvent.hover(el);
    expect(getComputedStyle(el).backgroundColor).toBe(primary());
  });
});
