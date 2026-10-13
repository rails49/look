import { LitElement } from 'lit';
/**
 * A connection on the band: a dot, green when up and red when down, then its
 * name.
 *
 * @slot - What is connected.
 */
export declare class LookDot extends LitElement {
    state: 'up' | 'down';
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-dot': LookDot;
    }
}
