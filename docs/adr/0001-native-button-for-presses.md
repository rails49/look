# A native button for every press

Every press is a native `<button>` with an `sl-icon` inside, drawn by `press()` in `src/press.ts`, not an `sl-icon-button`. A disabled `sl-icon-button` takes no pointer events, so its tooltip cannot open to show the reason; it passes no `aria-pressed` or `aria-disabled` to the button inside it; and its focus ring, in the theme's band blue, does not show on the band. Working around these took a class that faked the disabled look, a reach into Shoelace's shadow root, and app tests that went two shadow roots deep.
