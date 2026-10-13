import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

/**
 * The glyphs Bootstrap Icons lacks, drawn filled on its 16-unit square so they
 * sit beside it on the rail.
 */
export const GLYPHS: Record<string, string> = {
  /** An arrow most of the way round the selection: a quarter turn. */
  rotate:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">' +
    '<path d="M3.76 12.24A6 6 0 1 1 14 8h-1A5 5 0 1 0 4.46 11.54Z"/>' +
    '<path d="M11.5 8h4l-2 2.6Z"/>' +
    '<path d="M6 6h4v4H6Z"/>' +
    '</svg>',
  /** A lever on its quadrant. */
  throttle:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">' +
    '<path d="M1.89 9.78A6.5 6.5 0 0 1 14.11 9.78l-.94.34A5.5 5.5 0 0 0 2.83 10.12Z"/>' +
    '<path d="M8.63 12.3 12.01 5.05l-1.26-.6L7.37 11.7Z"/>' +
    '<circle cx="11.38" cy="4.75" r="1.6"/>' +
    '<path d="M1.5 12h13v1.5h-13Z"/>' +
    '</svg>',
};

/** `data:` URLs, so nothing is fetched. */
export const svgUrl = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

registerIconLibrary('rails49', {
  resolver: (name) => (name in GLYPHS ? svgUrl(GLYPHS[name]!) : ''),
});

/**
 * The library an `icon` attribute draws from. A name in the rails49 set comes
 * from it; any other name is Bootstrap's.
 */
export const libraryOf = (icon: string) => (icon in GLYPHS ? 'rails49' : 'default');
