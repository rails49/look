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

## Theme

Both Shoelace themes are linked and `prefers-color-scheme` decides. No toggle
in the page. The work pane follows the theme; the chrome does not.

Typeface and type scale are Shoelace's theme's.

## Convention

- The chrome is a band across the top and a rail down the left. The band is
  about the whole of the system the UI is about. The rail carries what the
  current view offers, and exists wherever a UI has commands.
- The band's left names what the UI is about: the UI, the box or the loaded
  railroad. It may be pressed to change which.
- The band's right holds what is true of the whole system the UI is about,
  pressable or not, in a fixed order: status, then the gear, then track power
  at the far right. A press that acts on the current view goes on the rail. A
  UI with nothing to show there draws nothing.
- Switching views is the rail's first group.
- A colour says the same thing in every UI.
- Only this package adds glyphs to the chrome.
