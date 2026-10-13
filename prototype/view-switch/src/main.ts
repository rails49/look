// PROTOTYPE. Reads ?variant, ?ui and ?view; draws the variant and the bar.
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/range/range.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { LitElement, css, html } from "lit";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import "./chrome.js";
import { UIS } from "./data.js";
import { VARIANTS, type VariantKey } from "./variants.js";

setBasePath("/node_modules/@shoelace-style/shoelace/dist");

const dark = matchMedia("(prefers-color-scheme: dark)");
const theme = () => document.documentElement.classList.toggle("sl-theme-dark", dark.matches);
dark.addEventListener("change", theme);
theme();

const KEYS = Object.keys(VARIANTS) as VariantKey[];

class ProtoPage extends LitElement {
  static properties = { params: { state: true } };
  params = new URLSearchParams(location.search);

  static styles = css`
    .bar {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
    .label {
      min-width: 13rem;
      text-align: center;
    }
    .sep {
      width: 1px;
      height: 1.2rem;
      background: #555;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    addEventListener("keydown", this.onKey);
    this.addEventListener("pick", (e) => this.set({ view: (e as CustomEvent<string>).detail }));
  }

  private onKey = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest?.("input, textarea, [contenteditable]")) return;
    if (e.key === "ArrowLeft") this.step(-1);
    if (e.key === "ArrowRight") this.step(1);
    const n = Number(e.key);
    if (n >= 1 && n <= UIS.length) this.set({ ui: UIS[n - 1]!.id, view: "" });
  };

  private get variant(): VariantKey {
    const v = this.params.get("variant") as VariantKey;
    return KEYS.includes(v) ? v : "A";
  }

  private step(d: number) {
    const i = KEYS.indexOf(this.variant);
    this.set({ variant: KEYS[(i + d + KEYS.length) % KEYS.length]! });
  }

  private set(change: Record<string, string>) {
    const p = new URLSearchParams(this.params);
    for (const [k, v] of Object.entries(change)) v ? p.set(k, v) : p.delete(k);
    history.replaceState(null, "", `?${p}`);
    this.params = p;
  }

  render() {
    const ui = UIS.find((u) => u.id === this.params.get("ui")) ?? UIS[0]!;
    const view = ui.views.find((v) => v.id === this.params.get("view")) ?? ui.views[0]!;
    const key = this.variant;
    const tag = unsafeStatic(`variant-${key.toLowerCase()}`);
    return html`
      ${staticHtml`<${tag} .ui=${ui} .view=${view}></${tag}>`}
      ${import.meta.env.DEV
        ? html`<div class="bar">
            <button @click=${() => this.step(-1)}>◀</button>
            <span class="label">${key} · ${VARIANTS[key].label}</span>
            <button @click=${() => this.step(1)}>▶</button>
            <span class="sep"></span>
            ${UIS.map(
              (u) => html`<button
                class=${u.id === ui.id ? "on" : ""}
                @click=${() => this.set({ ui: u.id, view: "" })}
              >
                ${u.name}
              </button>`,
            )}
          </div>`
        : ""}
    `;
  }
}
customElements.define("proto-page", ProtoPage);
