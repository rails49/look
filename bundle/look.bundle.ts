// The single-file build, for a page that loads no Lit or Shoelace of its own.
// It carries Lit, the Shoelace components the chrome uses, look.css, and the
// Bootstrap glyphs the chrome draws, so it fetches nothing else.
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';
import chevronDown from '../node_modules/@shoelace-style/shoelace/dist/assets/icons/chevron-down.svg?raw';
import gear from '../node_modules/@shoelace-style/shoelace/dist/assets/icons/gear.svg?raw';
import power from '../node_modules/@shoelace-style/shoelace/dist/assets/icons/power.svg?raw';
import signStopFill from '../node_modules/@shoelace-style/shoelace/dist/assets/icons/sign-stop-fill.svg?raw';
import lookCss from '../dist/look.css?inline';
import { svgUrl } from '../src/icons.ts';

export * from '../src/index.ts';

const BOOTSTRAP: Record<string, string> = {
  'chevron-down': chevronDown,
  gear,
  power,
  'sign-stop-fill': signStopFill,
};

registerIconLibrary('default', {
  resolver: (name) => (name in BOOTSTRAP ? svgUrl(BOOTSTRAP[name]!) : ''),
});

const sheet = new CSSStyleSheet();
sheet.replaceSync(lookCss);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
