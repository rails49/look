# PROTOTYPE: where the view switch and the rail sit

Throwaway. Answers [Where the view switch and the rail sit, in occupancy's look](https://github.com/rails49/look/issues/5). Never merged.

    cd prototype/view-switch && pnpm install && pnpm prototype

URL parameters, also set by the bar at the bottom:

- `variant`: `A` band pill (occupancy today), `B` rail top (ADR-0012), `C` band tabs with words, `D` menu on the band's name.
- `ui`: `control`, `dccex`, `occupancy`.
- `view`: the view shown; click the chrome to change it.

Keys: left and right arrows cycle the variant, `1` `2` `3` pick the UI. Make the window shorter than 640px to see the strip.

The chrome is occupancy's styling copied as is: 60px band, 78px rail, Bootstrap icons, `sl-tooltip`, hover scale, shadows. The throttle icon is a stand-in until the rails49 glyph exists.
