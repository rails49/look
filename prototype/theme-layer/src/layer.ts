// PROTOTYPE. One stylesheet holds the theme layer. The document adopts it
// for the custom properties, and every work-pane component adopts it too,
// because a ::part() rule only reaches widgets in its own shadow root.
import { LitElement } from "lit";
import a from "./layers/a.css?raw";
import b from "./layers/b.css?raw";
import c from "./layers/c.css?raw";

export const LAYERS = {
  A: { label: "Shoelace as shipped", css: a, dark: false },
  B: { label: "Band blue, desktop size", css: b, dark: false },
  C: { label: "Touch size, always dark", css: c, dark: true },
} as const;
export type LayerKey = keyof typeof LAYERS;
export type Scheme = "os" | "light" | "dark";

const sheet = new CSSStyleSheet();
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

const osDark = matchMedia("(prefers-color-scheme: dark)");
let current: { key: LayerKey; scheme: Scheme } = { key: "A", scheme: "os" };

function paint() {
  const { key, scheme } = current;
  const dark = LAYERS[key].dark || scheme === "dark" || (scheme === "os" && osDark.matches);
  document.documentElement.classList.toggle("sl-theme-dark", dark);
}
osDark.addEventListener("change", paint);

export function setLayer(key: LayerKey, scheme: Scheme) {
  current = { key, scheme };
  sheet.replaceSync(LAYERS[key].css);
  paint();
}

/** A work-pane component: adopts the layer next to its own styles. */
export class Pane extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot() as ShadowRoot;
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
    return root;
  }
}
