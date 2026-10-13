/** What every `look-press` carries. */
export interface LookPressDetail {
    readonly shiftKey: boolean;
}
/** What `look-view` carries: the view asked for. */
export interface LookViewDetail {
    readonly name: string;
}
export type PowerState = 'on' | 'off' | 'stopped';
/** What `look-power` shows: a state asked for, or the app turning power off once trains are at rest. */
export type PowerShown = PowerState | 'draining';
/** What `look-power` carries: the state asked for. */
export interface LookPowerDetail {
    readonly state: PowerState;
}
export declare function fire<T>(el: HTMLElement, type: string, detail: T): void;
/** A press, with the Shift key a click or key press carried. */
export declare const firePress: (el: HTMLElement, e: Event) => void;
interface LookEventMap {
    'look-press': CustomEvent<LookPressDetail>;
    'look-view': CustomEvent<LookViewDetail>;
    'look-power': CustomEvent<LookPowerDetail>;
}
declare global {
    interface HTMLElementEventMap extends LookEventMap {
    }
    interface DocumentEventMap extends LookEventMap {
    }
}
export {};
