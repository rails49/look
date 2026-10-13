import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { type PowerShown } from './events.ts';
/**
 * Track power: a toggle and a stop sign. The power glyph is green when on,
 * pulses green while draining, is dimmed when off and red when stopped.
 * Pressing it asks for `off` when on and for `on` otherwise; the stop sign
 * asks for `stopped`. A `reason` disables
 * both and is their tooltip. The app sets `state` from what the station says.
 *
 * @fires look-power - Detail: the state asked for.
 */
export declare class LookPower extends LitElement {
    state: PowerShown;
    reason: string;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private ask;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-power': LookPower;
    }
}
