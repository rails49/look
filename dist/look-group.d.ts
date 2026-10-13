import { LitElement } from 'lit';
/**
 * A group of commands on the rail. `end` pins it to the rail's far end.
 *
 * @slot - The `look-command`s.
 */
export declare class LookGroup extends LitElement {
    end: boolean;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-group': LookGroup;
    }
}
