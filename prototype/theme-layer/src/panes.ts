// PROTOTYPE. Each UI's work-pane widgets with their real strings, all as
// Shoelace elements so one layer styles them. control's and dcc-ex's plain
// HTML controls are redrawn here as sl-* on purpose.
import { css, html } from "lit";
import { Pane } from "./layer.js";

const toast = (variant: string, icon: string, text: string) => {
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration: 3000,
    innerHTML: `<sl-icon slot="icon" name="${icon}"></sl-icon>${text}`,
  });
  document.body.append(alert);
  (alert as unknown as { toast(): void }).toast();
};

export const occupancyToasts = () => {
  toast("success", "floppy", "Saved yard.r49");
  setTimeout(() => toast("danger", "exclamation-octagon", "Open failed: not an .r49 archive"), 300);
  setTimeout(() => toast("warning", "exclamation-triangle", "Camera moved 3.4 px since the reference"), 600);
};

export class ProtoPane extends Pane {
  static properties = { ui: {}, view: {} };
  ui = "control";
  view = "throttle";

  static styles = css`
    :host {
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: auto;
      background: var(--sl-color-neutral-0);
      color: var(--sl-color-neutral-900);
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-medium);
    }
    .split {
      display: flex;
      height: 100%;
    }
    nav {
      width: 12rem;
      flex-shrink: 0;
      border-right: 1px solid var(--sl-color-neutral-200);
      padding: 1rem 0.5rem;
    }
    main {
      flex: 1;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 60rem;
    }
    h2 {
      margin: 0;
      font-size: var(--sl-font-size-large);
    }
    nav h2,
    h3 {
      margin: 0 0 0.5rem;
      font-size: var(--sl-font-size-x-small);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--sl-color-neutral-500);
    }
    .row {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .hint {
      color: var(--sl-color-neutral-500);
      font-size: var(--sl-font-size-small);
    }
    .train {
      display: flex;
      justify-content: space-between;
      padding: 0.45rem 0.6rem;
      border-radius: var(--sl-border-radius-medium);
      cursor: pointer;
      font-size: var(--sl-font-size-small);
    }
    .train:hover {
      background: var(--sl-color-neutral-100);
    }
    .train.at {
      background: var(--sl-color-primary-100);
    }
    .train small {
      color: var(--sl-color-neutral-500);
    }
    .tag {
      color: var(--sl-color-primary-600);
      font-size: var(--sl-font-size-x-small);
    }
    sl-range.speed {
      width: min(100%, 26rem);
    }
    .readout {
      font-family: var(--sl-font-mono);
      font-size: var(--sl-font-size-small);
      background: var(--sl-color-neutral-100);
      color: var(--sl-color-neutral-700);
      border-bottom: 1px solid var(--sl-color-neutral-200);
      padding: 0.4rem 0.75rem;
    }
    .readout.warn,
    .notice.warn {
      background: var(--sl-color-warning-100);
      color: var(--sl-color-warning-800);
    }
    .notice.fault {
      background: var(--sl-color-danger-100);
      color: var(--sl-color-danger-800);
    }
    .notice {
      padding: 0.6rem 0.9rem;
      border-radius: var(--sl-border-radius-medium);
      font-size: var(--sl-font-size-small);
    }
    .photo {
      aspect-ratio: 16 / 9;
      max-width: 52rem;
      background: #000;
      color: #777;
      display: grid;
      place-items: center;
      border-radius: 4px;
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
      gap: 0.6rem;
    }
    .tile {
      background: var(--sl-color-neutral-50);
      border: 1px solid var(--sl-color-neutral-200);
      border-top: 3px solid var(--tint);
      border-radius: 6px;
      padding: 0.6rem 0.75rem;
      font-size: var(--sl-font-size-small);
    }
    .tile b {
      display: block;
      font-size: var(--sl-font-size-x-large);
    }
    table {
      border-collapse: collapse;
      font-size: var(--sl-font-size-small);
      width: 100%;
    }
    th,
    td {
      text-align: left;
      padding: 0.35rem 0.5rem;
      border-bottom: 1px solid var(--sl-color-neutral-200);
    }
    th {
      color: var(--sl-color-neutral-600);
      font-weight: var(--sl-font-weight-semibold);
    }
    .lines {
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: var(--sl-border-radius-medium);
      background: var(--sl-color-neutral-50);
      font-family: var(--sl-font-mono);
      font-size: var(--sl-font-size-small);
      line-height: var(--sl-line-height-dense);
      padding: 0.5rem 0.75rem;
      min-height: 14rem;
    }
    .line {
      display: grid;
      grid-template-columns: 7.5rem 1rem 1fr;
      gap: 0.4rem;
      padding: 0.15rem 0;
    }
    .line time {
      color: var(--sl-color-neutral-500);
    }
    .line.sent {
      color: var(--sl-color-primary-700);
    }
    .gloss {
      grid-column: 3;
      font-family: var(--sl-font-sans);
      font-size: var(--sl-font-size-x-small);
      color: var(--sl-color-neutral-500);
    }
    .send sl-input {
      flex: 1;
    }
    .send sl-input::part(input) {
      font-family: var(--sl-font-mono);
    }
    .release {
      display: grid;
      grid-template-columns: 6rem 1fr auto;
      gap: 0.75rem;
      align-items: center;
      padding: 0.4rem 0;
      border-bottom: 1px solid var(--sl-color-neutral-200);
      font-size: var(--sl-font-size-small);
    }
    .release code {
      font-family: var(--sl-font-mono);
    }
    .release small {
      display: block;
      color: var(--sl-color-neutral-500);
    }
    .on {
      color: var(--sl-color-primary-700);
      font-weight: var(--sl-font-weight-semibold);
    }
    .good {
      color: var(--sl-color-success-700);
    }
    .script {
      font-family: var(--sl-font-mono);
      font-size: var(--sl-font-size-small);
      background: var(--sl-color-neutral-50);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: var(--sl-border-radius-medium);
      padding: 0.75rem;
      white-space: pre;
      margin: 0;
    }
  `;

  render() {
    const draw = (this as unknown as Record<string, () => unknown>)[`${this.ui}_${this.view}`];
    return draw
      ? draw.call(this)
      : html`<main><p class="hint">${this.ui} · ${this.view}: no widgets of note.</p></main>`;
  }

  control_throttle() {
    const trains = [
      ["goods", "B3", true],
      ["shunter", "yard 2", false],
      ["express", "crossing a transit", false],
    ] as const;
    return html`<div class="split">
      <nav>
        <h2>Trains</h2>
        ${trains.map(
          ([n, where, at]) => html`<div class="train ${at ? "at" : ""}">
            <span>${n} ${at ? html`<span class="tag">manual</span>` : ""}</span><small>${where}</small>
          </div>`,
        )}
      </nav>
      <main>
        <div class="row"><h2>goods</h2><span class="hint">→ a.B</span><sl-button size="small">Release</sl-button></div>
        <sl-alert variant="warning" open>
          <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
          the track has no power — switch it on to drive
        </sl-alert>
        <sl-range class="speed" label="Speed" min="-1" max="1" step="0.01" value="0.35"></sl-range>
        <div class="row">
          <sl-button variant="danger">STOP</sl-button>
          <sl-button>Turn around</sl-button>
          <sl-badge variant="success">clear</sl-badge>
        </div>
        <h3>Functions</h3>
        <div class="row">
          <sl-button size="small" disabled>headlights</sl-button>
          <sl-button size="small" disabled>vacuum</sl-button>
        </div>
      </main>
    </div>`;
  }

  control_stock() {
    return html`<main>
      <h3>Models</h3>
      <table>
        <tr><th>Model</th><th>Kind</th><th>Length, mm</th><th>Address</th><th></th></tr>
        <tr><td>BR 218</td><td>locomotive</td><td>189</td><td><sl-input size="small" value="218"></sl-input></td><td><sl-button size="small">Photo</sl-button></td></tr>
        <tr><td>Silberling</td><td>passenger</td><td>303</td><td></td><td><sl-button size="small">Photo</sl-button></td></tr>
        <tr><td>Eaos</td><td>freight</td><td>164</td><td></td><td><sl-button size="small">Photo</sl-button></td></tr>
      </table>
      <div class="row">
        <sl-input size="small" placeholder="New train"></sl-input>
        <sl-button size="small" variant="primary">New train</sl-button>
      </div>
    </main>`;
  }

  control_edit() {
    return html`<main>
      <p class="hint">The canvas, with its context menu open.</p>
      <sl-menu style="max-width: 14rem">
        <sl-menu-item>Properties…</sl-menu-item>
        <sl-menu-item>Rotate <span slot="suffix">R</span></sl-menu-item>
        <sl-menu-item>Flip <span slot="suffix">F</span></sl-menu-item>
        <sl-divider></sl-divider>
        <sl-menu-item>Delete <span slot="suffix">⌫</span></sl-menu-item>
      </sl-menu>
    </main>`;
  }

  occupancy_editor() {
    return html`<div class="readout">DPT 14.2 · fit residual 0.8 px</div>
      <div class="readout warn">Camera moved 3.4 px (0.24 track widths) from the reference · within the 7.0 px this layout allows.</div>
      <main>
        <div class="photo">labelled image</div>
        <div class="row">
          <sl-checkbox>Labeled complete</sl-checkbox>
          <span class="hint">No car in this image is unlabeled. Only complete images will be exported for training.</span>
        </div>
        <sl-menu style="max-width: 14rem">
          <sl-menu-item>Name sensor…</sl-menu-item>
          <sl-menu-item>Delete sensor</sl-menu-item>
          <sl-menu-item>Reclassify car
            <sl-menu slot="submenu"><sl-menu-item>locomotive</sl-menu-item><sl-menu-item>freight</sl-menu-item></sl-menu>
          </sl-menu-item>
        </sl-menu>
      </main>`;
  }

  occupancy_live() {
    return html`<main>
      <div class="notice warn row">
        The camera moved since the reference image; boxes may be off.
        <sl-button size="small">Classify anyway</sl-button>
        <sl-button size="small">Refuse again</sl-button>
      </div>
      <div class="photo">live camera frame</div>
    </main>`;
  }

  occupancy_diagnostics() {
    const tiles = [
      ["#4caf50", "93%", "of labels agreed (296)"],
      ["#ef5350", "9", "missed cars"],
      ["#ab47bc", "5", "phantom boxes"],
      ["#42a5f5", "2", "duplicate boxes"],
      ["#ffb300", "6", "poses off"],
    ];
    return html`<main>
      <div class="row hint">42 images · 318 labels</div>
      <div class="tiles">
        ${tiles.map(([c, n, t]) => html`<div class="tile" style="--tint:${c}"><b>${n}</b>${t}</div>`)}
      </div>
      <div class="row">
        <sl-range label="Confidence floor" min="5" max="95" value="40" style="width: 16rem"></sl-range>
        <sl-checkbox>Only images with disagreements</sl-checkbox>
      </div>
      <div>
        <sl-progress-bar value="28"></sl-progress-bar>
        <span class="hint">Running the detector over this archive… 12 of 42</span>
      </div>
      <table>
        <tr><th>Image</th><th>Labels</th><th>Disagree</th><th>Missed</th><th>Lowest conf</th><th></th></tr>
        ${[["yard-0412", 9, 2, 1, "41%"], ["yard-0413", 7, 0, 0, "77%"], ["yard-0420", 11, 3, 2, "35%"]].map(
          ([i, l, d, m, c]) => html`<tr><td>${i}</td><td>${l}</td><td>${d}</td><td>${m}</td><td>${c}</td>
            <td><sl-button size="small">Review</sl-button></td></tr>`,
        )}
      </table>
    </main>`;
  }

  dccex_monitor() {
    const lines = [
      ["14:03:27.512", "", "<iDCC-EX V-5.2.76 / MEGA / STANDARD_MOTOR G-9db6d36>", "the station came up running DCC-EX V-5.2.76 on MEGA, build G-9db6d36"],
      ["14:03:28.004", "»", "<1 A>", ""],
      ["14:03:28.031", "", "<p1 A>", "A track power is on"],
      ["14:03:29.117", "", "<= C MAIN A>", "track C is MAIN_AUTO"],
      ["14:03:41.880", "", "<* TRACK C FAST OVERLOAD 4210mA. Pause 100ms *>", ""],
      ["14:03:42.250", "", "<jG 1233 250 250>", ""],
    ];
    return html`<main>
      <div class="row">
        <sl-tooltip content="pause"><sl-icon-button name="pause-fill" label="pause"></sl-icon-button></sl-tooltip>
        <sl-tooltip content="clear"><sl-icon-button name="trash" label="clear"></sl-icon-button></sl-tooltip>
        <span class="hint">12 waiting, 3 dropped</span>
      </div>
      <div class="lines">
        ${lines.map(
          ([t, m, l, g]) => html`<div class="line ${m ? "sent" : ""}">
            <time>${t}</time><span>${m}</span><span>${l}</span>${g ? html`<span class="gloss">${g}</span>` : ""}
          </div>`,
        )}
      </div>
      <form class="row send" @submit=${(e: Event) => e.preventDefault()}>
        <sl-input placeholder="s or <s>"></sl-input>
        <sl-button>↑</sl-button><sl-button>↓</sl-button>
        <sl-button variant="primary">send</sl-button>
      </form>
    </main>`;
  }

  dccex_releases() {
    return html`<main>
      <sl-details summary="releases" open>
        <div class="release"><code class="on">v5.2.76</code><span>Fast overcurrent guard<small>2026-08-03 · <span class="on">on the station now</span></small></span><span></span></div>
        <div class="release"><code>v5.2.71</code><span>Turnout feedback on Vpin<small>2026-06-19</small></span><sl-button size="small">flash</sl-button></div>
        <div class="release"><code>v5.2.60</code><span>EX-RAIL script fixes<small>2026-04-02</small></span><sl-button size="small">flash</sl-button></div>
      </sl-details>
      <sl-alert variant="danger" open>
        <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
        flashing resets the station and drops every throttle: the rails go dead, anything moving keeps moving until
        friction stops it, and it takes a minute or two
        <div class="row" style="margin-top: 0.6rem">
          <sl-button variant="danger" size="small">write it</sl-button>
          <sl-button size="small">cancel</sl-button>
        </div>
      </sl-alert>
      <div>
        <span class="hint">writing v5.2.71 onto the station — a minute or two, and the station is away for it</span>
        <sl-progress-bar value="42">42 %</sl-progress-bar>
      </div>
      <span class="good">the station came back running v5.2.76</span>
    </main>`;
  }

  dccex_script() {
    return html`<main>
      <pre class="script">AUTOMATION(1, "Yard shuttle")
  FWD(30) AT(12) STOP DELAY(4000)
  REV(30) AT(11) STOP
  FOLLOW(1)</pre>
      <div class="notice warn">
        applying stops the railroad: the translator exits on the new text, which cuts track power, and the
        script takes effect at the next ON
        <div class="row" style="margin-top: 0.6rem">
          <sl-button variant="warning" size="small">apply it</sl-button>
          <sl-button size="small">cancel</sl-button>
        </div>
      </div>
    </main>`;
  }

  dccex_journal() {
    return html`<main>
      <div class="row">
        <sl-select label="period" value="day" size="small" style="width: 12rem">
          <sl-option value="all">all</sl-option>
          <sl-option value="day">last day</sl-option>
          <sl-option value="week">last 7 days</sl-option>
        </sl-select>
        <sl-switch>show routine lines</sl-switch>
        <sl-button size="small">reload</sl-button>
        <span class="hint">1.2 MB</span>
      </div>
      <table>
        <tr><th>district</th><th>trips</th><th>stops</th><th>overloads</th></tr>
        <tr><td>yard</td><td>48</td><td>12</td><td>0</td></tr>
        <tr><td>main</td><td>131</td><td>3</td><td>2</td></tr>
      </table>
    </main>`;
  }
}
customElements.define("proto-pane", ProtoPane);
