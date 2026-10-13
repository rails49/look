// PROTOTYPE. Four places for the view switch. Each variant owns its layout.
import { LitElement, css, html, nothing } from "lit";
import { bandRight, bandStyles, pick } from "./chrome.js";
import type { Ui, View } from "./data.js";

abstract class Variant extends LitElement {
  static properties = { ui: { attribute: false }, view: { attribute: false } };
  ui!: Ui;
  view!: View;

  static frame = css`
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
  `;

  protected about() {
    return html`<span class="about"
      >${this.ui.about}${this.ui.aboutDetail
        ? html`<small>${this.ui.aboutDetail}</small>`
        : nothing}</span
    >`;
  }

  protected commandsRail() {
    const v = this.view;
    if (!v.rail.length && !v.press) return nothing;
    return html`<proto-rail .groups=${v.rail} press=${v.press ?? ""}></proto-rail>`;
  }

  protected work() {
    return html`<proto-work .view=${this.view} ui=${this.ui.name}></proto-work>`;
  }
}

/** A: occupancy today. A pill of view icons on the band's left; a rail only where the view has commands. */
export class VariantA extends Variant {
  static label = "Band pill (occupancy today)";
  static styles = [
    Variant.frame,
    bandStyles,
    css`
      .modes {
        display: flex;
        align-items: center;
        gap: 0.1rem;
        padding: 0.1rem;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.18);
        flex-shrink: 0;
      }
      .modes sl-icon-button.active::part(base) {
        background: rgba(255, 255, 255, 0.22);
        border-radius: 50%;
      }
    `,
  ];
  render() {
    return html`
      <div class="band">
        <div class="left">
          <div class="modes" role="group" aria-label="View">
            ${this.ui.views.map(
              (v) => html`<sl-tooltip content=${v.label}
                ><sl-icon-button
                  name=${v.icon}
                  label=${v.label}
                  class=${v.id === this.view.id ? "active" : ""}
                  @click=${() => pick(this, v.id)}
                ></sl-icon-button
              ></sl-tooltip>`,
            )}
          </div>
          ${this.about()}
        </div>
        <div class="right">${bandRight(this.ui.bandRight)}</div>
      </div>
      <div class="body">${this.commandsRail()}${this.work()}</div>
    `;
  }
}

/** B: ADR-0012. The views are the rail's first group, and the rail is on every view. */
export class VariantB extends Variant {
  static label = "Rail top (ADR-0012)";
  static styles = [Variant.frame, bandStyles];
  render() {
    return html`
      <div class="band">
        <div class="left">${this.about()}</div>
        <div class="right">${bandRight(this.ui.bandRight)}</div>
      </div>
      <div class="body">
        <proto-rail
          .views=${this.ui.views}
          current=${this.view.id}
          .groups=${this.view.rail}
          press=${this.view.press ?? ""}
        ></proto-rail>
        ${this.work()}
      </div>
    `;
  }
}

/** C: the views as tabs with words along the band, after the name; a rail only where the view has commands. */
export class VariantC extends Variant {
  static label = "Band tabs with words";
  static styles = [
    Variant.frame,
    bandStyles,
    css`
      .tabs {
        display: flex;
        align-self: stretch;
        gap: 0.25rem;
      }
      .tab {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0 0.9rem;
        font-size: 0.95rem;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        border-top: 3px solid transparent;
        white-space: nowrap;
      }
      .tab sl-icon {
        font-size: 1.25rem;
      }
      .tab:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .tab.active {
        border-bottom-color: var(--band-ink);
        font-weight: 600;
        background: rgba(255, 255, 255, 0.12);
      }
      @media (max-width: 760px) {
        .tab span {
          display: none;
        }
      }
    `,
  ];
  render() {
    return html`
      <div class="band">
        <div class="left">
          ${this.about()}
          <nav class="tabs" aria-label="View">
            ${this.ui.views.map(
              (v) => html`<div
                class="tab ${v.id === this.view.id ? "active" : ""}"
                @click=${() => pick(this, v.id)}
              >
                <sl-icon name=${v.icon}></sl-icon><span>${v.label}</span>
              </div>`,
            )}
          </nav>
        </div>
        <div class="right">${bandRight(this.ui.bandRight)}</div>
      </div>
      <div class="body">${this.commandsRail()}${this.work()}</div>
    `;
  }
}

/** D: B with each view's word under its icon, so a view reads without a tooltip. */
export class VariantD extends Variant {
  static label = "Rail top with words";
  static styles = [Variant.frame, bandStyles];
  render() {
    return html`
      <div class="band">
        <div class="left">${this.about()}</div>
        <div class="right">${bandRight(this.ui.bandRight)}</div>
      </div>
      <div class="body">
        <proto-rail
          .views=${this.ui.views}
          words
          current=${this.view.id}
          .groups=${this.view.rail}
          press=${this.view.press ?? ""}
        ></proto-rail>
        ${this.work()}
      </div>
    `;
  }
}

customElements.define("variant-a", VariantA);
customElements.define("variant-b", VariantB);
customElements.define("variant-c", VariantC);
customElements.define("variant-d", VariantD);

export const VARIANTS = { A: VariantA, B: VariantB, C: VariantC, D: VariantD } as const;
export type VariantKey = keyof typeof VARIANTS;
