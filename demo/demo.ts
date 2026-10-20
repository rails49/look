// A page to look at the chrome with. Every press is logged; the views, power
// and the gear do what an app would do with them.
import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import { LookBandPress, lookTheme, type LookDialog } from '../src/index.ts';

setBasePath('/node_modules/@shoelace-style/shoelace/dist');

@customElement('demo-pane')
export class DemoPane extends LitElement {
  @query('look-dialog') dialog!: LookDialog;

  static override styles = [
    lookTheme,
    css`
      :host {
        display: block;
        padding: 1.5rem;
      }

      .row {
        display: flex;
        gap: 0.5rem;
        align-items: end;
      }
    `,
  ];

  override render() {
    return html`
      <p>Work pane. It follows the OS light or dark setting; the chrome does not.</p>
      <div class="row">
        <sl-input label="Name" size="small"></sl-input>
        <sl-button size="small" variant="primary">Save</sl-button>
        <sl-button size="small">Cancel</sl-button>
      </div>
      <p>
        <sl-switch size="small" @sl-change=${this.silence}>Station silent: the toggle is disabled, STOP stays live</sl-switch>
      </p>
      <p><a href="/demo/bands.html">control's band and the dcc-ex UI's at 360px, 390px and 600px</a></p>
      <look-dialog label="Settings" size="medium">
        <p>The dialog shell.</p>
        <sl-button slot="footer" @click=${() => this.dialog.hide()}>Close</sl-button>
      </look-dialog>
    `;
  }

  private silence(e: Event) {
    const silent = (e.target as HTMLInputElement).checked;
    document.querySelector('look-power')!.toggleReason = silent ? 'no station' : '';
  }
}

// The driving mode, a press with two states: its glyph and tooltip say which.
const NEXT_DRIVING = {
  person: { icon: 'robot', label: 'Automatic driving; switch to manual' },
  robot: { icon: 'person', label: 'Manual driving; switch to automatic' },
};

document.addEventListener('look-press', (e) => {
  const el = e.target as Element;
  console.log('look-press', el.localName, e.detail);
  if (el.localName === 'look-gear') document.querySelector('demo-pane')?.dialog.show();
  if (el instanceof LookBandPress && el.id === 'driving') Object.assign(el, NEXT_DRIVING[el.icon as keyof typeof NEXT_DRIVING]);
});

document.addEventListener('look-view', (e) => {
  for (const v of document.querySelectorAll('look-view')) v.current = v.name === e.detail.name;
});

// Off drains first, as control does: power goes off once every train is at rest.
let drained: ReturnType<typeof setTimeout> | undefined;
document.addEventListener('look-power', (e) => {
  const power = document.querySelector('look-power')!;
  clearTimeout(drained);
  power.state = e.detail.state === 'off' ? 'draining' : e.detail.state;
  if (power.state === 'draining') drained = setTimeout(() => (power.state = 'off'), 3000);
});

declare global {
  interface HTMLElementTagNameMap {
    'demo-pane': DemoPane;
  }
}
