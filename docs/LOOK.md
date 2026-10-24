# The look

What every rails49 UI's chrome means, and who draws it
([ADR-0016](https://github.com/rails49/.github/blob/main/docs/adr/0016-the-chrome-comes-from-look.md)).
This page says what each token means; the values are in
[`src/tokens.ts`](../src/tokens.ts), and neither restates the other. A change
to either ships in a release of this package.

## Who is bound

| UI | Takes |
|---|---|
| `control` | everything |
| `occupancy` | everything |
| dcc-ex UI | everything |
| landing page (`rails49.org`) | the band; no rail |
| installation page (`installation`) | the band; no rail |
| JMRI | nothing |

## Tokens

The chrome keeps these values in both themes.

| Token | What it is |
|---|---|
| `--band` | the band across the top |
| `--band-ink` | text and glyphs on the band |
| `--rail` | the rail down the left |
| `--rail-group` | a run of buttons that belong together on the rail |
| `--power-on` | track power on, or a connection up |
| `--stop` | the stop sign, track power stopped, a fault, or a connection down |

Red on the chrome means stop or a fault and nothing else.

## Sizes

| Value | What it is |
|---|---|
| `--rail-button` | every button on the rail; the minimum a thumb needs |
| `TURN_HEIGHT_PX` | window height at or below which the rail becomes a horizontal strip |
| `NARROW_WIDTH_PX` | window width at or below which the band draws the square mark and the rail becomes a horizontal strip ([ADR-0002](adr/0002-narrow-window-rail-becomes-a-strip.md)) |

## Theme

Both Shoelace themes are linked and `prefers-color-scheme` decides. No toggle
in the page. The work pane follows the theme; the chrome does not.

Typeface and type scale are Shoelace's theme's.

## Convention

- The chrome is a band across the top and a rail down the left. The band is
  about the whole of the system the UI is about. The rail carries what the
  current view offers, and exists wherever a UI has commands.
- The band's left starts with the mark, a link to rails49.org, then the UI
  name, then what the UI is about: the box or the loaded railroad. It may be
  pressed to change which. What the UI is about is left out where it would
  repeat the UI name or the mark
  ([ADR-0020](https://github.com/rails49/.github/blob/main/docs/adr/0020-the-bands-right-ends-with-the-gear-and-help.md)).
  The UI name and what the UI is about are set in one bold type. A thin
  vertical rule separates them; it shows only where both are shown.
- The band's right is, from left to right, the UI's items, the gear, then Help
  at the far right. The UI's items are what is true of the whole system the UI
  is about, pressable or not, in the order the UI chooses; track power and the
  stop sign are the rightmost of them. A press that acts on the current view
  goes on the rail. A UI with nothing to show there draws nothing, and a UI
  without settings shows no gear.
- Help links to the user docs of the UI that is showing, in a new tab. It is
  on every band. `look-band`'s `help` gives the address; without it Help
  links to `https://github.com/rails49/<UI name>`, or to
  `https://github.com/rails49` where there is no UI name.
- look places track power, the gear and Help, and nothing else on the right.
- Where the band does not fit, status text is cut short with "…" first. Then
  the band drops the UI name with the rule, then Help, then the gear, only as
  far as it must. What the UI is about is cut short last. The mark, the UI's
  presses and track power keep their size.
- A press with two states shows each by its glyph and tooltip, not by a
  colour.
- Switching views is the rail's first group.
- A colour says the same thing in every UI.
- A UI may name any Bootstrap icon. A drawn glyph is added to look.
