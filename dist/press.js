import { css, html, nothing } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { libraryOf } from "./icons.js";
import { tip } from "./keys.js";
/** A press in the chrome: a button inside its tooltip. */
export function press(p) {
    const why = p.disabled ? p.reason : '';
    return html `<sl-tooltip content=${why || tip(p.label, p.key ?? '')} placement=${p.placement} hoist>
    <button
      class="${p.word ? 'word' : 'icon'} ${p.part ?? ''}"
      aria-label=${p.word ? nothing : p.label}
      aria-disabled=${p.disabled ? 'true' : nothing}
      aria-description=${why || nothing}
      aria-pressed=${p.pressed ? 'true' : nothing}
      @click=${(e) => p.disabled || p.onPress(e)}
    >
      ${p.word || html `<sl-icon name=${p.icon} library=${libraryOf(p.icon)}></sl-icon>`}
    </button>
  </sl-tooltip>`;
}
/**
 * Put after `chromeTokens` in an element that draws presses. Every rule is in
 * `:where()`, so the element's own rules win: its sizes, layout and colours.
 */
export const pressStyles = css `
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
