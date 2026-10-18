# look

The chrome shared by rails49's UIs: the band, the rail, the dialog shell and the theme layer.

## Language

**Press**:
A button in the chrome that fires an event when a person presses it: a command, a band press, the gear, the power toggle, the stop sign. Where each goes: [`docs/LOOK.md`](docs/LOOK.md#convention).
_Avoid_: button (for the concept), action

**Disabled**:
A press that fires nothing. It stays reachable by keyboard and hover so its tooltip can say why ([ADR-0001](docs/adr/0001-native-button-for-presses.md)).
_Avoid_: held, off, inactive

**Mark**:
The rails49 drawing at the band's far left: rails curving into the distance and `rails49`, or `49` where the window is narrow. It is a link to `rails49.org`, not a press. Where it goes: [`docs/LOOK.md`](docs/LOOK.md#convention).
_Avoid_: logo, brand, icon

**UI name**:
The short name of the UI that is showing, drawn on the band after the mark: `control`, `dccex`, `occupancy`. It is the UI's label under the installation's name. Where it goes: [`docs/LOOK.md`](docs/LOOK.md#convention).
_Avoid_: label, title

**Reason**:
The text that says why a press is disabled. It takes the label's place in the tooltip ([ADR-0001](docs/adr/0001-native-button-for-presses.md)).
_Avoid_: why, hint
