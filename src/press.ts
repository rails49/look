import { css, html, nothing } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { libraryOf } from './icons.ts';
import { tip } from './keys.ts';

/** What a press is drawn from. */
export interface Press {
  readonly icon?: string;
  /** Shown in place of an icon, and then the button's name. */
  readonly word?: string;
  /** The button's name, or its tooltip alone when there is a word. */
  readonly label: string;
  /** Shown in the tooltip after the label. */
  readonly key?: string;
  /** Fires nothing; stays focusable, and its tooltip says why. */
  readonly disabled?: boolean;
  /** Why it is disabled: its tooltip, in place of the label. */
  readonly reason?: string;
  /** In force, such as the current tool. */
  readonly pressed?: boolean;
  readonly placement: 'right' | 'bottom';
  /** A class on the button, for the element's own CSS. */
  readonly part?: string;
  /** Called only when not disabled. */
  readonly onPress: (e: Event) => void;
}

/** A press in the chrome: a button inside its tooltip. */
export function press(p: Press) {
  const why = p.disabled ? p.reason : '';
  return html`<sl-tooltip content=${why || tip(p.label, p.key ?? '')} placement=${p.placement} hoist>
    <button
      class="${p.word ? 'word' : 'icon'} ${p.part ?? ''}"
      aria-label=${p.word ? nothing : p.label}
      aria-disabled=${p.disabled ? 'true' : nothing}
      aria-description=${why || nothing}
      aria-pressed=${p.pressed ? 'true' : nothing}
      @click=${(e: Event) => {
        if (!p.disabled) p.onPress(e);
      }}
    >
      ${p.word || html`<sl-icon name=${p.icon!} library=${libraryOf(p.icon!)}></sl-icon>`}
    </button>
  </sl-tooltip>`;
}

/**
 * Put after `chromeTokens` in an element that draws presses. Every rule is in
 * `:where()`, so the element's own rules win: its sizes, layout and colours.
 */
export const pressStyles = css`
  :where(button) {
    font: inherit;
    color: var(--band-ink);
    background: none;
    border: none;
    cursor: pointer;
  }

  :where(button:focus-visible) {
    outline: var(--sl-focus-ring-width, 2px) solid rgba(255, 255, 255, 0.7);
    outline-offset: 1px;
  }

  :where(.icon) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 8px;
    transition: transform 0.1s;
  }

  :where(.icon:hover, .icon:focus-visible) {
    color: rgba(255, 255, 255, 0.7);
  }

  :where(.icon:not([aria-disabled]):hover) {
    transform: scale(1.1);
  }

  :where(.word) {
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 6px;
  }

  :where(.word:hover, .word:focus-visible) {
    background: rgba(255, 255, 255, 0.18);
  }

  :where([aria-pressed='true']) {
    background: rgba(255, 255, 255, 0.22);
  }

  :where([aria-disabled]) {
    opacity: 0.35;
    cursor: default;
  }

  :where(.word[aria-disabled]) {
    background: none;
  }
`;
