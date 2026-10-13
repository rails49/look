// PROTOTYPE. Reads ?layer, ?scheme, ?ui, ?view and ?dialog; draws the
// chrome as decided (rail top with words), the work pane, and the bar.
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/checkbox/checkbox.js";
import "@shoelace-style/shoelace/dist/components/details/details.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import "@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js";
import "@shoelace-style/shoelace/dist/components/range/range.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/switch/switch.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { LitElement, css, html, nothing } from "lit";
import { bandRight, bandStyles } from "./chrome.js";
import { UIS } from "./data.js";
import { DIALOGS } from "./dialogs.js";
import { LAYERS, setLayer, type LayerKey, type Scheme } from "./layer.js";
import { occupancyToasts } from "./panes.js";

setBasePath("/node_modules/@shoelace-style/shoelace/dist");

const KEYS = Object.keys(LAYERS) as LayerKey[];
const SCHEMES: Scheme[] = ["os", "light", "dark"];

class ProtoPage extends LitElement {
  static properties = { params: { state: true } };
  params = new URLSearchParams(location.search);

  static styles = [
    bandStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .body {
        flex: 1;
        display: flex;
        min-height: 0;
      }
      @media (max-height: 640px) {
        .body {
          flex-direction: column;
        }
      }
      .bar {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.6rem;
        border-radius: 999px;
        background: #111;
        color: #fff;
        font: 13px/1.2 system-ui, sans-serif;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
        white-space: nowrap;
      }
      .bar button {
        font: inherit;
        color: inherit;
        background: #333;
        border: none;
        border-radius: 999px;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
      }
      .bar button.on {
        background: #f59e0b;
        color: #111;
      }
      .bar button[disabled] {
        opacity: 0.4;
        cursor: default;
      }
      .label {
        min-width: 13rem;
        text-align: center;
      }
      .sep {
        width: 1px;
        height: 1.2rem;
        background: #555;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    addEventListener("keydown", this.onKey);
    this.addEventListener("pick", (e) => this.set({ view: (e as CustomEvent<string>).detail }));
    this.addEventListener("dialog", (e) => this.set({ dialog: (e as CustomEvent<string>).detail }));
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.composedPath().some((t) => (t as HTMLElement).matches?.("input, textarea, [contenteditable]"))) return;
    if (e.key === "ArrowLeft") this.step(-1);
    if (e.key === "ArrowRight") this.step(1);
    const n = Number(e.key);
    if (n >= 1 && n <= UIS.length) this.set({ ui: UIS[n - 1]!.id, view: "", dialog: "" });
  };

  private get layer(): LayerKey {
    const v = this.params.get("layer") as LayerKey;
    return KEYS.includes(v) ? v : "A";
  }

  private get scheme(): Scheme {
    const s = this.params.get("scheme") as Scheme;
    return SCHEMES.includes(s) ? s : "os";
  }

  private step(d: number) {
    const i = KEYS.indexOf(this.layer);
    this.set({ layer: KEYS[(i + d + KEYS.length) % KEYS.length]! });
  }

  private set(change: Record<string, string>) {
    const p = new URLSearchParams(this.params);
    for (const [k, v] of Object.entries(change)) v ? p.set(k, v) : p.delete(k);
    history.replaceState(null, "", `?${p}`);
    this.params = p;
  }

  willUpdate() {
    setLayer(this.layer, this.scheme);
  }

  render() {
    const ui = UIS.find((u) => u.id === this.params.get("ui")) ?? UIS[0]!;
    const view = ui.views.find((v) => v.id === this.params.get("view")) ?? ui.views[0]!;
    const dialog = this.params.get("dialog") ?? "";
    const key = this.layer;
    const forced = LAYERS[key].dark;
    return html`
      <div class="band">
        <div class="left">
          <span class="about">${ui.about}${ui.aboutDetail ? html`<small>${ui.aboutDetail}</small>` : nothing}</span>
        </div>
        <div class="right">${bandRight(ui.bandRight)}</div>
      </div>
      <div class="body">
        <proto-rail
          .views=${ui.views}
          words
          current=${view.id}
          .groups=${view.rail}
          press=${view.press ?? ""}
        ></proto-rail>
        <proto-pane ui=${ui.id} view=${view.id}></proto-pane>
      </div>
      ${dialog ? html`<proto-dialog ui=${ui.id} name=${dialog}></proto-dialog>` : nothing}
      ${import.meta.env.DEV
        ? html`<div class="bar">
            <button @click=${() => this.step(-1)}>◀</button>
            <span class="label">${key} · ${LAYERS[key].label}</span>
            <button @click=${() => this.step(1)}>▶</button>
            <span class="sep"></span>
            ${SCHEMES.map(
              (s) => html`<button
                class=${!forced && s === this.scheme ? "on" : ""}
                ?disabled=${forced}
                @click=${() => this.set({ scheme: s === "os" ? "" : s })}
              >
                ${s}
              </button>`,
            )}
            <span class="sep"></span>
            ${UIS.map(
              (u) => html`<button
                class=${u.id === ui.id ? "on" : ""}
                @click=${() => this.set({ ui: u.id, view: "", dialog: "" })}
              >
                ${u.name}
              </button>`,
            )}
            <span class="sep"></span>
            ${DIALOGS[ui.id]!.map(
              (d) => html`<button
                class=${d.id === dialog ? "on" : ""}
                @click=${() => this.set({ dialog: d.id })}
              >
                ${d.label}
              </button>`,
            )}
            ${ui.id === "occupancy" ? html`<button @click=${occupancyToasts}>Toasts</button>` : nothing}
          </div>`
        : nothing}
    `;
  }
}
customElements.define("proto-page", ProtoPage);

