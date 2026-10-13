// PROTOTYPE. Pieces every variant draws with, styled as occupancy's chrome
// is today (rr-header, rr-toolbar, rr-tool-palette, look.ts).
import { LitElement, css, html, nothing } from "lit";
import type { BandItem, Command, Group, View } from "./data.js";

export const pick = (el: HTMLElement, view: string) =>
  el.dispatchEvent(new CustomEvent("pick", { detail: view, bubbles: true, composed: true }));

/** occupancy's band: 60px, shadow, 1.25rem title, 1.5rem icon buttons. */
export const bandStyles = css`
  .band {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 60px;
    padding: 0 1rem;
    flex-shrink: 0;
    background: var(--band);
    color: var(--band-ink);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
    box-sizing: border-box;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;
  }
  .right {
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .about {
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .about small {
    font-weight: 400;
    opacity: 0.75;
    font-size: 0.8em;
    margin-left: 0.5rem;
  }
  .band sl-icon-button {
    font-size: 1.5rem;
    color: var(--band-ink);
  }
  .band sl-icon-button::part(base):hover {
    color: rgba(255, 255, 255, 0.7);
  }
  .quiet {
    opacity: 0.75;
  }
  .chip {
    background: var(--stop);
    color: var(--stop-ink);
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }
  .dot {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
  }
  .dot::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    border: 2px solid var(--band-ink);
    background: var(--rail-group);
  }
  .presses {
    display: flex;
    gap: 0.3rem;
  }
  .press {
    font: inherit;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    color: var(--band-ink);
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 4px;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
  }
  .press:hover {
    background: rgba(255, 255, 255, 0.18);
  }
  .press.at {
    background: rgba(255, 255, 255, 0.22);
    font-weight: 600;
  }
  .press.stop {
    border-color: var(--stop);
  }
  .stopchip {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    background: var(--stop);
    color: var(--stop-ink);
    border: none;
    border-radius: 4px;
    padding: 0.45rem 0.7rem;
    cursor: pointer;
  }
  .band sl-icon-button.stop {
    font-size: 1.9rem;
  }
  .band sl-icon-button.stop::part(base),
  .band sl-icon-button.stop::part(base):hover {
    color: #ef4444;
  }
`;

export function bandRight(items: BandItem[]) {
  return items.map((item) => {
    switch (item.kind) {
      case "text":
        return html`<span class=${item.quiet ? "quiet" : ""}>${item.text}</span>`;
      case "chip":
        return html`<span class="chip">${item.text}</span>`;
      case "dot":
        return html`<span class="dot">${item.text}</span>`;
      case "gear":
        return html`<sl-tooltip content="Settings"
          ><sl-icon-button name="gear" label="Settings"></sl-icon-button
        ></sl-tooltip>`;
      case "power":
        return html`<proto-power ?on=${item.on}></proto-power>`;
      case "stop":
        return html`<sl-tooltip content="Stop every train"
          ><sl-icon-button class="stop" name="sign-stop-fill" label="Stop"></sl-icon-button
        ></sl-tooltip>`;
      case "presses":
        return html`<span class="presses"
          >${item.items.map(
            (p) =>
              html`<button class="press ${p === item.at ? "at" : ""} ${p === "STOP" ? "stop" : ""}">
                ${p}
              </button>`,
          )}</span
        >`;
    }
  });
}

/** Track power: one toggle, the power glyph green when on, dimmed when off. */
export class ProtoPower extends LitElement {
  static properties = { on: { type: Boolean, reflect: true } };
  on = false;
  static styles = css`
    sl-icon-button {
      font-size: 1.5rem;
      transition: transform 0.1s;
    }
    sl-icon-button:hover {
      transform: scale(1.1);
    }
    sl-icon-button::part(base) {
      color: rgba(255, 255, 255, 0.55);
    }
    :host([on]) sl-icon-button::part(base) {
      color: #4ade80;
    }
  `;
  render() {
    const label = this.on ? "Track power is on; turn it off" : "Track power is off; turn it on";
    return html`<sl-tooltip content=${label}
      ><sl-icon-button name="power" label=${label} @click=${() => (this.on = !this.on)}></sl-icon-button
    ></sl-tooltip>`;
  }
}
customElements.define("proto-power", ProtoPower);

/**
 * occupancy's rail: 78px, shadow, groups on --rail-group with radius 8,
 * 2.1em icons, hover scale, active at white .22. Below 640px window height
 * it turns into a strip, as occupancy's compactStripStyles does.
 */
export class ProtoRail extends LitElement {
  static properties = {
    groups: { attribute: false },
    views: { attribute: false },
    current: {},
    words: { type: Boolean },
    press: {},
  };
  groups: Group[] = [];
  /** When set, the views are the rail's first group. */
  views: View[] | null = null;
  current = "";
  /** Show each view's word under its icon. */
  words = false;
  press = "";

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5em;
      padding: 0.6em 0.3em;
      width: 78px;
      box-sizing: border-box;
      flex-shrink: 0;
      background: var(--rail);
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
      overflow-y: auto;
      user-select: none;
      z-index: 50;
    }
    .group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.45em;
      padding: 0.35em 0;
      width: calc(100% - 8px);
      background: var(--rail-group);
      border-radius: 8px;
    }
    .group.views {
      background: rgba(0, 0, 0, 0.25);
    }
    sl-icon-button {
      font-size: 2.1em;
      color: white;
      transition: transform 0.1s;
    }
    sl-icon-button::part(base) {
      color: white;
      justify-content: center;
      min-width: var(--rail-button);
      min-height: var(--rail-button);
    }
    sl-icon-button::part(base):hover {
      color: rgba(255, 255, 255, 0.7);
    }
    sl-icon-button:hover {
      transform: scale(1.1);
    }
    sl-icon-button.active::part(base) {
      background: rgba(255, 255, 255, 0.22);
      border-radius: 8px;
    }
    sl-icon-button[disabled] {
      opacity: 0.35;
    }
    sl-icon-button[disabled]:hover {
      transform: none;
    }
    .worded {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.1em;
      padding: 0.25em 0;
      width: 100%;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      font-size: 0.7rem;
    }
    .worded sl-icon {
      font-size: 1.75rem;
      transition: transform 0.1s;
    }
    .worded:hover sl-icon {
      transform: scale(1.1);
    }
    .worded:hover {
      color: rgba(255, 255, 255, 0.7);
    }
    .worded.active {
      background: rgba(255, 255, 255, 0.22);
    }
    .press {
      margin-top: auto;
      width: calc(100% - 8px);
      font: inherit;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: white;
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      padding: 0.5rem 0;
      cursor: pointer;
    }
    @media (max-height: 640px) {
      :host {
        flex-direction: row;
        width: auto;
        height: auto;
        gap: 0.75em;
        padding: 0.4em 0.5em;
        overflow-x: auto;
        overflow-y: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
      .group {
        flex-direction: row;
        width: auto;
        padding: 0 0.35em;
      }
      sl-icon-button {
        font-size: 1.6em;
      }
      .worded {
        width: auto;
        padding: 0.2em 0.5em;
      }
      .press {
        margin: 0 0 0 auto;
        width: auto;
        padding: 0.4rem 0.8rem;
      }
    }
  `;

  private button(c: Command) {
    const tip = c.key ? `${c.label}  ${c.key}` : c.label;
    return html`<sl-tooltip content=${tip} placement="right"
      ><sl-icon-button
        name=${c.icon}
        label=${c.label}
        class=${c.active ? "active" : ""}
        ?disabled=${!!c.disabled}
      ></sl-icon-button
    ></sl-tooltip>`;
  }

  private viewButton(v: View) {
    const active = v.id === this.current;
    if (this.words)
      return html`<div class="worded ${active ? "active" : ""}" @click=${() => pick(this, v.id)}>
        <sl-icon name=${v.icon}></sl-icon>${v.label}
      </div>`;
    return html`<sl-tooltip content=${v.label} placement="right"
      ><sl-icon-button
        name=${v.icon}
        label=${v.label}
        class=${active ? "active" : ""}
        @click=${() => pick(this, v.id)}
      ></sl-icon-button
    ></sl-tooltip>`;
  }

  render() {
    return html`
      ${this.views
        ? html`<div class="group views">${this.views.map((v) => this.viewButton(v))}</div>`
        : nothing}
      ${this.groups.map(
        (g) => html`<div class="group" aria-label=${g.name}>${g.items.map((c) => this.button(c))}</div>`,
      )}
      ${this.press ? html`<button class="press">${this.press}</button>` : nothing}
    `;
  }
}
customElements.define("proto-rail", ProtoRail);

/** A stand-in for the view's content, enough to judge density. */
export class ProtoWork extends LitElement {
  static properties = { view: { attribute: false }, ui: {} };
  view!: View;
  ui = "";
  static styles = css`
    :host {
      flex: 1;
      min-width: 0;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--sl-color-neutral-0);
      color: var(--sl-color-neutral-500);
      background-image: radial-gradient(var(--sl-color-neutral-200) 1px, transparent 1px);
      background-size: 24px 24px;
    }
    .label {
      font-size: 1.5rem;
      text-align: center;
    }
    .camera {
      width: min(90%, 900px);
      aspect-ratio: 16 / 9;
      background: #222;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #888;
    }
    .throttle {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: var(--sl-color-neutral-700);
    }
    .throttle sl-range {
      width: 260px;
      transform: rotate(-90deg);
      margin: 120px 0;
    }
  `;
  render() {
    if (this.view.id === "live")
      return html`<div class="camera">live camera frame</div>`;
    if (this.view.id === "throttle")
      return html`<div class="throttle">
        <strong>BR 218 · 42 km/h</strong><sl-range value="40"></sl-range
        ><sl-button-group><sl-button>Reverse</sl-button><sl-button>Forward</sl-button></sl-button-group>
      </div>`;
    return html`<div class="label">${this.ui} · ${this.view.label}<br /><small>work pane</small></div>`;
  }
}
customElements.define("proto-work", ProtoWork);
