// PROTOTYPE. Each UI's dialogs with their real strings, drawn by one shell:
// label, a size (small or medium), a body and footer buttons. The layer
// decides how the shell looks.
import { css, html, type TemplateResult } from "lit";
import { Pane } from "./layer.js";

export const DIALOGS: Record<string, { id: string; label: string }[]> = {
  control: [
    { id: "settings", label: "Settings" },
    { id: "backup", label: "Backup" },
    { id: "properties", label: "Properties" },
    { id: "model", label: "New model" },
  ],
  occupancy: [
    { id: "settings", label: "Settings" },
    { id: "sensor", label: "Name sensor" },
    { id: "calibration", label: "Calibration point" },
  ],
  dccex: [{ id: "flash", label: "Flash (as a dialog)" }],
};

export class ProtoDialog extends Pane {
  static properties = { ui: {}, name: {} };
  ui = "";
  name = "";

  static styles = css`
    .stack sl-input,
    .stack sl-select {
      display: block;
      margin-bottom: 0.7rem;
    }
    h3 {
      margin: 1rem 0 0.4rem;
      font-size: var(--sl-font-size-x-small);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--sl-color-neutral-500);
    }
    h3:first-child {
      margin-top: 0;
    }
    .hint {
      color: var(--sl-color-neutral-500);
      font-size: var(--sl-font-size-small);
    }
    .row {
      display: flex;
      gap: 0.5rem;
      align-items: end;
      flex-wrap: wrap;
    }
    .pick {
      padding: 0.35rem 0.5rem;
      border-radius: var(--sl-border-radius-medium);
      cursor: pointer;
    }
    .pick:hover {
      background: var(--sl-color-neutral-100);
    }
    .pick.at {
      background: var(--sl-color-primary-100);
    }
    .mono {
      font-family: var(--sl-font-mono);
      font-size: var(--sl-font-size-small);
    }
    .required {
      border-left: 3px solid var(--sl-color-warning-600);
      background: var(--sl-color-warning-100);
      color: var(--sl-color-neutral-900);
      border-radius: var(--sl-border-radius-medium);
      padding: 0.6rem 0.8rem;
      margin-bottom: 0.8rem;
      font-size: var(--sl-font-size-small);
    }
    .required ul {
      margin: 0.4rem 0 0;
      padding-left: 1.2rem;
    }
    .grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.6rem 0.9rem;
      align-items: center;
      padding-top: 0.8rem;
    }
    .grid label {
      text-align: right;
      font-weight: 500;
      color: var(--sl-color-neutral-600);
      font-size: var(--sl-font-size-small);
    }
    .xyz {
      display: grid;
      grid-template-columns: 1.5rem 1fr;
      gap: 0.5rem;
      align-items: center;
    }
    .wrong {
      color: var(--sl-color-danger-600);
      font-size: var(--sl-font-size-small);
    }
    .when {
      font-family: var(--sl-font-mono);
      font-size: var(--sl-font-size-small);
      margin-right: 0.75rem;
    }
  `;

  private close = () => this.dispatchEvent(new CustomEvent("dialog", { detail: "", bubbles: true, composed: true }));

  private shell(label: string, size: "small" | "medium", body: TemplateResult, footer: TemplateResult) {
    return html`<sl-dialog open label=${label} class=${size} @sl-after-hide=${this.close}>
      ${body}
      <div slot="footer" class="dialog-footer">${footer}</div>
    </sl-dialog>`;
  }

  render() {
    const draw = (this as unknown as Record<string, () => unknown>)[`${this.ui}_${this.name}`];
    return draw ? draw.call(this) : "";
  }

  control_settings() {
    return this.shell(
      "Settings",
      "medium",
      html`<h3>Railroad</h3>
        <div class="pick at">✓ otira</div>
        <div class="pick">gleis49</div>
        <p class="hint">the track has power: switch it off to load another railroad</p>
        <div class="row">
          <sl-input label="Name" size="small"></sl-input>
          <sl-button size="small">New</sl-button>
          <sl-button size="small">Copy loaded as…</sl-button>
        </div>
        <h3>Backup</h3>
        <div class="row"><sl-button>Backup…</sl-button><span class="hint">nothing has moved since the last backup</span></div>
        <h3>Box</h3>
        <p class="hint">Every app on this box stops, and starting it again takes a person at the box.</p>
        <div class="row">
          <sl-button size="small" variant="danger">Turn off</sl-button>
          <sl-button size="small">Cancel</sl-button>
        </div>`,
      html`<sl-button @click=${this.close}>Close</sl-button>`,
    );
  }

  control_backup() {
    return this.shell(
      "Backup",
      "medium",
      html`<p class="mono">/home/somebody/tc49</p>
        <p class="hint">the copy goes to git@github.com:somebody/railroad.git</p>
        <p>not on the other machine yet: 2 backups, the oldest 3 days old</p>
        <div class="row">
          <sl-button variant="primary">Back up now</sl-button>
          <sl-button>Turn automatic backup off</sl-button>
        </div>
        <sl-details summary="back up to another repository" style="margin-top: 0.8rem">
          <div class="row">
            <sl-input label="Repository" placeholder="git@github.com:you/my-railroad.git" style="flex: 1"></sl-input>
            <sl-button variant="primary">Back up to it</sl-button>
          </div>
        </sl-details>
        <h3>Backups</h3>
        <p class="hint">
          Restore puts the store back as the picked backup held it; the apps and this page then reload. Quit
          DecoderPro and PanelPro before restoring, and open them again after.
        </p>
        <div class="pick at"><span class="when">2026-08-30 18:02</span>backup: reversing-loops</div>
        <div class="pick"><span class="when">2026-08-27 09:41</span>backup: yard ladder</div>
        <p class="wrong">track power is on — turn it off to restore</p>`,
      html`<sl-button @click=${this.close}>Close</sl-button><sl-button variant="warning">Restore</sl-button>`,
    );
  }

  control_properties() {
    return this.shell(
      "Properties",
      "small",
      html`<div class="stack">
        <sl-input label="Name" value="B3" help-text="The id every transit through this symbol is prefixed with."></sl-input>
        <sl-input label="Length" type="number" value="-40" help-text="a length is a positive whole number of millimetres" data-user-invalid></sl-input>
        <sl-input label="Signal at A" help-text="What the signal at this end answers to. Empty where no signal stands there."></sl-input>
        <sl-input label="Sensor at A" placeholder="name.A"></sl-input>
      </div>`,
      html`<sl-button @click=${this.close}>Cancel</sl-button><sl-button variant="primary">Apply</sl-button>`,
    );
  }

  control_model() {
    return this.shell(
      "New model",
      "small",
      html`<div class="stack">
        <sl-input label="Name" value="BR 218"></sl-input>
        <sl-select label="Kind" value="locomotive">
          <sl-option value="locomotive">locomotive</sl-option>
          <sl-option value="passenger">passenger</sl-option>
          <sl-option value="freight">freight</sl-option>
          <sl-option value="special">special</sl-option>
        </sl-select>
        <sl-input label="Length over buffers, mm" type="number" value="189"></sl-input>
        <h3>Functions</h3>
        <div class="row"><sl-input size="small" value="0" style="width: 4rem"></sl-input><sl-input size="small" value="headlights"></sl-input><sl-icon-button name="x-lg" label="Remove"></sl-icon-button></div>
        <sl-button size="small" style="margin-top: 0.5rem">Add a function</sl-button>
      </div>`,
      html`<sl-button @click=${this.close}>Cancel</sl-button><sl-button variant="primary">Create</sl-button>`,
    );
  }

  occupancy_settings() {
    return this.shell(
      "Settings",
      "medium",
      html`<div class="required">
          <strong>This layout needs a few details before it can be edited.</strong>
          <ul>
            <li>Give the layout a name — it identifies the archive wherever it is listed.</li>
            <li>Measure the camera height above layout zero, in mm.</li>
          </ul>
        </div>
        <sl-tab-group>
          <sl-tab slot="nav" panel="layout">Layout</sl-tab>
          <sl-tab-panel name="layout">
            <div class="grid">
              <label>Name</label><sl-input></sl-input>
              <label>Scale</label>
              <sl-select value="HO">
                ${["G", "O", "S", "HO", "T", "N", "Z"].map((s) => html`<sl-option value=${s}>${s}</sl-option>`)}
              </sl-select>
              <label>Camera height (mm)</label>
              <sl-input type="number" placeholder="e.g. 1150" help-text="Above layout zero. Scale varies with height, so this is what makes DPT mean the same thing at the rails as on the baseboard."></sl-input>
              <label>Description</label><sl-input></sl-input>
              <label>Contact</label><sl-input></sl-input>
            </div>
          </sl-tab-panel>
        </sl-tab-group>`,
      html`<sl-button variant="primary" disabled>Close</sl-button>`,
    );
  }

  occupancy_sensor() {
    return this.shell(
      "Name sensor",
      "small",
      html`<p class="hint">
          Optional. Names are free text and need not be unique — consumers key on the sensor's id,
          <code>s3</code>, which is also what the editor shows when there is no name. Clear the field to remove one.
        </p>
        <sl-input placeholder="e.g. Yard throat" autofocus></sl-input>`,
      html`<sl-button @click=${this.close}>Cancel</sl-button><sl-button variant="primary">Save</sl-button>`,
    );
  }

  occupancy_calibration() {
    return this.shell(
      "Place calibration point",
      "small",
      html`<p class="hint">
          Where is this pixel on the layout, in millimetres? The origin is arbitrary but must be the same for every
          point in this layout.
        </p>
        <div class="xyz">
          <span class="mono">x</span><sl-input inputmode="decimal" value="1204"></sl-input>
          <span class="mono">y</span><sl-input inputmode="decimal" value="abc"></sl-input>
          <span class="mono">z</span><sl-input inputmode="decimal" value="0"></sl-input>
        </div>
        <p class="wrong">y must be a number, in millimetres.</p>`,
      html`<sl-button @click=${this.close}>Cancel</sl-button><sl-button variant="primary">Place</sl-button>`,
    );
  }

  dccex_flash() {
    return this.shell(
      "Flash v5.2.71?",
      "small",
      html`<p>
        flashing resets the station and drops every throttle: the rails go dead, anything moving keeps moving
        until friction stops it, and it takes a minute or two
      </p>`,
      html`<sl-button @click=${this.close}>cancel</sl-button><sl-button variant="danger">write it</sl-button>`,
    );
  }
}
customElements.define("proto-dialog", ProtoDialog);
