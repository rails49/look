import { LitElement } from 'lit';
/**
 * A group of commands on the rail. `label` names it to a screen reader; `end`
 * pins it to the rail's far end.
 *
 * @slot - The `look-command`s.
 */
export declare class LookGroup extends LitElement {
    label: string;
    end: boolean;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    updated(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'look-group': LookGroup;
    }
}
