import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from './chrome.ts';
import { fire, type LookPowerDetail, type PowerShown, type PowerState } from './events.ts';
import { place } from './place.ts';
import { press, pressStyles } from './press.ts';

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
    pressStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .power {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.55);
      }

      :host([state='on']) .power {
        color: var(--power-on);
      }

      :host([state='draining']) .power {
        color: var(--power-on);
        animation: pulse 1.2s ease-in-out infinite;
      }

      @keyframes pulse {
        50% {
          opacity: 0.4;
        }
      }

      :host([state='stopped']) .power {
        color: var(--stop);
      }

      .stop {
        font-size: 1.9rem;
        color: var(--stop);
      }
    `,
  ];

  override connectedCallback() {
    super.connectedCallback();
    place(this, 'power');
  }

  private ask(state: PowerState) {
    fire<LookPowerDetail>(this, 'look-power', { state });
  }

  override render() {
    const toggleReason = this.reason || this.toggleReason;
    return html`
      ${press({
        icon: 'power',
        label: POWER_TIP[this.state],
        disabled: !!toggleReason,
        reason: toggleReason,
        placement: 'bottom',
        part: 'power',
        onPress: () => this.ask(this.state === 'on' ? 'off' : 'on'),
      })}
      ${press({
        icon: 'sign-stop-fill',
        label: 'Stop every train',
        disabled: !!this.reason,
        reason: this.reason,
        placement: 'bottom',
        part: 'stop',
        onPress: () => this.ask('stopped'),
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'look-power': LookPower;
  }
}
