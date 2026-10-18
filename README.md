# look

The band, the rail, the dialogs and the widget styling shared by rails49's
UIs: `control`, `occupancy`, the dcc-ex UI, the landing page and the
installation page. Each of them draws its chrome from this package instead of
writing its own. Lit elements on Shoelace, MIT. What the chrome means and who
takes it is in [`docs/LOOK.md`](docs/LOOK.md). The work is tracked on this
repository's `wayfinder:map` issue.

## A built UI

```json
"dependencies": {
  "@rails49/look": "github:rails49/look#v0.6.1",
  "@shoelace-style/shoelace": "^2.20.1",
  "lit": "^3.2.1"
}
```

```ts
import '@rails49/look';
import '@rails49/look/look.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath('/shoelace'); // where the UI serves Shoelace's assets
```

```html
<look-shell>
  <look-band ui="control">
    <look-about name="otira" detail="N scale"></look-about>
    <look-reading>3 trains</look-reading>
    <look-gear></look-gear>
    <look-power state="on"></look-power>
  </look-band>
  <look-rail>
    <look-view name="edit" icon="pencil" label="Edit" current></look-view>
    <look-view name="throttle" icon="throttle" label="Throttle"></look-view>
    <look-group>
      <look-command icon="arrow-counterclockwise" label="Undo" key="Mod+Z"></look-command>
    </look-group>
  </look-rail>
  <my-editor></my-editor>
</look-shell>
```

Each work-pane component puts `lookTheme` first in its `static styles`. The
elements, their attributes and events are in
[The package's elements, slots, properties and events](https://github.com/rails49/look/issues/7#issuecomment-6153278540).

## A test that presses

```ts
import { press } from '@rails49/look/testing';

await command.updateComplete;
press(command); // look-command, look-band-press, look-gear, look-view
press(command, { shiftKey: true }); // look-press carries { shiftKey: true }
press(power, 'toggle'); // look-power: 'toggle' or 'stop'
```

`press()` clicks the button the element draws, as a person would; a disabled
press fires nothing. A test that presses this way reads no look element's
shadow root, so it keeps passing when look changes what it draws.
`@rails49/look/testing` is not part of `@rails49/look` or `look.bundle.js`.

## A static page

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/rails49/look@v0.5.0/dist/look.bundle.js"></script>
```

`dist/look.bundle.js` holds Lit, the Shoelace components the chrome uses,
`look.css` and the chrome's glyphs. A page that loads it loads no other copy of
the elements.

## The gate

```sh
look-check src index.html                                   # a built UI
pnpm --package=github:rails49/look#v0.6.1 dlx look-check page  # a static page
```

It fails on a selector naming a `look-` element, on setting a package token or
a `--sl-*` property, and on `sl-*::part()` in app code.

## Working here

```sh
pnpm install
pnpm check && pnpm test && pnpm build   # commit dist/ with the source
pnpm dev                                # index.html, the chrome in a browser
```

A release is a `v*` tag, pushed after looking at the chrome with `pnpm dev`.
`.github/workflows/release.yml` then opens a bump pull request in each consumer
that takes look, and waits for each to merge itself on a green gate.
