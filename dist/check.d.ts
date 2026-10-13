export interface Violation {
    readonly line: number;
    readonly message: string;
}
/** What a file does to the chrome that the app may not. */
export declare function check(path: string, text: string): Violation[];
