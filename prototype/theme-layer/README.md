# PROTOTYPE: what the theme layer sets for work-pane widgets and dialogs

Throwaway. Answers [What the theme layer sets for work-pane widgets and dialogs](https://github.com/rails49/look/issues/6). Never merged.

    cd prototype/theme-layer && pnpm install && pnpm prototype

The chrome is the one decided in [Where the view switch and the rail sit](https://github.com/rails49/look/issues/5), variant D. The work pane holds each UI's real widgets and strings, all redrawn as Shoelace elements, so one layer styles them. control's and dcc-ex's plain HTML controls become `sl-*` here.

URL parameters, also set by the bar at the bottom:

- `layer`: `A` Shoelace as shipped, `B` band blue at desktop size, `C` touch size and always dark. The CSS is in `src/layers/`.
- `scheme`: `os` (default), `light`, `dark`. Layer C ignores it.
- `ui`: `control`, `dccex`, `occupancy`. `view`: click the rail.
- `dialog`: one of the UI's dialogs, opened from the bar. dcc-ex has none today; "Flash (as a dialog)" shows its inline confirm as one.

Keys: left and right arrows cycle the layer, `1` `2` `3` pick the UI.

How the layer reaches the widgets: one `CSSStyleSheet`, adopted by the document for the custom properties and by every work-pane component for the `::part()` rules (`src/layer.ts`). A `::part()` rule in a document stylesheet does not reach a widget inside a component's shadow root.
