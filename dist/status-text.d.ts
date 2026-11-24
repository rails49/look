import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
/**
 * Status text on the band: a button inside a tooltip. A tap, a hover or
 * keyboard focus shows the whole text, which the band may have cut short.
 * It is not a press and fires nothing. With no text and no `label` there is
 * no tooltip.
 */
export declare abstract class StatusText extends LitElement {
    /** Shown in the tooltip in place of the element's own text. */
    label: string;
    private text;
    private readonly textChanges;
    /** Put first in the element's styles; its own rules follow and win. */
    static readonly baseStyles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private read;
    /** The button inside its tooltip, around `content`, which holds the slot. */
    protected inTooltip(content: unknown): import("lit").TemplateResult<1>;
}
