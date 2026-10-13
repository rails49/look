# Which glyphs control and dcc-ex need that Bootstrap Icons lacks

Research for [rails49/look#4](https://github.com/rails49/look/issues/4).

## Answer

Two glyphs need a rails49 version, both from `control`: rotate and throttle.
Every other glyph in `control` and the dcc-ex UI has a Bootstrap icon that
shows the same thing. The rails49 set is registered with Shoelace's
`registerIconLibrary()`, with a resolver that returns a `data:` URL built from
an SVG string bundled in the package. Nothing is fetched from another origin.

## Sources

Read at these commits:

- control [`a863abd`](https://github.com/rails49/control/tree/a863abdac2b807d536d9ff9b4f15cc6deff7965b):
  `ui/src/ui/icons.ts`, `ui/src/ui/tc-rail.ts`, `ui/src/ui/tc-header.ts`,
  `ui/src/model/commands.ts`, `ui/src/model/views.ts`.
- dccex [`2cf5036`](https://github.com/rails49/dccex/tree/2cf5036d584ddafc7a18ff9a5901126fed2647a2):
  `ui/src/ui/dccex-icon.ts` and every `@mdi/js` import in `ui/src`
  (`dccex-band.ts`, `dccex-rail.ts`, `dccex-tiles.ts`, `dccex-monitor.ts`).
- occupancy [`bc32431`](https://github.com/rails49/occupancy/tree/bc32431f2e8ab78780d01217a606a603bac6be30):
  the Bootstrap names it uses, for reference.
- Shoelace [`v2.20.1`](https://github.com/shoelace-style/shoelace/tree/v2.20.1):
  `src/components/icon/library.ts`, `library.system.ts`,
  `icon.component.ts`, `scripts/make-icons.js`, `package-lock.json`,
  `docs/pages/components/icon.md`.
- The installed package:
  `occupancy/node_modules/@shoelace-style/shoelace` (version 2.20.1),
  `dist/assets/icons/`.

## Which Bootstrap Icons Shoelace 2.20.1 ships

Shoelace 2.20.1 ships Bootstrap Icons 1.11.3: 2,050 SVG files, plus `LICENSE`
and `icons.json`.

- `scripts/make-icons.js` copies the icons of the `bootstrap-icons` version
  installed in Shoelace's `node_modules`.
- `package-lock.json` at `v2.20.1` pins `bootstrap-icons` to 1.11.3.
- `dist/assets/icons/` in the installed package has 2,050 `.svg` files.

The current release on npm is 1.13.2 (2,078 icons). It adds nothing
railway-related: its only matches for train, signal or stoplight are the
same `signal`, `stoplights` and `train-*-front` icons 1.11.3 has. Every name
below exists in 1.11.3.

## control

`control` draws 18 glyphs by hand in `ui/src/ui/icons.ts`, as stroked
outlines on a 16-unit square. Seventeen are drawn: twelve on the rail, one
per command (`GLYPHS`, `tc-rail.ts:144`), four in the view selector (`ICONS`,
`tc-rail.ts:104`), and the gear in the band (`tc-header.ts:205`). `OPEN` is
defined and not used anywhere.

| Glyph | Where used | Meaning | Bootstrap icon | Note |
| --- | --- | --- | --- | --- |
| `SAVE` | rail, command `save` | Save ⌘S: write the drawing to the store | `floppy` | occupancy's save. |
| `EXPORT` | rail, command `export-svg` | Export SVG…: the drawing out as a file | `box-arrow-up` | Same tray and upward arrow. |
| `UNDO` | rail, command `undo` | Undo ⌘Z | `arrow-counterclockwise` | occupancy's undo (`rr-toolbar.ts:208`). |
| `REDO` | rail, command `redo` | Redo ⇧⌘Z | `arrow-clockwise` | occupancy's redo (`rr-toolbar.ts:217`). |
| `ROTATE` | rail, command `rotate` | Rotate the selection a quarter turn | needs rails49 glyph | The only close Bootstrap shape is `arrow-clockwise`, which is redo on the same rail. `arrow-repeat` reads as refresh. |
| `FLIP` | rail, command `flip` | Mirror the selection | `symmetry-vertical` | Two triangles either side of a vertical axis, as control draws it. |
| `DELETE` | rail, command `delete` | Delete the selection ⌫ | `trash3` | |
| `PROPERTIES` | rail, command `properties` | Properties…: the selected symbol's fields | `sliders` | Same shape: lines with knobs. |
| `ZOOM_IN` | rail, command `zoom-in` | Zoom in + | `zoom-in` | |
| `ZOOM_OUT` | rail, command `zoom-out` | Zoom out − | `zoom-out` | |
| `FIT` | rail, command `fit` | Fit 0: whole drawing in view | `fullscreen` | Same four corner brackets. |
| `NETLIST` | rail, command `netlist` | Netlist N: show or hide the netlist pane on the right | `layout-sidebar-reverse` | A sheet with a column on its right side. |
| `EDIT` | view selector, view `edit` | The editor view | `pencil` | |
| `RUN` | view selector, view `run` | The run view: the signals the dispatcher sets | `stoplights` | A colour-light signal head. control draws a single lamp on a post; both are railway signals. |
| `THROTTLE` | view selector, view `throttle` | The throttle view: drive a train with a lever | needs rails49 glyph | `speedometer2` shows a gauge that reads speed, not the lever that sets it. `sliders2-vertical` is close to `sliders`, which is Properties on the same rail. `joystick` is a game controller. |
| `STOCK` | view selector, view `stock` | The stock view: the cars a railroad owns and the trains made from them | `train-freight-front` | Bootstrap draws trains only from the front. occupancy already uses `train-front` for a car in its tool palette. |
| `GEAR` | band, Settings button | Settings for all of control | `gear` | occupancy's settings (`rr-header.ts:197`). |
| `OPEN` | not used | A folder: the railroads in the store | `folder2-open` | occupancy's open (`rr-toolbar.ts:190`). Nothing in control draws it. |

## dcc-ex UI

The dcc-ex UI draws `@mdi/js` paths (Material Design Icons, filled, 24-unit
square) through `<dccex-icon>`. It imports eight paths, used in nine places.

| Glyph | Where used | Meaning | Bootstrap icon | Note |
| --- | --- | --- | --- | --- |
| `mdiPower` | band, power button (`dccex-band.ts:137`) | Switch track power | `power` | |
| `mdiPower` | tiles, one per track (`dccex-tiles.ts:63`) | Whether the track has power | `power` | An indicator, not a button. Its colour says on or off. |
| `mdiPause` | monitor controls (`dccex-monitor.ts:290`) | pause: hold the conversation on screen | `pause-fill` | The mdi glyph is filled. Shoelace's system library also has `pause-fill`. |
| `mdiPlay` | monitor controls (`dccex-monitor.ts:290`) | resume: let the conversation run again | `play-fill` | As above. |
| `mdiNotificationClearAll` | monitor controls (`dccex-monitor.ts:299`) | clear: empty the conversation on screen and the queue behind it | `eraser` | Nothing is sent to the station. `trash3` would say delete, which this is not. |
| `mdiConsole` | rail, view `monitor` (`dccex-rail.ts:48`) | The monitor: the station's conversation | `terminal` | |
| `mdiFlashAlert` | rail, view `releases` (`dccex-rail.ts:49`) | The releases view: where firmware is written onto the station | `lightning-charge` | Bootstrap has no bolt with a warning mark. The bolt carries "flash". |
| `mdiScriptTextOutline` | rail, view `script` (`dccex-rail.ts:50`) | The script view: the railroad's own commands | `file-earmark-code` | |
| `mdiNotebookOutline` | rail, view `journal` (`dccex-rail.ts:51`) | The journal: the record of what the station said about power | `journal-text` | |

None of these needs a rails49 glyph.

## The rails49 set

| Name | Replaces | Starting point |
| --- | --- | --- |
| `rotate` | control's `ROTATE` | control's drawing: an arrow most of the way round a circle. |
| `throttle` | control's `THROTTLE` | control's drawing: a lever on its quadrant. |

Bootstrap icons are filled shapes on a 16-unit square with
`fill="currentColor"`. control's glyphs are 1.4-unit strokes. The two rails49
glyphs need redrawing in Bootstrap's style so they sit beside Bootstrap icons
on the same rail. Each SVG should set `fill="currentColor"` itself, so the
library needs no mutator.

If a prototype later finds `stoplights` or `train-freight-front` wrong for
railway use, a rails49 signal or wagon is added the same way.

## Registering the rails49 set offline

Use a resolver that returns a `data:` URL. This is how Shoelace registers its
own `system` library, which it ships with no asset files.

```ts
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";

const GLYPHS: Record<string, string> = {
  rotate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">…</svg>`,
  throttle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">…</svg>`,
};

registerIconLibrary("rails49", {
  resolver: (name) =>
    name in GLYPHS ? `data:image/svg+xml,${encodeURIComponent(GLYPHS[name])}` : "",
});
```

A UI then writes `<sl-icon library="rails49" name="throttle"></sl-icon>`, or
`<sl-icon-button library="rails49" name="throttle">`.

How Shoelace 2.20.1 handles this, from its source:

- `registerIconLibrary(name, { resolver, mutator?, spriteSheet? })` adds the
  library to a registry and redraws every `<sl-icon>` already using that
  library name (`library.ts:33-48`). Registering after icons are on the page
  works.
- `<sl-icon>` asks the library's resolver for a URL, then calls
  `fetch(url, { mode: 'cors' })` (`icon.component.ts:53`). A `data:` URL is
  answered by the browser itself, with no network request. The result is
  parsed as HTML; its first element must be `<svg>` (`icon.component.ts:60-70`).
- An empty string from the resolver draws nothing and makes no request
  (`icon.component.ts:149`).
- The mutator, if given, runs on each SVG after it loads
  (`icon.component.ts:201`). It is not needed when the SVG sets its own
  `fill="currentColor"`.
- The `system` library returns
  `` `data:image/svg+xml,${encodeURIComponent(icons[name])}` ``
  (`library.system.ts:127`), and the docs say it "does not rely on physical
  assets" (`icon.md:670`).

Why a `data:` URL and not the other two forms:

- A same-origin path (`resolver: name => "/look/icons/" + name + ".svg"`)
  works, but each UI's build must copy the files to that path, as occupancy
  copies Shoelace's assets with `vite-plugin-static-copy` (`vite.config.ts:96`).
  The single-file build for static pages has nowhere to put them.
- `spriteSheet: true` renders `<use href="…">` against one sprite file. It
  also needs a same-origin file, and it emits no `sl-load` or `sl-error`
  (`icon.component.ts:29-30, 44`).

The `data:` form keeps the glyphs inside the package's JavaScript, so both the
pnpm dependency and the single-file build carry them.

One condition: if a UI later sets a Content-Security-Policy, its
`connect-src` must allow `data:`, because `<sl-icon>` loads the icon with
`fetch`. None of control, dccex or occupancy sets one today.

The default Bootstrap library is separate. occupancy keeps it offline by
copying `dist/assets` to `/shoelace` and calling `setBasePath('/shoelace')`
(`rr-app.ts:21`). That part is not this ticket's question.
