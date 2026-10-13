// PROTOTYPE. Each UI's real views, rail commands and band contents, with
// Bootstrap icon names from the missing-glyphs research.

export interface Command {
  icon: string;
  label: string;
  key?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface Group {
  name: string;
  items: Command[];
}

export interface View {
  id: string;
  label: string;
  icon: string;
  rail: Group[];
  /** A text press at the foot of the rail, like control's HOLD/GO. */
  press?: string;
}

export type BandItem =
  | { kind: "text"; text: string; quiet?: boolean }
  | { kind: "chip"; text: string }
  | { kind: "dot"; up: boolean; text: string }
  | { kind: "power"; on: boolean }
  | { kind: "presses"; items: string[]; at: string }
  | { kind: "stop" }
  | { kind: "gear" };

export interface Ui {
  id: string;
  name: string;
  /** What the band's left names (ADR-0012). */
  about: string;
  aboutDetail?: string;
  views: View[];
  bandRight: BandItem[];
}

const zoom: Group = {
  name: "View",
  items: [
    { icon: "zoom-out", label: "Zoom out", key: "−" },
    { icon: "zoom-in", label: "Zoom in", key: "+" },
    { icon: "fullscreen", label: "Fit", key: "0" },
  ],
};

export const UIS: Ui[] = [
  {
    id: "control",
    name: "control",
    about: "Gleis 49",
    views: [
      { id: "run", label: "Run", icon: "stoplights", rail: [zoom], press: "HOLD" },
      { id: "throttle", label: "Throttle", icon: "speedometer2", rail: [] },
      { id: "stock", label: "Stock", icon: "train-freight-front", rail: [] },
      {
        id: "edit",
        label: "Edit",
        icon: "pencil",
        rail: [
          {
            name: "View",
            items: [
              ...zoom.items,
              { icon: "layout-sidebar-reverse", label: "Netlist", key: "N" },
            ],
          },
          {
            name: "File",
            items: [
              { icon: "floppy", label: "Save", key: "⌘S" },
              { icon: "box-arrow-up", label: "Export SVG…" },
            ],
          },
          {
            name: "Edit",
            items: [
              { icon: "arrow-counterclockwise", label: "Undo", key: "⌘Z" },
              { icon: "arrow-clockwise", label: "Redo", key: "⇧⌘Z", disabled: true },
            ],
          },
        ],
      },
    ],
    bandRight: [
      { kind: "chip", text: "B3 sensor silent" },
      { kind: "text", text: "14:32", quiet: true },
      { kind: "gear" },
      { kind: "presses", items: ["ON", "STOP", "OFF"], at: "ON" },
    ],
  },
  {
    id: "dccex",
    name: "dcc-ex",
    about: "dcc-ex",
    aboutDetail: "v5.4.0 · Gleis 49",
    views: [
      { id: "monitor", label: "Monitor", icon: "terminal", rail: [] },
      { id: "releases", label: "Releases", icon: "lightning-charge", rail: [] },
      { id: "script", label: "Script", icon: "file-earmark-code", rail: [] },
      { id: "journal", label: "Journal", icon: "journal-text", rail: [] },
    ],
    bandRight: [
      { kind: "dot", up: true, text: "station answering" },
      { kind: "gear" },
      { kind: "power", on: true },
      { kind: "stop" },
    ],
  },
  {
    id: "occupancy",
    name: "occupancy",
    about: "Gleis 49",
    aboutDetail: "1:87 · yard.r49",
    views: [
      {
        id: "editor",
        label: "Label",
        icon: "image-fill",
        rail: [
          {
            name: "File",
            items: [
              { icon: "file-earmark-plus", label: "New .r49 Archive" },
              { icon: "folder2-open", label: "Open .r49 Archive" },
              { icon: "floppy", label: "Save" },
            ],
          },
          {
            name: "Edit",
            items: [
              { icon: "arrow-counterclockwise", label: "Undo" },
              { icon: "arrow-clockwise", label: "Nothing to redo", disabled: true },
            ],
          },
          {
            name: "Tools",
            items: [
              { icon: "crosshair", label: "Calibration point", active: true },
              { icon: "broadcast-pin", label: "Sensor" },
              { icon: "train-front", label: "Car" },
            ],
          },
        ],
      },
      { id: "live", label: "Live", icon: "camera-video-fill", rail: [] },
      { id: "diagnostics", label: "Diagnostics", icon: "clipboard-data", rail: [] },
    ],
    bandRight: [{ kind: "text", text: "detector ready", quiet: true }, { kind: "gear" }],
  },
];
