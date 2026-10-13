// Tests draw no Bootstrap glyphs, so Shoelace fetches nothing.
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

registerIconLibrary('default', { resolver: () => '' });
