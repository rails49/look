/**
 * The glyphs Bootstrap Icons lacks, drawn filled on its 16-unit square so they
 * sit beside it on the rail.
 */
export declare const GLYPHS: Record<string, string>;
/** `data:` URLs, so nothing is fetched. */
export declare const svgUrl: (svg: string) => string;
/**
 * The library an `icon` attribute draws from. A name in the rails49 set comes
 * from it; any other name is Bootstrap's.
 */
export declare const libraryOf: (icon: string) => "rails49" | "default";
