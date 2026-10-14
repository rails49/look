import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { chromeTokens } from './chrome.ts';
import { fire, type LookPowerDetail, type PowerShown, type PowerState } from './events.ts';
import { place } from './place.ts';

const POWER_TIP: Record<PowerShown, string> = {
  on: 'Track power is on; turn it off',
  off: 'Track power is off; turn it on',
  stopped: 'Stopped; turn track power on',
  draining: 'Draining: power goes off when every train is at rest; keep it on',
};

/**
 * Track power: a toggle and a stop sign. The power glyph is green when on,
 * pulses green while draining, is dimmed when off and red when stopped.
 * Pressing it asks for `off` when on and for `on` otherwise; the stop sign
 * asks for `stopped`. A `reason` disables
 * both and is their tooltip; a `toggle-reason` disables only the toggle. The
 * app sets `state` from what the station says.
 *
 * @fires look-power - Detail: the state asked for.
 */
@customElement('look-power')
export class LookPower extends LitElement {
  @property({ reflect: true }) state: PowerShown = 'off';
  @property() reason = '';
  @property({ attribute: 'toggle-reason' }) toggleReason = '';

  static override styles = [
    chromeTokens,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      sl-icon-button {
        transition: transform 0.1s;
      }

      sl-icon-button:not(.off):hover {
        transform: scale(1.1);
      }

      /* Not disabled: a disabled sl-icon-button takes no pointer events, and
         the tooltip has to open to say why. */
      .off {
        opacity: 0.35;
      }

      .off::part(base) {
        cursor: default;
      }

      .power {
        font-size: 1.5rem;
      }

      .power::part(base),
      .power::part(base):hover {
        color: rgba(255, 255, 255, 0.55);
      }

      :host([state='on']) .power::part(base) {
        color: var(--power-on);
      }

      :host([state='draining']) .power::part(base) {
        color: var(--power-on);
        animation: pulse 1.2s ease-in-out infinite;
      }

      @keyframes pulse {
        50% {
          opacity: 0.4;
        }
      }

      :host([state='stopped']) .power::part(base) {
        color: var(--stop);
      }

      .stop {
        font-size: 1.9rem;
      }

      .stop::part(base),
      .stop::part(base):hover {
        color: var(--stop);
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'power');
  }

  private ask(state: PowerState, held: string) {
    if (!held) fire<LookPowerDetail>(this, 'look-power', { state });
  }

  override render() {
    const toggleHeld = this.reason || this.toggleReason;
    const powerTip = toggleHeld || POWER_TIP[this.state];
    const stopTip = this.reason || 'Stop every train';
    return html`
      <sl-tooltip content=${powerTip} placement="bottom">
        <sl-icon-button
          class="power ${toggleHeld ? 'off' : ''}"
          name="power"
          label=${powerTip}
          @click=${() => this.ask(this.state === 'on' ? 'off' : 'on', toggleHeld)}
        ></sl-icon-button>
      </sl-tooltip>
      <sl-tooltip content=${stopTip} placement="bottom">
        <sl-icon-button
          class="stop ${this.reason ? 'off' : ''}"
          name="sign-stop-fill"
          label=${stopTip}
          @click=${() => this.ask('stopped', this.reason)}
        ></sl-icon-button>
      </sl-tooltip>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-power': LookPower;
  }
}
