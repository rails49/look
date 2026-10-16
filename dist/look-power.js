var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chromeTokens } from "./chrome.js";
import { fire } from "./events.js";
import { place } from "./place.js";
import { press, pressStyles } from "./press.js";
const POWER_TIP = {
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
let LookPower = class LookPower extends LitElement {
    constructor() {
        super(...arguments);
        this.state = 'off';
        this.reason = '';
        this.toggleReason = '';
    }
    static { this.styles = [
        chromeTokens,
        pressStyles,
        css `
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
    ]; }
    connectedCallback() {
        super.connectedCallback();
        place(this, 'power');
    }
    ask(state) {
        fire(this, 'look-power', { state });
    }
    render() {
        const toggleReason = this.reason || this.toggleReason;
        return html `
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
};
__decorate([
    property({ reflect: true })
], LookPower.prototype, "state", void 0);
__decorate([
    property()
], LookPower.prototype, "reason", void 0);
__decorate([
    property({ attribute: 'toggle-reason' })
], LookPower.prototype, "toggleReason", void 0);
LookPower = __decorate([
    customElement('look-power')
], LookPower);
export { LookPower };
