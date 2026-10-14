var Ht = "";
function go(t) {
  Ht = t;
}
function Cs(t = "") {
  if (!Ht) {
    const e = [...document.getElementsByTagName("script")], o = e.find((s) => s.hasAttribute("data-shoelace"));
    if (o)
      go(o.getAttribute("data-shoelace"));
    else {
      const s = e.find((r) => /shoelace(\.min)?\.js($|\?)/.test(r.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(r.src));
      let l = "";
      s && (l = s.getAttribute("src")), go(l.split("/").slice(0, -1).join("/"));
    }
  }
  return Ht.replace(/\/$/, "") + (t ? `/${t.replace(/^\//, "")}` : "");
}
var Es = {
  name: "default",
  resolver: (t) => Cs(`assets/icons/${t}.svg`)
}, Ss = Es, mo = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
}, zs = {
  name: "system",
  resolver: (t) => t in mo ? `data:image/svg+xml,${encodeURIComponent(mo[t])}` : ""
}, Ps = zs, ct = [Ss, Ps], ht = [];
function Os(t) {
  ht.push(t);
}
function Ls(t) {
  ht = ht.filter((e) => e !== t);
}
function vo(t) {
  return ct.find((e) => e.name === t);
}
function Xo(t, e) {
  Rs(t), ct.push({
    name: t,
    resolver: e.resolver,
    mutator: e.mutator,
    spriteSheet: e.spriteSheet
  }), ht.forEach((o) => {
    o.library === t && o.setIcon();
  });
}
function Rs(t) {
  ct = ct.filter((e) => e.name !== t);
}
var Yo = Object.defineProperty, Ts = Object.defineProperties, Ms = Object.getOwnPropertyDescriptor, Ds = Object.getOwnPropertyDescriptors, bo = Object.getOwnPropertySymbols, Bs = Object.prototype.hasOwnProperty, Ns = Object.prototype.propertyIsEnumerable, Pt = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t), Gt = (t) => {
  throw TypeError(t);
}, yo = (t, e, o) => e in t ? Yo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o, yt = (t, e) => {
  for (var o in e || (e = {}))
    Bs.call(e, o) && yo(t, o, e[o]);
  if (bo)
    for (var o of bo(e))
      Ns.call(e, o) && yo(t, o, e[o]);
  return t;
}, Zo = (t, e) => Ts(t, Ds(e)), g = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Ms(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Yo(e, o, l), l;
}, Go = (t, e, o) => e.has(t) || Gt("Cannot " + o), Fs = (t, e, o) => (Go(t, e, "read from private field"), e.get(t)), Hs = (t, e, o) => e.has(t) ? Gt("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, o), js = (t, e, o, s) => (Go(t, e, "write to private field"), e.set(t, o), o), Us = function(t, e) {
  this[0] = t, this[1] = e;
}, Is = (t) => {
  var e = t[Pt("asyncIterator")], o = !1, s, l = {};
  return e == null ? (e = t[Pt("iterator")](), s = (r) => l[r] = (i) => e[r](i)) : (e = e.call(t), s = (r) => l[r] = (i) => {
    if (o) {
      if (o = !1, r === "throw") throw i;
      return i;
    }
    return o = !0, {
      done: !1,
      value: new Us(new Promise((n) => {
        var a = e[r](i);
        a instanceof Object || Gt("Object expected"), n(a);
      }), 1)
    };
  }), l[Pt("iterator")] = () => l, s("next"), "throw" in e ? s("throw") : l.throw = (r) => {
    throw r;
  }, "return" in e && s("return"), l;
};
const Vs = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>`, Ws = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
</svg>`, qs = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
  <path d="M7.5 1v7h1V1z"/>
  <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
</svg>`, Ks = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sign-stop-fill" viewBox="0 0 16 16">
  <path d="M10.371 8.277v-.553c0-.827-.422-1.234-.987-1.234-.572 0-.99.407-.99 1.234v.553c0 .83.418 1.237.99 1.237.565 0 .987-.408.987-1.237m2.586-.24c.463 0 .735-.272.735-.744s-.272-.741-.735-.741h-.774v1.485z"/>
  <path d="M4.893 0a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146A.5.5 0 0 0 11.107 0zM3.16 10.08c-.931 0-1.447-.493-1.494-1.132h.653c.065.346.396.583.891.583.524 0 .83-.246.83-.62 0-.303-.203-.467-.637-.572l-.656-.164c-.61-.147-.978-.51-.978-1.078 0-.706.597-1.184 1.444-1.184.853 0 1.386.475 1.436 1.087h-.645c-.064-.32-.352-.542-.797-.542-.472 0-.77.246-.77.6 0 .261.196.437.553.522l.654.161c.673.164 1.06.487 1.06 1.11 0 .736-.574 1.228-1.544 1.228Zm3.427-3.51V10h-.665V6.57H4.753V6h3.006v.568H6.587Zm4.458 1.16v.544c0 1.131-.636 1.805-1.661 1.805-1.026 0-1.664-.674-1.664-1.805V7.73c0-1.136.638-1.807 1.664-1.807s1.66.674 1.66 1.807ZM11.52 6h1.535c.82 0 1.316.55 1.316 1.292 0 .747-.501 1.289-1.321 1.289h-.865V10h-.665V6.001Z"/>
</svg>`, Xs = ':root,:host,.sl-theme-light{color-scheme:light;--sl-color-gray-50: hsl(0 0% 97.5%);--sl-color-gray-100: hsl(240 4.8% 95.9%);--sl-color-gray-200: hsl(240 5.9% 90%);--sl-color-gray-300: hsl(240 4.9% 83.9%);--sl-color-gray-400: hsl(240 5% 64.9%);--sl-color-gray-500: hsl(240 3.8% 46.1%);--sl-color-gray-600: hsl(240 5.2% 33.9%);--sl-color-gray-700: hsl(240 5.3% 26.1%);--sl-color-gray-800: hsl(240 3.7% 15.9%);--sl-color-gray-900: hsl(240 5.9% 10%);--sl-color-gray-950: hsl(240 7.3% 8%);--sl-color-red-50: hsl(0 85.7% 97.3%);--sl-color-red-100: hsl(0 93.3% 94.1%);--sl-color-red-200: hsl(0 96.3% 89.4%);--sl-color-red-300: hsl(0 93.5% 81.8%);--sl-color-red-400: hsl(0 90.6% 70.8%);--sl-color-red-500: hsl(0 84.2% 60.2%);--sl-color-red-600: hsl(0 72.2% 50.6%);--sl-color-red-700: hsl(0 73.7% 41.8%);--sl-color-red-800: hsl(0 70% 35.3%);--sl-color-red-900: hsl(0 62.8% 30.6%);--sl-color-red-950: hsl(0 60% 19.6%);--sl-color-orange-50: hsl(33.3 100% 96.5%);--sl-color-orange-100: hsl(34.3 100% 91.8%);--sl-color-orange-200: hsl(32.1 97.7% 83.1%);--sl-color-orange-300: hsl(30.7 97.2% 72.4%);--sl-color-orange-400: hsl(27 96% 61%);--sl-color-orange-500: hsl(24.6 95% 53.1%);--sl-color-orange-600: hsl(20.5 90.2% 48.2%);--sl-color-orange-700: hsl(17.5 88.3% 40.4%);--sl-color-orange-800: hsl(15 79.1% 33.7%);--sl-color-orange-900: hsl(15.3 74.6% 27.8%);--sl-color-orange-950: hsl(15.2 69.1% 19%);--sl-color-amber-50: hsl(48 100% 96.1%);--sl-color-amber-100: hsl(48 96.5% 88.8%);--sl-color-amber-200: hsl(48 96.6% 76.7%);--sl-color-amber-300: hsl(45.9 96.7% 64.5%);--sl-color-amber-400: hsl(43.3 96.4% 56.3%);--sl-color-amber-500: hsl(37.7 92.1% 50.2%);--sl-color-amber-600: hsl(32.1 94.6% 43.7%);--sl-color-amber-700: hsl(26 90.5% 37.1%);--sl-color-amber-800: hsl(22.7 82.5% 31.4%);--sl-color-amber-900: hsl(21.7 77.8% 26.5%);--sl-color-amber-950: hsl(22.9 74.1% 16.7%);--sl-color-yellow-50: hsl(54.5 91.7% 95.3%);--sl-color-yellow-100: hsl(54.9 96.7% 88%);--sl-color-yellow-200: hsl(52.8 98.3% 76.9%);--sl-color-yellow-300: hsl(50.4 97.8% 63.5%);--sl-color-yellow-400: hsl(47.9 95.8% 53.1%);--sl-color-yellow-500: hsl(45.4 93.4% 47.5%);--sl-color-yellow-600: hsl(40.6 96.1% 40.4%);--sl-color-yellow-700: hsl(35.5 91.7% 32.9%);--sl-color-yellow-800: hsl(31.8 81% 28.8%);--sl-color-yellow-900: hsl(28.4 72.5% 25.7%);--sl-color-yellow-950: hsl(33.1 69% 13.9%);--sl-color-lime-50: hsl(78.3 92% 95.1%);--sl-color-lime-100: hsl(79.6 89.1% 89.2%);--sl-color-lime-200: hsl(80.9 88.5% 79.6%);--sl-color-lime-300: hsl(82 84.5% 67.1%);--sl-color-lime-400: hsl(82.7 78% 55.5%);--sl-color-lime-500: hsl(83.7 80.5% 44.3%);--sl-color-lime-600: hsl(84.8 85.2% 34.5%);--sl-color-lime-700: hsl(85.9 78.4% 27.3%);--sl-color-lime-800: hsl(86.3 69% 22.7%);--sl-color-lime-900: hsl(87.6 61.2% 20.2%);--sl-color-lime-950: hsl(86.5 60.6% 13.9%);--sl-color-green-50: hsl(138.5 76.5% 96.7%);--sl-color-green-100: hsl(140.6 84.2% 92.5%);--sl-color-green-200: hsl(141 78.9% 85.1%);--sl-color-green-300: hsl(141.7 76.6% 73.1%);--sl-color-green-400: hsl(141.9 69.2% 58%);--sl-color-green-500: hsl(142.1 70.6% 45.3%);--sl-color-green-600: hsl(142.1 76.2% 36.3%);--sl-color-green-700: hsl(142.4 71.8% 29.2%);--sl-color-green-800: hsl(142.8 64.2% 24.1%);--sl-color-green-900: hsl(143.8 61.2% 20.2%);--sl-color-green-950: hsl(144.3 60.7% 12%);--sl-color-emerald-50: hsl(151.8 81% 95.9%);--sl-color-emerald-100: hsl(149.3 80.4% 90%);--sl-color-emerald-200: hsl(152.4 76% 80.4%);--sl-color-emerald-300: hsl(156.2 71.6% 66.9%);--sl-color-emerald-400: hsl(158.1 64.4% 51.6%);--sl-color-emerald-500: hsl(160.1 84.1% 39.4%);--sl-color-emerald-600: hsl(161.4 93.5% 30.4%);--sl-color-emerald-700: hsl(162.9 93.5% 24.3%);--sl-color-emerald-800: hsl(163.1 88.1% 19.8%);--sl-color-emerald-900: hsl(164.2 85.7% 16.5%);--sl-color-emerald-950: hsl(164.3 87.5% 9.4%);--sl-color-teal-50: hsl(166.2 76.5% 96.7%);--sl-color-teal-100: hsl(167.2 85.5% 89.2%);--sl-color-teal-200: hsl(168.4 83.8% 78.2%);--sl-color-teal-300: hsl(170.6 76.9% 64.3%);--sl-color-teal-400: hsl(172.5 66% 50.4%);--sl-color-teal-500: hsl(173.4 80.4% 40%);--sl-color-teal-600: hsl(174.7 83.9% 31.6%);--sl-color-teal-700: hsl(175.3 77.4% 26.1%);--sl-color-teal-800: hsl(176.1 69.4% 21.8%);--sl-color-teal-900: hsl(175.9 60.8% 19%);--sl-color-teal-950: hsl(176.5 58.6% 11.4%);--sl-color-cyan-50: hsl(183.2 100% 96.3%);--sl-color-cyan-100: hsl(185.1 95.9% 90.4%);--sl-color-cyan-200: hsl(186.2 93.5% 81.8%);--sl-color-cyan-300: hsl(187 92.4% 69%);--sl-color-cyan-400: hsl(187.9 85.7% 53.3%);--sl-color-cyan-500: hsl(188.7 94.5% 42.7%);--sl-color-cyan-600: hsl(191.6 91.4% 36.5%);--sl-color-cyan-700: hsl(192.9 82.3% 31%);--sl-color-cyan-800: hsl(194.4 69.6% 27.1%);--sl-color-cyan-900: hsl(196.4 63.6% 23.7%);--sl-color-cyan-950: hsl(196.8 61% 16.1%);--sl-color-sky-50: hsl(204 100% 97.1%);--sl-color-sky-100: hsl(204 93.8% 93.7%);--sl-color-sky-200: hsl(200.6 94.4% 86.1%);--sl-color-sky-300: hsl(199.4 95.5% 73.9%);--sl-color-sky-400: hsl(198.4 93.2% 59.6%);--sl-color-sky-500: hsl(198.6 88.7% 48.4%);--sl-color-sky-600: hsl(200.4 98% 39.4%);--sl-color-sky-700: hsl(201.3 96.3% 32.2%);--sl-color-sky-800: hsl(201 90% 27.5%);--sl-color-sky-900: hsl(202 80.3% 23.9%);--sl-color-sky-950: hsl(202.3 73.8% 16.5%);--sl-color-blue-50: hsl(213.8 100% 96.9%);--sl-color-blue-100: hsl(214.3 94.6% 92.7%);--sl-color-blue-200: hsl(213.3 96.9% 87.3%);--sl-color-blue-300: hsl(211.7 96.4% 78.4%);--sl-color-blue-400: hsl(213.1 93.9% 67.8%);--sl-color-blue-500: hsl(217.2 91.2% 59.8%);--sl-color-blue-600: hsl(221.2 83.2% 53.3%);--sl-color-blue-700: hsl(224.3 76.3% 48%);--sl-color-blue-800: hsl(225.9 70.7% 40.2%);--sl-color-blue-900: hsl(224.4 64.3% 32.9%);--sl-color-blue-950: hsl(226.2 55.3% 18.4%);--sl-color-indigo-50: hsl(225.9 100% 96.7%);--sl-color-indigo-100: hsl(226.5 100% 93.9%);--sl-color-indigo-200: hsl(228 96.5% 88.8%);--sl-color-indigo-300: hsl(229.7 93.5% 81.8%);--sl-color-indigo-400: hsl(234.5 89.5% 73.9%);--sl-color-indigo-500: hsl(238.7 83.5% 66.7%);--sl-color-indigo-600: hsl(243.4 75.4% 58.6%);--sl-color-indigo-700: hsl(244.5 57.9% 50.6%);--sl-color-indigo-800: hsl(243.7 54.5% 41.4%);--sl-color-indigo-900: hsl(242.2 47.4% 34.3%);--sl-color-indigo-950: hsl(243.5 43.6% 22.9%);--sl-color-violet-50: hsl(250 100% 97.6%);--sl-color-violet-100: hsl(251.4 91.3% 95.5%);--sl-color-violet-200: hsl(250.5 95.2% 91.8%);--sl-color-violet-300: hsl(252.5 94.7% 85.1%);--sl-color-violet-400: hsl(255.1 91.7% 76.3%);--sl-color-violet-500: hsl(258.3 89.5% 66.3%);--sl-color-violet-600: hsl(262.1 83.3% 57.8%);--sl-color-violet-700: hsl(263.4 70% 50.4%);--sl-color-violet-800: hsl(263.4 69.3% 42.2%);--sl-color-violet-900: hsl(263.5 67.4% 34.9%);--sl-color-violet-950: hsl(265.1 61.5% 21.4%);--sl-color-purple-50: hsl(270 100% 98%);--sl-color-purple-100: hsl(268.7 100% 95.5%);--sl-color-purple-200: hsl(268.6 100% 91.8%);--sl-color-purple-300: hsl(269.2 97.4% 85.1%);--sl-color-purple-400: hsl(270 95.2% 75.3%);--sl-color-purple-500: hsl(270.7 91% 65.1%);--sl-color-purple-600: hsl(271.5 81.3% 55.9%);--sl-color-purple-700: hsl(272.1 71.7% 47.1%);--sl-color-purple-800: hsl(272.9 67.2% 39.4%);--sl-color-purple-900: hsl(273.6 65.6% 32%);--sl-color-purple-950: hsl(276 59.5% 16.5%);--sl-color-fuchsia-50: hsl(289.1 100% 97.8%);--sl-color-fuchsia-100: hsl(287 100% 95.5%);--sl-color-fuchsia-200: hsl(288.3 95.8% 90.6%);--sl-color-fuchsia-300: hsl(291.1 93.1% 82.9%);--sl-color-fuchsia-400: hsl(292 91.4% 72.5%);--sl-color-fuchsia-500: hsl(292.2 84.1% 60.6%);--sl-color-fuchsia-600: hsl(293.4 69.5% 48.8%);--sl-color-fuchsia-700: hsl(294.7 72.4% 39.8%);--sl-color-fuchsia-800: hsl(295.4 70.2% 32.9%);--sl-color-fuchsia-900: hsl(296.7 63.6% 28%);--sl-color-fuchsia-950: hsl(297.1 56.8% 14.5%);--sl-color-pink-50: hsl(327.3 73.3% 97.1%);--sl-color-pink-100: hsl(325.7 77.8% 94.7%);--sl-color-pink-200: hsl(325.9 84.6% 89.8%);--sl-color-pink-300: hsl(327.4 87.1% 81.8%);--sl-color-pink-400: hsl(328.6 85.5% 70.2%);--sl-color-pink-500: hsl(330.4 81.2% 60.4%);--sl-color-pink-600: hsl(333.3 71.4% 50.6%);--sl-color-pink-700: hsl(335.1 77.6% 42%);--sl-color-pink-800: hsl(335.8 74.4% 35.3%);--sl-color-pink-900: hsl(335.9 69% 30.4%);--sl-color-pink-950: hsl(336.2 65.4% 15.9%);--sl-color-rose-50: hsl(355.7 100% 97.3%);--sl-color-rose-100: hsl(355.6 100% 94.7%);--sl-color-rose-200: hsl(352.7 96.1% 90%);--sl-color-rose-300: hsl(352.6 95.7% 81.8%);--sl-color-rose-400: hsl(351.3 94.5% 71.4%);--sl-color-rose-500: hsl(349.7 89.2% 60.2%);--sl-color-rose-600: hsl(346.8 77.2% 49.8%);--sl-color-rose-700: hsl(345.3 82.7% 40.8%);--sl-color-rose-800: hsl(343.4 79.7% 34.7%);--sl-color-rose-900: hsl(341.5 75.5% 30.4%);--sl-color-rose-950: hsl(341.3 70.1% 17.1%);--sl-color-primary-50: var(--sl-color-sky-50);--sl-color-primary-100: var(--sl-color-sky-100);--sl-color-primary-200: var(--sl-color-sky-200);--sl-color-primary-300: var(--sl-color-sky-300);--sl-color-primary-400: var(--sl-color-sky-400);--sl-color-primary-500: var(--sl-color-sky-500);--sl-color-primary-600: var(--sl-color-sky-600);--sl-color-primary-700: var(--sl-color-sky-700);--sl-color-primary-800: var(--sl-color-sky-800);--sl-color-primary-900: var(--sl-color-sky-900);--sl-color-primary-950: var(--sl-color-sky-950);--sl-color-success-50: var(--sl-color-green-50);--sl-color-success-100: var(--sl-color-green-100);--sl-color-success-200: var(--sl-color-green-200);--sl-color-success-300: var(--sl-color-green-300);--sl-color-success-400: var(--sl-color-green-400);--sl-color-success-500: var(--sl-color-green-500);--sl-color-success-600: var(--sl-color-green-600);--sl-color-success-700: var(--sl-color-green-700);--sl-color-success-800: var(--sl-color-green-800);--sl-color-success-900: var(--sl-color-green-900);--sl-color-success-950: var(--sl-color-green-950);--sl-color-warning-50: var(--sl-color-amber-50);--sl-color-warning-100: var(--sl-color-amber-100);--sl-color-warning-200: var(--sl-color-amber-200);--sl-color-warning-300: var(--sl-color-amber-300);--sl-color-warning-400: var(--sl-color-amber-400);--sl-color-warning-500: var(--sl-color-amber-500);--sl-color-warning-600: var(--sl-color-amber-600);--sl-color-warning-700: var(--sl-color-amber-700);--sl-color-warning-800: var(--sl-color-amber-800);--sl-color-warning-900: var(--sl-color-amber-900);--sl-color-warning-950: var(--sl-color-amber-950);--sl-color-danger-50: var(--sl-color-red-50);--sl-color-danger-100: var(--sl-color-red-100);--sl-color-danger-200: var(--sl-color-red-200);--sl-color-danger-300: var(--sl-color-red-300);--sl-color-danger-400: var(--sl-color-red-400);--sl-color-danger-500: var(--sl-color-red-500);--sl-color-danger-600: var(--sl-color-red-600);--sl-color-danger-700: var(--sl-color-red-700);--sl-color-danger-800: var(--sl-color-red-800);--sl-color-danger-900: var(--sl-color-red-900);--sl-color-danger-950: var(--sl-color-red-950);--sl-color-neutral-50: var(--sl-color-gray-50);--sl-color-neutral-100: var(--sl-color-gray-100);--sl-color-neutral-200: var(--sl-color-gray-200);--sl-color-neutral-300: var(--sl-color-gray-300);--sl-color-neutral-400: var(--sl-color-gray-400);--sl-color-neutral-500: var(--sl-color-gray-500);--sl-color-neutral-600: var(--sl-color-gray-600);--sl-color-neutral-700: var(--sl-color-gray-700);--sl-color-neutral-800: var(--sl-color-gray-800);--sl-color-neutral-900: var(--sl-color-gray-900);--sl-color-neutral-950: var(--sl-color-gray-950);--sl-color-neutral-0: hsl(0, 0%, 100%);--sl-color-neutral-1000: hsl(0, 0%, 0%);--sl-border-radius-small: .1875rem;--sl-border-radius-medium: .25rem;--sl-border-radius-large: .5rem;--sl-border-radius-x-large: 1rem;--sl-border-radius-circle: 50%;--sl-border-radius-pill: 9999px;--sl-shadow-x-small: 0 1px 2px hsl(240 3.8% 46.1% / 6%);--sl-shadow-small: 0 1px 2px hsl(240 3.8% 46.1% / 12%);--sl-shadow-medium: 0 2px 4px hsl(240 3.8% 46.1% / 12%);--sl-shadow-large: 0 2px 8px hsl(240 3.8% 46.1% / 12%);--sl-shadow-x-large: 0 4px 16px hsl(240 3.8% 46.1% / 12%);--sl-spacing-3x-small: .125rem;--sl-spacing-2x-small: .25rem;--sl-spacing-x-small: .5rem;--sl-spacing-small: .75rem;--sl-spacing-medium: 1rem;--sl-spacing-large: 1.25rem;--sl-spacing-x-large: 1.75rem;--sl-spacing-2x-large: 2.25rem;--sl-spacing-3x-large: 3rem;--sl-spacing-4x-large: 4.5rem;--sl-transition-x-slow: 1s;--sl-transition-slow: .5s;--sl-transition-medium: .25s;--sl-transition-fast: .15s;--sl-transition-x-fast: 50ms;--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--sl-font-serif: Georgia, "Times New Roman", serif;--sl-font-size-2x-small: .625rem;--sl-font-size-x-small: .75rem;--sl-font-size-small: .875rem;--sl-font-size-medium: 1rem;--sl-font-size-large: 1.25rem;--sl-font-size-x-large: 1.5rem;--sl-font-size-2x-large: 2.25rem;--sl-font-size-3x-large: 3rem;--sl-font-size-4x-large: 4.5rem;--sl-font-weight-light: 300;--sl-font-weight-normal: 400;--sl-font-weight-semibold: 500;--sl-font-weight-bold: 700;--sl-letter-spacing-denser: -.03em;--sl-letter-spacing-dense: -.015em;--sl-letter-spacing-normal: normal;--sl-letter-spacing-loose: .075em;--sl-letter-spacing-looser: .15em;--sl-line-height-denser: 1;--sl-line-height-dense: 1.4;--sl-line-height-normal: 1.8;--sl-line-height-loose: 2.2;--sl-line-height-looser: 2.6;--sl-focus-ring-color: var(--sl-color-primary-600);--sl-focus-ring-style: solid;--sl-focus-ring-width: 3px;--sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);--sl-focus-ring-offset: 1px;--sl-button-font-size-small: var(--sl-font-size-x-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-large: var(--sl-font-size-medium);--sl-input-height-small: 1.875rem;--sl-input-height-medium: 2.5rem;--sl-input-height-large: 3.125rem;--sl-input-background-color: var(--sl-color-neutral-0);--sl-input-background-color-hover: var(--sl-input-background-color);--sl-input-background-color-focus: var(--sl-input-background-color);--sl-input-background-color-disabled: var(--sl-color-neutral-100);--sl-input-border-color: var(--sl-color-neutral-300);--sl-input-border-color-hover: var(--sl-color-neutral-400);--sl-input-border-color-focus: var(--sl-color-primary-500);--sl-input-border-color-disabled: var(--sl-color-neutral-300);--sl-input-border-width: 1px;--sl-input-required-content: "*";--sl-input-required-content-offset: -2px;--sl-input-required-content-color: var(--sl-input-label-color);--sl-input-border-radius-small: var(--sl-border-radius-medium);--sl-input-border-radius-medium: var(--sl-border-radius-medium);--sl-input-border-radius-large: var(--sl-border-radius-medium);--sl-input-font-family: var(--sl-font-sans);--sl-input-font-weight: var(--sl-font-weight-normal);--sl-input-font-size-small: var(--sl-font-size-small);--sl-input-font-size-medium: var(--sl-font-size-medium);--sl-input-font-size-large: var(--sl-font-size-large);--sl-input-letter-spacing: var(--sl-letter-spacing-normal);--sl-input-color: var(--sl-color-neutral-700);--sl-input-color-hover: var(--sl-color-neutral-700);--sl-input-color-focus: var(--sl-color-neutral-700);--sl-input-color-disabled: var(--sl-color-neutral-900);--sl-input-icon-color: var(--sl-color-neutral-500);--sl-input-icon-color-hover: var(--sl-color-neutral-600);--sl-input-icon-color-focus: var(--sl-color-neutral-600);--sl-input-placeholder-color: var(--sl-color-neutral-500);--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);--sl-input-spacing-small: var(--sl-spacing-small);--sl-input-spacing-medium: var(--sl-spacing-medium);--sl-input-spacing-large: var(--sl-spacing-large);--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);--sl-input-focus-ring-offset: 0;--sl-input-filled-background-color: var(--sl-color-neutral-100);--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);--sl-input-filled-color: var(--sl-color-neutral-800);--sl-input-filled-color-hover: var(--sl-color-neutral-800);--sl-input-filled-color-focus: var(--sl-color-neutral-700);--sl-input-filled-color-disabled: var(--sl-color-neutral-800);--sl-input-label-font-size-small: var(--sl-font-size-small);--sl-input-label-font-size-medium: var(--sl-font-size-medium);--sl-input-label-font-size-large: var(--sl-font-size-large);--sl-input-label-color: inherit;--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);--sl-input-help-text-font-size-medium: var(--sl-font-size-small);--sl-input-help-text-font-size-large: var(--sl-font-size-medium);--sl-input-help-text-color: var(--sl-color-neutral-500);--sl-toggle-size-small: .875rem;--sl-toggle-size-medium: 1.125rem;--sl-toggle-size-large: 1.375rem;--sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);--sl-panel-background-color: var(--sl-color-neutral-0);--sl-panel-border-color: var(--sl-color-neutral-200);--sl-panel-border-width: 1px;--sl-tooltip-border-radius: var(--sl-border-radius-medium);--sl-tooltip-background-color: var(--sl-color-neutral-800);--sl-tooltip-color: var(--sl-color-neutral-0);--sl-tooltip-font-family: var(--sl-font-sans);--sl-tooltip-font-weight: var(--sl-font-weight-normal);--sl-tooltip-font-size: var(--sl-font-size-small);--sl-tooltip-line-height: var(--sl-line-height-dense);--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);--sl-tooltip-arrow-size: 6px;--sl-z-index-drawer: 700;--sl-z-index-dialog: 800;--sl-z-index-dropdown: 900;--sl-z-index-toast: 950;--sl-z-index-tooltip: 1000}@supports (scrollbar-gutter: stable){.sl-scroll-lock{scrollbar-gutter:var(--sl-scroll-lock-gutter)!important}.sl-scroll-lock body{overflow:hidden!important}}@supports not (scrollbar-gutter: stable){.sl-scroll-lock body{padding-right:var(--sl-scroll-lock-size)!important;overflow:hidden!important}}.sl-toast-stack{position:fixed;top:0;inset-inline-end:0;z-index:var(--sl-z-index-toast);width:28rem;max-width:100%;max-height:100%;overflow:auto}.sl-toast-stack sl-alert{margin:var(--sl-spacing-medium)}.sl-toast-stack sl-alert::part(base){box-shadow:var(--sl-shadow-large)}@media(prefers-color-scheme:dark){:root{color-scheme:dark;--sl-color-gray-50: hsl(240 5.1% 15%);--sl-color-gray-100: hsl(240 5.7% 18.2%);--sl-color-gray-200: hsl(240 4.6% 22%);--sl-color-gray-300: hsl(240 5% 27.6%);--sl-color-gray-400: hsl(240 5% 35.5%);--sl-color-gray-500: hsl(240 3.7% 44%);--sl-color-gray-600: hsl(240 5.3% 58%);--sl-color-gray-700: hsl(240 5.6% 73%);--sl-color-gray-800: hsl(240 7.3% 84%);--sl-color-gray-900: hsl(240 9.1% 91.8%);--sl-color-gray-950: hsl(0 0% 95%);--sl-color-red-50: hsl(0 56% 23.9%);--sl-color-red-100: hsl(.6 60% 33.9%);--sl-color-red-200: hsl(.9 67.2% 37.1%);--sl-color-red-300: hsl(1.1 71.3% 43.7%);--sl-color-red-400: hsl(1 76% 52.5%);--sl-color-red-500: hsl(.7 89.6% 57.2%);--sl-color-red-600: hsl(0 98.6% 67.9%);--sl-color-red-700: hsl(0 100% 72.3%);--sl-color-red-800: hsl(0 100% 85.6%);--sl-color-red-900: hsl(0 100% 90.3%);--sl-color-red-950: hsl(0 100% 95.9%);--sl-color-orange-50: hsl(15 64.2% 23.3%);--sl-color-orange-100: hsl(15.1 70.9% 31.1%);--sl-color-orange-200: hsl(15.3 75.7% 35.5%);--sl-color-orange-300: hsl(17.1 83.5% 42.7%);--sl-color-orange-400: hsl(20.1 88% 50.8%);--sl-color-orange-500: hsl(24.3 100% 50.5%);--sl-color-orange-600: hsl(27.2 100% 57.7%);--sl-color-orange-700: hsl(31.3 100% 68.7%);--sl-color-orange-800: hsl(33.8 100% 79.3%);--sl-color-orange-900: hsl(38.9 100% 87.7%);--sl-color-orange-950: hsl(46.2 100% 95%);--sl-color-amber-50: hsl(21.9 66.3% 21.1%);--sl-color-amber-100: hsl(21.5 73.6% 29.7%);--sl-color-amber-200: hsl(22.3 77.6% 33.3%);--sl-color-amber-300: hsl(25.4 84.2% 39.6%);--sl-color-amber-400: hsl(31.4 87.4% 46.7%);--sl-color-amber-500: hsl(37 96.6% 48.3%);--sl-color-amber-600: hsl(43.3 100% 53.4%);--sl-color-amber-700: hsl(46.5 100% 61.1%);--sl-color-amber-800: hsl(49.3 100% 73%);--sl-color-amber-900: hsl(51.8 100% 85%);--sl-color-amber-950: hsl(60 100% 94.6%);--sl-color-yellow-50: hsl(32.5 60% 18.2%);--sl-color-yellow-100: hsl(28.1 68.6% 29%);--sl-color-yellow-200: hsl(31.3 75.8% 30.8%);--sl-color-yellow-300: hsl(34.7 84.4% 35.3%);--sl-color-yellow-400: hsl(40.1 87.3% 43.3%);--sl-color-yellow-500: hsl(44.7 88% 46%);--sl-color-yellow-600: hsl(47.7 100% 50.9%);--sl-color-yellow-700: hsl(51.3 100% 59.9%);--sl-color-yellow-800: hsl(54.6 100% 73%);--sl-color-yellow-900: hsl(58.9 100% 84.2%);--sl-color-yellow-950: hsl(60 100% 94%);--sl-color-lime-50: hsl(86.5 54.4% 18%);--sl-color-lime-100: hsl(87.6 56.8% 23.3%);--sl-color-lime-200: hsl(85.8 63.2% 24.5%);--sl-color-lime-300: hsl(86.1 72% 29.4%);--sl-color-lime-400: hsl(85.5 76.8% 37.3%);--sl-color-lime-500: hsl(84.3 74.2% 42.1%);--sl-color-lime-600: hsl(82.8 81.5% 52.6%);--sl-color-lime-700: hsl(82 89.9% 64%);--sl-color-lime-800: hsl(80.9 97.9% 76.6%);--sl-color-lime-900: hsl(77.9 100% 85.8%);--sl-color-lime-950: hsl(69.5 100% 93.8%);--sl-color-green-50: hsl(144.3 53.6% 16%);--sl-color-green-100: hsl(143.2 55.4% 23.5%);--sl-color-green-200: hsl(141.5 58.2% 26.3%);--sl-color-green-300: hsl(140.8 64.2% 31.8%);--sl-color-green-400: hsl(140.3 68% 39.2%);--sl-color-green-500: hsl(141.1 64.9% 43%);--sl-color-green-600: hsl(141.6 72.4% 55.2%);--sl-color-green-700: hsl(141.7 82.7% 70.1%);--sl-color-green-800: hsl(141 90.9% 82.1%);--sl-color-green-900: hsl(142 100% 89.1%);--sl-color-green-950: hsl(144 100% 95.5%);--sl-color-emerald-50: hsl(164.3 75% 13.5%);--sl-color-emerald-100: hsl(163.5 72.6% 20.1%);--sl-color-emerald-200: hsl(162.1 73.7% 22.4%);--sl-color-emerald-300: hsl(161.3 77.3% 27.6%);--sl-color-emerald-400: hsl(159.6 77.1% 34.3%);--sl-color-emerald-500: hsl(159.1 73.5% 37.9%);--sl-color-emerald-600: hsl(157.8 66.8% 48.9%);--sl-color-emerald-700: hsl(156.2 76.1% 63.8%);--sl-color-emerald-800: hsl(152.4 84.4% 77.4%);--sl-color-emerald-900: hsl(149.3 100% 87%);--sl-color-emerald-950: hsl(158.6 100% 94.8%);--sl-color-teal-50: hsl(176.5 51.5% 15.4%);--sl-color-teal-100: hsl(175.9 54.7% 22.3%);--sl-color-teal-200: hsl(175.9 60.7% 23.9%);--sl-color-teal-300: hsl(174.5 67.3% 28.8%);--sl-color-teal-400: hsl(174.4 71.9% 34.9%);--sl-color-teal-500: hsl(173.1 71% 38.3%);--sl-color-teal-600: hsl(172.3 68.2% 48.1%);--sl-color-teal-700: hsl(170.5 81.3% 61.5%);--sl-color-teal-800: hsl(168.4 92.1% 75.2%);--sl-color-teal-900: hsl(168.3 100% 86%);--sl-color-teal-950: hsl(180 100% 95.5%);--sl-color-cyan-50: hsl(197.1 53.8% 20.3%);--sl-color-cyan-100: hsl(196.8 57.3% 27.2%);--sl-color-cyan-200: hsl(195.3 62.7% 29.4%);--sl-color-cyan-300: hsl(193.5 71.3% 34.1%);--sl-color-cyan-400: hsl(192.5 76.8% 40.6%);--sl-color-cyan-500: hsl(189.4 78.6% 42.6%);--sl-color-cyan-600: hsl(188.2 89.1% 51.7%);--sl-color-cyan-700: hsl(187 98.6% 66.2%);--sl-color-cyan-800: hsl(184.9 100% 78.3%);--sl-color-cyan-900: hsl(180 100% 86.6%);--sl-color-cyan-950: hsl(180 100% 94.8%);--sl-color-sky-50: hsl(203 63.8% 20.9%);--sl-color-sky-100: hsl(203.4 70.4% 28%);--sl-color-sky-200: hsl(202.7 75.8% 30.8%);--sl-color-sky-300: hsl(203.1 80.4% 36.1%);--sl-color-sky-400: hsl(202.1 80.5% 44.3%);--sl-color-sky-500: hsl(199.7 85.9% 47.7%);--sl-color-sky-600: hsl(198.7 97.9% 57.2%);--sl-color-sky-700: hsl(198.7 100% 70.5%);--sl-color-sky-800: hsl(198.8 100% 82.5%);--sl-color-sky-900: hsl(198.5 100% 89.9%);--sl-color-sky-950: hsl(186 100% 95.5%);--sl-color-blue-50: hsl(227.1 49.5% 22.7%);--sl-color-blue-100: hsl(225.8 58.9% 36.8%);--sl-color-blue-200: hsl(227.7 64.4% 42.9%);--sl-color-blue-300: hsl(226.1 72.7% 51.2%);--sl-color-blue-400: hsl(222.6 86.5% 56.3%);--sl-color-blue-500: hsl(217.8 95.8% 57.4%);--sl-color-blue-600: hsl(213.3 100% 65%);--sl-color-blue-700: hsl(210.9 100% 74.8%);--sl-color-blue-800: hsl(211.5 100% 83.4%);--sl-color-blue-900: hsl(211 100% 88.9%);--sl-color-blue-950: hsl(201.8 100% 95.3%);--sl-color-indigo-50: hsl(243.5 40.8% 27%);--sl-color-indigo-100: hsl(242.9 45.7% 37.6%);--sl-color-indigo-200: hsl(244.7 52.7% 43.1%);--sl-color-indigo-300: hsl(245.3 60.5% 52.4%);--sl-color-indigo-400: hsl(244.1 79.2% 60.4%);--sl-color-indigo-500: hsl(239.6 88.7% 63.8%);--sl-color-indigo-600: hsl(234.5 96.7% 70.9%);--sl-color-indigo-700: hsl(229.4 100% 78.3%);--sl-color-indigo-800: hsl(227.1 100% 85%);--sl-color-indigo-900: hsl(223.8 100% 89.9%);--sl-color-indigo-950: hsl(220 100% 95.1%);--sl-color-violet-50: hsl(265.1 57.3% 25.4%);--sl-color-violet-100: hsl(263.5 63.8% 39.4%);--sl-color-violet-200: hsl(263.4 66.2% 44.1%);--sl-color-violet-300: hsl(263.7 72.8% 52.4%);--sl-color-violet-400: hsl(262.5 87.3% 59.8%);--sl-color-violet-500: hsl(258.3 95.1% 63.2%);--sl-color-violet-600: hsl(255.1 100% 67.2%);--sl-color-violet-700: hsl(253 100% 81.5%);--sl-color-violet-800: hsl(251.7 100% 87.9%);--sl-color-violet-900: hsl(254.1 100% 91.7%);--sl-color-violet-950: hsl(257.1 100% 96.1%);--sl-color-purple-50: hsl(276 54.3% 20.5%);--sl-color-purple-100: hsl(273.6 61.8% 35.4%);--sl-color-purple-200: hsl(272.9 64% 41.4%);--sl-color-purple-300: hsl(271.9 68.1% 49.2%);--sl-color-purple-400: hsl(271.5 85.1% 57.8%);--sl-color-purple-500: hsl(270.7 96.4% 62.1%);--sl-color-purple-600: hsl(270.5 100% 71.9%);--sl-color-purple-700: hsl(270.9 100% 81.3%);--sl-color-purple-800: hsl(272.4 100% 87.7%);--sl-color-purple-900: hsl(276.7 100% 91.5%);--sl-color-purple-950: hsl(300 100% 96.5%);--sl-color-fuchsia-50: hsl(297.1 51.2% 18.6%);--sl-color-fuchsia-100: hsl(296.7 59.5% 31.5%);--sl-color-fuchsia-200: hsl(295.4 65.4% 35.1%);--sl-color-fuchsia-300: hsl(294.6 67.4% 42.2%);--sl-color-fuchsia-400: hsl(293.3 68.7% 51.2%);--sl-color-fuchsia-500: hsl(292.1 88.4% 57.7%);--sl-color-fuchsia-600: hsl(292 98.5% 59.5%);--sl-color-fuchsia-700: hsl(292.4 100% 79.5%);--sl-color-fuchsia-800: hsl(292.9 100% 86.8%);--sl-color-fuchsia-900: hsl(300 100% 91.5%);--sl-color-fuchsia-950: hsl(300 100% 96.3%);--sl-color-pink-50: hsl(336.2 59.6% 20%);--sl-color-pink-100: hsl(336.8 63.9% 34%);--sl-color-pink-200: hsl(336.8 68.7% 37.6%);--sl-color-pink-300: hsl(336.1 71.8% 44.5%);--sl-color-pink-400: hsl(333.9 74.9% 53.1%);--sl-color-pink-500: hsl(330.7 86.3% 57.7%);--sl-color-pink-600: hsl(328.6 91.5% 67.2%);--sl-color-pink-700: hsl(327.4 97.6% 78.7%);--sl-color-pink-800: hsl(325.1 100% 86.6%);--sl-color-pink-900: hsl(322.1 100% 91.3%);--sl-color-pink-950: hsl(315 100% 95.9%);--sl-color-rose-50: hsl(342.3 62.9% 21.5%);--sl-color-rose-100: hsl(342.8 68.9% 34.2%);--sl-color-rose-200: hsl(344.8 72.6% 37.3%);--sl-color-rose-300: hsl(346.9 75.8% 43.7%);--sl-color-rose-400: hsl(348.2 80.1% 52.7%);--sl-color-rose-500: hsl(350.4 94.8% 57.5%);--sl-color-rose-600: hsl(351.2 100% 58.1%);--sl-color-rose-700: hsl(352.3 100% 78.1%);--sl-color-rose-800: hsl(352 100% 86.2%);--sl-color-rose-900: hsl(354.5 100% 90.7%);--sl-color-rose-950: hsl(353.3 100% 95.7%);--sl-color-primary-50: var(--sl-color-sky-50);--sl-color-primary-100: var(--sl-color-sky-100);--sl-color-primary-200: var(--sl-color-sky-200);--sl-color-primary-300: var(--sl-color-sky-300);--sl-color-primary-400: var(--sl-color-sky-400);--sl-color-primary-500: var(--sl-color-sky-500);--sl-color-primary-600: var(--sl-color-sky-600);--sl-color-primary-700: var(--sl-color-sky-700);--sl-color-primary-800: var(--sl-color-sky-800);--sl-color-primary-900: var(--sl-color-sky-900);--sl-color-primary-950: var(--sl-color-sky-950);--sl-color-success-50: var(--sl-color-green-50);--sl-color-success-100: var(--sl-color-green-100);--sl-color-success-200: var(--sl-color-green-200);--sl-color-success-300: var(--sl-color-green-300);--sl-color-success-400: var(--sl-color-green-400);--sl-color-success-500: var(--sl-color-green-500);--sl-color-success-600: var(--sl-color-green-600);--sl-color-success-700: var(--sl-color-green-700);--sl-color-success-800: var(--sl-color-green-800);--sl-color-success-900: var(--sl-color-green-900);--sl-color-success-950: var(--sl-color-green-950);--sl-color-warning-50: var(--sl-color-amber-50);--sl-color-warning-100: var(--sl-color-amber-100);--sl-color-warning-200: var(--sl-color-amber-200);--sl-color-warning-300: var(--sl-color-amber-300);--sl-color-warning-400: var(--sl-color-amber-400);--sl-color-warning-500: var(--sl-color-amber-500);--sl-color-warning-600: var(--sl-color-amber-600);--sl-color-warning-700: var(--sl-color-amber-700);--sl-color-warning-800: var(--sl-color-amber-800);--sl-color-warning-900: var(--sl-color-amber-900);--sl-color-warning-950: var(--sl-color-amber-950);--sl-color-danger-50: var(--sl-color-red-50);--sl-color-danger-100: var(--sl-color-red-100);--sl-color-danger-200: var(--sl-color-red-200);--sl-color-danger-300: var(--sl-color-red-300);--sl-color-danger-400: var(--sl-color-red-400);--sl-color-danger-500: var(--sl-color-red-500);--sl-color-danger-600: var(--sl-color-red-600);--sl-color-danger-700: var(--sl-color-red-700);--sl-color-danger-800: var(--sl-color-red-800);--sl-color-danger-900: var(--sl-color-red-900);--sl-color-danger-950: var(--sl-color-red-950);--sl-color-neutral-50: var(--sl-color-gray-50);--sl-color-neutral-100: var(--sl-color-gray-100);--sl-color-neutral-200: var(--sl-color-gray-200);--sl-color-neutral-300: var(--sl-color-gray-300);--sl-color-neutral-400: var(--sl-color-gray-400);--sl-color-neutral-500: var(--sl-color-gray-500);--sl-color-neutral-600: var(--sl-color-gray-600);--sl-color-neutral-700: var(--sl-color-gray-700);--sl-color-neutral-800: var(--sl-color-gray-800);--sl-color-neutral-900: var(--sl-color-gray-900);--sl-color-neutral-950: var(--sl-color-gray-950);--sl-color-neutral-0: hsl(240, 5.9%, 11%);--sl-color-neutral-1000: hsl(0, 0%, 100%);--sl-border-radius-small: .1875rem;--sl-border-radius-medium: .25rem;--sl-border-radius-large: .5rem;--sl-border-radius-x-large: 1rem;--sl-border-radius-circle: 50%;--sl-border-radius-pill: 9999px;--sl-shadow-x-small: 0 1px 2px rgb(0 0 0 / 18%);--sl-shadow-small: 0 1px 2px rgb(0 0 0 / 24%);--sl-shadow-medium: 0 2px 4px rgb(0 0 0 / 24%);--sl-shadow-large: 0 2px 8px rgb(0 0 0 / 24%);--sl-shadow-x-large: 0 4px 16px rgb(0 0 0 / 24%);--sl-spacing-3x-small: .125rem;--sl-spacing-2x-small: .25rem;--sl-spacing-x-small: .5rem;--sl-spacing-small: .75rem;--sl-spacing-medium: 1rem;--sl-spacing-large: 1.25rem;--sl-spacing-x-large: 1.75rem;--sl-spacing-2x-large: 2.25rem;--sl-spacing-3x-large: 3rem;--sl-spacing-4x-large: 4.5rem;--sl-transition-x-slow: 1s;--sl-transition-slow: .5s;--sl-transition-medium: .25s;--sl-transition-fast: .15s;--sl-transition-x-fast: 50ms;--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--sl-font-serif: Georgia, "Times New Roman", serif;--sl-font-size-2x-small: .625rem;--sl-font-size-x-small: .75rem;--sl-font-size-small: .875rem;--sl-font-size-medium: 1rem;--sl-font-size-large: 1.25rem;--sl-font-size-x-large: 1.5rem;--sl-font-size-2x-large: 2.25rem;--sl-font-size-3x-large: 3rem;--sl-font-size-4x-large: 4.5rem;--sl-font-weight-light: 300;--sl-font-weight-normal: 400;--sl-font-weight-semibold: 500;--sl-font-weight-bold: 700;--sl-letter-spacing-denser: -.03em;--sl-letter-spacing-dense: -.015em;--sl-letter-spacing-normal: normal;--sl-letter-spacing-loose: .075em;--sl-letter-spacing-looser: .15em;--sl-line-height-denser: 1;--sl-line-height-dense: 1.4;--sl-line-height-normal: 1.8;--sl-line-height-loose: 2.2;--sl-line-height-looser: 2.6;--sl-focus-ring-color: var(--sl-color-primary-700);--sl-focus-ring-style: solid;--sl-focus-ring-width: 3px;--sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);--sl-focus-ring-offset: 1px;--sl-button-font-size-small: var(--sl-font-size-x-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-large: var(--sl-font-size-medium);--sl-input-height-small: 1.875rem;--sl-input-height-medium: 2.5rem;--sl-input-height-large: 3.125rem;--sl-input-background-color: var(--sl-color-neutral-0);--sl-input-background-color-hover: var(--sl-input-background-color);--sl-input-background-color-focus: var(--sl-input-background-color);--sl-input-background-color-disabled: var(--sl-color-neutral-100);--sl-input-border-color: var(--sl-color-neutral-400);--sl-input-border-color-hover: var(--sl-color-neutral-500);--sl-input-border-color-focus: var(--sl-color-primary-600);--sl-input-border-color-disabled: var(--sl-color-neutral-400);--sl-input-border-width: 1px;--sl-input-required-content: "*";--sl-input-required-content-offset: -2px;--sl-input-required-content-color: var(--sl-input-label-color);--sl-input-border-radius-small: var(--sl-border-radius-medium);--sl-input-border-radius-medium: var(--sl-border-radius-medium);--sl-input-border-radius-large: var(--sl-border-radius-medium);--sl-input-font-family: var(--sl-font-sans);--sl-input-font-weight: var(--sl-font-weight-normal);--sl-input-font-size-small: var(--sl-font-size-small);--sl-input-font-size-medium: var(--sl-font-size-medium);--sl-input-font-size-large: var(--sl-font-size-large);--sl-input-letter-spacing: var(--sl-letter-spacing-normal);--sl-input-color: var(--sl-color-neutral-700);--sl-input-color-hover: var(--sl-color-neutral-700);--sl-input-color-focus: var(--sl-color-neutral-700);--sl-input-color-disabled: var(--sl-color-neutral-900);--sl-input-icon-color: var(--sl-color-neutral-500);--sl-input-icon-color-hover: var(--sl-color-neutral-600);--sl-input-icon-color-focus: var(--sl-color-neutral-600);--sl-input-placeholder-color: var(--sl-color-neutral-500);--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);--sl-input-spacing-small: var(--sl-spacing-small);--sl-input-spacing-medium: var(--sl-spacing-medium);--sl-input-spacing-large: var(--sl-spacing-large);--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);--sl-input-focus-ring-offset: 0;--sl-input-filled-background-color: var(--sl-color-neutral-100);--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);--sl-input-filled-color: var(--sl-color-neutral-800);--sl-input-filled-color-hover: var(--sl-color-neutral-800);--sl-input-filled-color-focus: var(--sl-color-neutral-700);--sl-input-filled-color-disabled: var(--sl-color-neutral-800);--sl-input-label-font-size-small: var(--sl-font-size-small);--sl-input-label-font-size-medium: var(--sl-font-size-medium);--sl-input-label-font-size-large: var(--sl-font-size-large);--sl-input-label-color: inherit;--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);--sl-input-help-text-font-size-medium: var(--sl-font-size-small);--sl-input-help-text-font-size-large: var(--sl-font-size-medium);--sl-input-help-text-color: var(--sl-color-neutral-600);--sl-toggle-size-small: .875rem;--sl-toggle-size-medium: 1.125rem;--sl-toggle-size-large: 1.375rem;--sl-overlay-background-color: hsl(0 0% 0% / 43%);--sl-panel-background-color: var(--sl-color-neutral-50);--sl-panel-border-color: var(--sl-color-neutral-200);--sl-panel-border-width: 1px;--sl-tooltip-border-radius: var(--sl-border-radius-medium);--sl-tooltip-background-color: var(--sl-color-neutral-800);--sl-tooltip-color: var(--sl-color-neutral-0);--sl-tooltip-font-family: var(--sl-font-sans);--sl-tooltip-font-weight: var(--sl-font-weight-normal);--sl-tooltip-font-size: var(--sl-font-size-small);--sl-tooltip-line-height: var(--sl-line-height-dense);--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);--sl-tooltip-arrow-size: 6px;--sl-z-index-drawer: 700;--sl-z-index-dialog: 800;--sl-z-index-dropdown: 900;--sl-z-index-toast: 950;--sl-z-index-tooltip: 1000}}:root{--band: #1d4ed8;--band-ink: #ffffff;--rail: #064e3b;--rail-group: #059669;--rail-button: 44px;--power-on: #4ade80;--stop: #ef4444;--sl-color-primary-50: var(--sl-color-blue-100);--sl-color-primary-100: var(--sl-color-blue-200);--sl-color-primary-200: var(--sl-color-blue-300);--sl-color-primary-300: var(--sl-color-blue-400);--sl-color-primary-400: var(--sl-color-blue-500);--sl-color-primary-500: var(--sl-color-blue-600);--sl-color-primary-600: var(--sl-color-blue-700);--sl-color-primary-700: var(--sl-color-blue-800);--sl-color-primary-800: var(--sl-color-blue-900);--sl-color-primary-900: var(--sl-color-blue-950);--sl-color-primary-950: var(--sl-color-blue-950);--sl-input-height-small: 1.75rem;--sl-input-height-medium: 2.25rem;--sl-input-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-border-radius-medium: 3px;--sl-focus-ring-width: 2px;--sl-focus-ring-color: color-mix(in srgb, var(--band) 60%, transparent);--sl-tooltip-background-color: var(--band);--sl-tooltip-color: var(--band-ink);--sl-tooltip-font-size: var(--sl-font-size-x-small)}', jt = {
  /** An arrow most of the way round the selection: a quarter turn. */
  rotate: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M3.76 12.24A6 6 0 1 1 14 8h-1A5 5 0 1 0 4.46 11.54Z"/><path d="M11.5 8h4l-2 2.6Z"/><path d="M6 6h4v4H6Z"/></svg>',
  /** A lever on its quadrant. */
  throttle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M1.89 9.78A6.5 6.5 0 0 1 14.11 9.78l-.94.34A5.5 5.5 0 0 0 2.83 10.12Z"/><path d="M8.63 12.3 12.01 5.05l-1.26-.6L7.37 11.7Z"/><circle cx="11.38" cy="4.75" r="1.6"/><path d="M1.5 12h13v1.5h-13Z"/></svg>'
}, Jo = (t) => `data:image/svg+xml,${encodeURIComponent(t)}`;
Xo("rails49", {
  resolver: (t) => t in jt ? Jo(jt[t]) : ""
});
const Jt = (t) => t in jt ? "rails49" : "default";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, Qt = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, eo = Symbol(), wo = /* @__PURE__ */ new WeakMap();
let Qo = class {
  constructor(e, o, s) {
    if (this._$cssResult$ = !0, s !== eo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = o;
  }
  get styleSheet() {
    let e = this.o;
    const o = this.t;
    if (Qt && e === void 0) {
      const s = o !== void 0 && o.length === 1;
      s && (e = wo.get(o)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && wo.set(o, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (t) => new Qo(typeof t == "string" ? t : t + "", void 0, eo), A = (t, ...e) => {
  const o = t.length === 1 ? t[0] : e.reduce((s, l, r) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(l) + t[r + 1], t[0]);
  return new Qo(o, t, eo);
}, Ys = (t, e) => {
  if (Qt) t.adoptedStyleSheets = e.map((o) => o instanceof CSSStyleSheet ? o : o.styleSheet);
  else for (const o of e) {
    const s = document.createElement("style"), l = it.litNonce;
    l !== void 0 && s.setAttribute("nonce", l), s.textContent = o.cssText, t.appendChild(s);
  }
}, xo = Qt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let o = "";
  for (const s of e.cssRules) o += s.cssText;
  return _e(o);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Zs, defineProperty: Gs, getOwnPropertyDescriptor: Js, getOwnPropertyNames: Qs, getOwnPropertySymbols: el, getPrototypeOf: tl } = Object, le = globalThis, $o = le.trustedTypes, ol = $o ? $o.emptyScript : "", Ot = le.reactiveElementPolyfillSupport, Ie = (t, e) => t, dt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ol : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let o = t;
  switch (e) {
    case Boolean:
      o = t !== null;
      break;
    case Number:
      o = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        o = JSON.parse(t);
      } catch {
        o = null;
      }
  }
  return o;
} }, to = (t, e) => !Zs(t, e), _o = { attribute: !0, type: String, converter: dt, reflect: !1, useDefault: !1, hasChanged: to };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), le.litPropertyMetadata ?? (le.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, o = _o) {
    if (o.state && (o.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((o = Object.create(o)).wrapped = !0), this.elementProperties.set(e, o), !o.noAccessor) {
      const s = Symbol(), l = this.getPropertyDescriptor(e, s, o);
      l !== void 0 && Gs(this.prototype, e, l);
    }
  }
  static getPropertyDescriptor(e, o, s) {
    const { get: l, set: r } = Js(this.prototype, e) ?? { get() {
      return this[o];
    }, set(i) {
      this[o] = i;
    } };
    return { get: l, set(i) {
      const n = l == null ? void 0 : l.call(this);
      r == null || r.call(this, i), this.requestUpdate(e, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _o;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ie("elementProperties"))) return;
    const e = tl(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ie("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ie("properties"))) {
      const o = this.properties, s = [...Qs(o), ...el(o)];
      for (const l of s) this.createProperty(l, o[l]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const o = litPropertyMetadata.get(e);
      if (o !== void 0) for (const [s, l] of o) this.elementProperties.set(s, l);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [o, s] of this.elementProperties) {
      const l = this._$Eu(o, s);
      l !== void 0 && this._$Eh.set(l, o);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const o = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const l of s) o.unshift(xo(l));
    } else e !== void 0 && o.push(xo(e));
    return o;
  }
  static _$Eu(e, o) {
    const s = o.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((o) => this.enableUpdating = o), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((o) => o(this));
  }
  addController(e) {
    var o;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) == null || o.call(e));
  }
  removeController(e) {
    var o;
    (o = this._$EO) == null || o.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), o = this.constructor.elementProperties;
    for (const s of o.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ys(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((o) => {
      var s;
      return (s = o.hostConnected) == null ? void 0 : s.call(o);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((o) => {
      var s;
      return (s = o.hostDisconnected) == null ? void 0 : s.call(o);
    });
  }
  attributeChangedCallback(e, o, s) {
    this._$AK(e, s);
  }
  _$ET(e, o) {
    var r;
    const s = this.constructor.elementProperties.get(e), l = this.constructor._$Eu(e, s);
    if (l !== void 0 && s.reflect === !0) {
      const i = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : dt).toAttribute(o, s.type);
      this._$Em = e, i == null ? this.removeAttribute(l) : this.setAttribute(l, i), this._$Em = null;
    }
  }
  _$AK(e, o) {
    var r, i;
    const s = this.constructor, l = s._$Eh.get(e);
    if (l !== void 0 && this._$Em !== l) {
      const n = s.getPropertyOptions(l), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((r = n.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? n.converter : dt;
      this._$Em = l;
      const c = a.fromAttribute(o, n.type);
      this[l] = c ?? ((i = this._$Ej) == null ? void 0 : i.get(l)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, o, s, l = !1, r) {
    var i;
    if (e !== void 0) {
      const n = this.constructor;
      if (l === !1 && (r = this[e]), s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? to)(r, o) || s.useDefault && s.reflect && r === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, o, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, o, { useDefault: s, reflect: l, wrapped: r }, i) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, i ?? o ?? this[e]), r !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (o = void 0), this._$AL.set(e, o)), l === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (o) {
      Promise.reject(o);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const l = this.constructor.elementProperties;
      if (l.size > 0) for (const [r, i] of l) {
        const { wrapped: n } = i, a = this[r];
        n !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, i, a);
      }
    }
    let e = !1;
    const o = this._$AL;
    try {
      e = this.shouldUpdate(o), e ? (this.willUpdate(o), (s = this._$EO) == null || s.forEach((l) => {
        var r;
        return (r = l.hostUpdate) == null ? void 0 : r.call(l);
      }), this.update(o)) : this._$EM();
    } catch (l) {
      throw e = !1, this._$EM(), l;
    }
    e && this._$AE(o);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var o;
    (o = this._$EO) == null || o.forEach((s) => {
      var l;
      return (l = s.hostUpdated) == null ? void 0 : l.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((o) => this._$ET(o, this[o]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ce.elementStyles = [], Ce.shadowRootOptions = { mode: "open" }, Ce[Ie("elementProperties")] = /* @__PURE__ */ new Map(), Ce[Ie("finalized")] = /* @__PURE__ */ new Map(), Ot == null || Ot({ ReactiveElement: Ce }), (le.reactiveElementVersions ?? (le.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = globalThis, ko = (t) => t, ut = Ve.trustedTypes, Ao = ut ? ut.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, es = "$lit$", se = `lit$${Math.random().toFixed(9).slice(2)}$`, ts = "?" + se, sl = `<${ts}>`, ge = document, We = () => ge.createComment(""), qe = (t) => t === null || typeof t != "object" && typeof t != "function", oo = Array.isArray, ll = (t) => oo(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Lt = `[ 	
\f\r]`, He = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Co = /-->/g, Eo = />/g, ce = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), So = /'/g, zo = /"/g, os = /^(?:script|style|textarea|title)$/i, rl = (t) => (e, ...o) => ({ _$litType$: t, strings: e, values: o }), $ = rl(1), me = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Po = /* @__PURE__ */ new WeakMap(), pe = ge.createTreeWalker(ge, 129);
function ss(t, e) {
  if (!oo(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ao !== void 0 ? Ao.createHTML(e) : e;
}
const il = (t, e) => {
  const o = t.length - 1, s = [];
  let l, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = He;
  for (let n = 0; n < o; n++) {
    const a = t[n];
    let c, d, h = -1, f = 0;
    for (; f < a.length && (i.lastIndex = f, d = i.exec(a), d !== null); ) f = i.lastIndex, i === He ? d[1] === "!--" ? i = Co : d[1] !== void 0 ? i = Eo : d[2] !== void 0 ? (os.test(d[2]) && (l = RegExp("</" + d[2], "g")), i = ce) : d[3] !== void 0 && (i = ce) : i === ce ? d[0] === ">" ? (i = l ?? He, h = -1) : d[1] === void 0 ? h = -2 : (h = i.lastIndex - d[2].length, c = d[1], i = d[3] === void 0 ? ce : d[3] === '"' ? zo : So) : i === zo || i === So ? i = ce : i === Co || i === Eo ? i = He : (i = ce, l = void 0);
    const u = i === ce && t[n + 1].startsWith("/>") ? " " : "";
    r += i === He ? a + sl : h >= 0 ? (s.push(c), a.slice(0, h) + es + a.slice(h) + se + u) : a + se + (h === -2 ? n : u);
  }
  return [ss(t, r + (t[o] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ke {
  constructor({ strings: e, _$litType$: o }, s) {
    let l;
    this.parts = [];
    let r = 0, i = 0;
    const n = e.length - 1, a = this.parts, [c, d] = il(e, o);
    if (this.el = Ke.createElement(c, s), pe.currentNode = this.el.content, o === 2 || o === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (l = pe.nextNode()) !== null && a.length < n; ) {
      if (l.nodeType === 1) {
        if (l.hasAttributes()) for (const h of l.getAttributeNames()) if (h.endsWith(es)) {
          const f = d[i++], u = l.getAttribute(h).split(se), m = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: r, name: m[2], strings: u, ctor: m[1] === "." ? al : m[1] === "?" ? cl : m[1] === "@" ? hl : wt }), l.removeAttribute(h);
        } else h.startsWith(se) && (a.push({ type: 6, index: r }), l.removeAttribute(h));
        if (os.test(l.tagName)) {
          const h = l.textContent.split(se), f = h.length - 1;
          if (f > 0) {
            l.textContent = ut ? ut.emptyScript : "";
            for (let u = 0; u < f; u++) l.append(h[u], We()), pe.nextNode(), a.push({ type: 2, index: ++r });
            l.append(h[f], We());
          }
        }
      } else if (l.nodeType === 8) if (l.data === ts) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = l.data.indexOf(se, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += se.length - 1;
      }
      r++;
    }
  }
  static createElement(e, o) {
    const s = ge.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Pe(t, e, o = t, s) {
  var i, n;
  if (e === me) return e;
  let l = s !== void 0 ? (i = o._$Co) == null ? void 0 : i[s] : o._$Cl;
  const r = qe(e) ? void 0 : e._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== r && ((n = l == null ? void 0 : l._$AO) == null || n.call(l, !1), r === void 0 ? l = void 0 : (l = new r(t), l._$AT(t, o, s)), s !== void 0 ? (o._$Co ?? (o._$Co = []))[s] = l : o._$Cl = l), l !== void 0 && (e = Pe(t, l._$AS(t, e.values), l, s)), e;
}
class nl {
  constructor(e, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: o }, parts: s } = this._$AD, l = ((e == null ? void 0 : e.creationScope) ?? ge).importNode(o, !0);
    pe.currentNode = l;
    let r = pe.nextNode(), i = 0, n = 0, a = s[0];
    for (; a !== void 0; ) {
      if (i === a.index) {
        let c;
        a.type === 2 ? c = new Je(r, r.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (c = new dl(r, this, e)), this._$AV.push(c), a = s[++n];
      }
      i !== (a == null ? void 0 : a.index) && (r = pe.nextNode(), i++);
    }
    return pe.currentNode = ge, l;
  }
  p(e) {
    let o = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, o), o += s.strings.length - 2) : s._$AI(e[o])), o++;
  }
}
class Je {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, o, s, l) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = o, this._$AM = s, this.options = l, this._$Cv = (l == null ? void 0 : l.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = o.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, o = this) {
    e = Pe(this, e, o), qe(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== me && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ll(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== C && qe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ge.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: o, _$litType$: s } = e, l = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ke.createElement(ss(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === l) this._$AH.p(o);
    else {
      const i = new nl(l, this), n = i.u(this.options);
      i.p(o), this.T(n), this._$AH = i;
    }
  }
  _$AC(e) {
    let o = Po.get(e.strings);
    return o === void 0 && Po.set(e.strings, o = new Ke(e)), o;
  }
  k(e) {
    oo(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let s, l = 0;
    for (const r of e) l === o.length ? o.push(s = new Je(this.O(We()), this.O(We()), this, this.options)) : s = o[l], s._$AI(r), l++;
    l < o.length && (this._$AR(s && s._$AB.nextSibling, l), o.length = l);
  }
  _$AR(e = this._$AA.nextSibling, o) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, o); e !== this._$AB; ) {
      const l = ko(e).nextSibling;
      ko(e).remove(), e = l;
    }
  }
  setConnected(e) {
    var o;
    this._$AM === void 0 && (this._$Cv = e, (o = this._$AP) == null || o.call(this, e));
  }
}
class wt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, o, s, l, r) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = o, this._$AM = l, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = C;
  }
  _$AI(e, o = this, s, l) {
    const r = this.strings;
    let i = !1;
    if (r === void 0) e = Pe(this, e, o, 0), i = !qe(e) || e !== this._$AH && e !== me, i && (this._$AH = e);
    else {
      const n = e;
      let a, c;
      for (e = r[0], a = 0; a < r.length - 1; a++) c = Pe(this, n[s + a], o, a), c === me && (c = this._$AH[a]), i || (i = !qe(c) || c !== this._$AH[a]), c === C ? e = C : e !== C && (e += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    i && !l && this.j(e);
  }
  j(e) {
    e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class al extends wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === C ? void 0 : e;
  }
}
class cl extends wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== C);
  }
}
class hl extends wt {
  constructor(e, o, s, l, r) {
    super(e, o, s, l, r), this.type = 5;
  }
  _$AI(e, o = this) {
    if ((e = Pe(this, e, o, 0) ?? C) === me) return;
    const s = this._$AH, l = e === C && s !== C || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== C && (s === C || l);
    l && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var o;
    typeof this._$AH == "function" ? this._$AH.call(((o = this.options) == null ? void 0 : o.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class dl {
  constructor(e, o, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Pe(this, e);
  }
}
const Rt = Ve.litHtmlPolyfillSupport;
Rt == null || Rt(Ke, Je), (Ve.litHtmlVersions ?? (Ve.litHtmlVersions = [])).push("3.3.3");
const ul = (t, e, o) => {
  const s = (o == null ? void 0 : o.renderBefore) ?? e;
  let l = s._$litPart$;
  if (l === void 0) {
    const r = (o == null ? void 0 : o.renderBefore) ?? null;
    s._$litPart$ = l = new Je(e.insertBefore(We(), r), r, void 0, o ?? {});
  }
  return l._$AI(t), l;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis;
let S = class extends Ce {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var o;
    const e = super.createRenderRoot();
    return (o = this.renderOptions).renderBefore ?? (o.renderBefore = e.firstChild), e;
  }
  update(e) {
    const o = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ul(o, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return me;
  }
};
var Ko;
S._$litElement$ = !0, S.finalized = !0, (Ko = fe.litElementHydrateSupport) == null || Ko.call(fe, { LitElement: S });
const Tt = fe.litElementPolyfillSupport;
Tt == null || Tt({ LitElement: S });
(fe.litElementVersions ?? (fe.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = (t) => (e, o) => {
  o !== void 0 ? o.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pl = { attribute: !0, type: String, converter: dt, reflect: !1, hasChanged: to }, fl = (t = pl, e, o) => {
  const { kind: s, metadata: l } = o;
  let r = globalThis.litPropertyMetadata.get(l);
  if (r === void 0 && globalThis.litPropertyMetadata.set(l, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(o.name, t), s === "accessor") {
    const { name: i } = o;
    return { set(n) {
      const a = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(i, a, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(i, void 0, t, n), n;
    } };
  }
  if (s === "setter") {
    const { name: i } = o;
    return function(n) {
      const a = this[i];
      e.call(this, n), this.requestUpdate(i, a, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function p(t) {
  return (e, o) => typeof o == "object" ? fl(t, e, o) : ((s, l, r) => {
    const i = l.hasOwnProperty(r);
    return l.constructor.createProperty(r, s), i ? Object.getOwnPropertyDescriptor(l, r) : void 0;
  })(t, e, o);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function so(t) {
  return p({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gl = (t, e, o) => (o.configurable = !0, o.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, o), o);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(t, e) {
  return (o, s, l) => {
    const r = (i) => {
      var n;
      return ((n = i.renderRoot) == null ? void 0 : n.querySelector(t)) ?? null;
    };
    return gl(o, s, { get() {
      return r(this);
    } });
  };
}
const ml = {
  "--band": "#1d4ed8",
  "--band-ink": "#ffffff",
  "--rail": "#064e3b",
  "--rail-group": "#059669",
  "--rail-button": "44px",
  "--power-on": "#4ade80",
  "--stop": "#ef4444"
}, Qe = 640, vl = Object.entries(ml).map(([t, e]) => `${t}: ${e};`).join(`
`), M = A`
  :host {
    ${_e(vl)}
  }
`, ls = A`
  sl-icon-button {
    color: var(--band-ink);
  }

  sl-icon-button::part(base):hover,
  sl-icon-button::part(base):focus-visible {
    color: rgba(255, 255, 255, 0.7);
  }
`;
var bl = Object.getOwnPropertyDescriptor, yl = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? bl(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = i(l) || l);
  return l;
};
let Ut = class extends S {
  render() {
    return $`
      <slot name="band"></slot>
      <div class="body">
        <slot name="rail"></slot>
        <div class="work"><slot></slot></div>
      </div>
    `;
  }
};
Ut.styles = [
  M,
  A`
      :host {
        display: flex;
        flex-direction: column;
        height: 100dvh;
      }

      .body {
        flex: 1;
        display: flex;
        min-height: 0;
      }

      .work {
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow: auto;
        position: relative;
      }

      @media (max-height: ${_e(Qe)}px) {
        .body {
          flex-direction: column;
        }
      }
    `
];
Ut = yl([
  T("look-shell")
], Ut);
function Re(t, e) {
  t.slot || (t.slot = e);
}
var wl = Object.getOwnPropertyDescriptor, xl = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? wl(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = i(l) || l);
  return l;
};
let It = class extends S {
  connectedCallback() {
    super.connectedCallback(), Re(this, "band");
  }
  render() {
    return $`
      <nav>
        <div class="left"><slot name="about"></slot></div>
        <div class="right">
          <slot></slot>
          <div class="tail">
            <slot name="gear"></slot>
            <slot name="power"></slot>
          </div>
        </div>
      </nav>
    `;
  }
};
It.styles = [
  M,
  A`
      :host {
        display: block;
        height: 60px;
        flex-shrink: 0;
        position: relative;
        z-index: 100;
        background: var(--band);
        color: var(--band-ink);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family: var(--sl-font-sans);
      }

      nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        height: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
      }

      .left {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .right {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
      }

      .tail {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `
];
It = xl([
  T("look-band")
], It);
var $l = A`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
function Te(t, e) {
  const o = yt({
    waitUntilFirstUpdate: !1
  }, e);
  return (s, l) => {
    const { update: r } = s, i = Array.isArray(t) ? t : [t];
    s.update = function(n) {
      i.forEach((a) => {
        const c = a;
        if (n.has(c)) {
          const d = n.get(c), h = this[c];
          d !== h && (!o.waitUntilFirstUpdate || this.hasUpdated) && this[l](d, h);
        }
      }), r.call(this, n);
    };
  };
}
var et = A`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`, nt, ee = class extends S {
  constructor() {
    super(), Hs(this, nt, !1), this.initialReflectedProperties = /* @__PURE__ */ new Map(), Object.entries(this.constructor.dependencies).forEach(([t, e]) => {
      this.constructor.define(t, e);
    });
  }
  emit(t, e) {
    const o = new CustomEvent(t, yt({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, e));
    return this.dispatchEvent(o), o;
  }
  /* eslint-enable */
  static define(t, e = this, o = {}) {
    const s = customElements.get(t);
    if (!s) {
      try {
        customElements.define(t, e, o);
      } catch {
        customElements.define(t, class extends e {
        }, o);
      }
      return;
    }
    let l = " (unknown version)", r = l;
    "version" in e && e.version && (l = " v" + e.version), "version" in s && s.version && (r = " v" + s.version), !(l && r && l === r) && console.warn(
      `Attempted to register <${t}>${l}, but <${t}>${r} has already been registered.`
    );
  }
  attributeChangedCallback(t, e, o) {
    Fs(this, nt) || (this.constructor.elementProperties.forEach(
      (s, l) => {
        s.reflect && this[l] != null && this.initialReflectedProperties.set(l, this[l]);
      }
    ), js(this, nt, !0)), super.attributeChangedCallback(t, e, o);
  }
  willUpdate(t) {
    super.willUpdate(t), this.initialReflectedProperties.forEach((e, o) => {
      t.has(o) && this[o] == null && (this[o] = e);
    });
  }
};
nt = /* @__PURE__ */ new WeakMap();
ee.version = "2.20.1";
ee.dependencies = {};
g([
  p()
], ee.prototype, "dir", 2);
g([
  p()
], ee.prototype, "lang", 2);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _l = (t, e) => (t == null ? void 0 : t._$litType$) !== void 0;
var je = Symbol(), lt = Symbol(), Mt, Dt = /* @__PURE__ */ new Map(), q = class extends ee {
  constructor() {
    super(...arguments), this.initialRender = !1, this.svg = null, this.label = "", this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(t, e) {
    var o;
    let s;
    if (e != null && e.spriteSheet)
      return this.svg = $`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`, this.svg;
    try {
      if (s = await fetch(t, { mode: "cors" }), !s.ok) return s.status === 410 ? je : lt;
    } catch {
      return lt;
    }
    try {
      const l = document.createElement("div");
      l.innerHTML = await s.text();
      const r = l.firstElementChild;
      if (((o = r == null ? void 0 : r.tagName) == null ? void 0 : o.toLowerCase()) !== "svg") return je;
      Mt || (Mt = new DOMParser());
      const n = Mt.parseFromString(r.outerHTML, "text/html").body.querySelector("svg");
      return n ? (n.part.add("svg"), document.adoptNode(n)) : je;
    } catch {
      return je;
    }
  }
  connectedCallback() {
    super.connectedCallback(), Os(this);
  }
  firstUpdated() {
    this.initialRender = !0, this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Ls(this);
  }
  getIconSource() {
    const t = vo(this.library);
    return this.name && t ? {
      url: t.resolver(this.name),
      fromLibrary: !0
    } : {
      url: this.src,
      fromLibrary: !1
    };
  }
  handleLabelChange() {
    typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
  }
  async setIcon() {
    var t;
    const { url: e, fromLibrary: o } = this.getIconSource(), s = o ? vo(this.library) : void 0;
    if (!e) {
      this.svg = null;
      return;
    }
    let l = Dt.get(e);
    if (l || (l = this.resolveIcon(e, s), Dt.set(e, l)), !this.initialRender)
      return;
    const r = await l;
    if (r === lt && Dt.delete(e), e === this.getIconSource().url) {
      if (_l(r)) {
        if (this.svg = r, s) {
          await this.updateComplete;
          const i = this.shadowRoot.querySelector("[part='svg']");
          typeof s.mutator == "function" && i && s.mutator(i);
        }
        return;
      }
      switch (r) {
        case lt:
        case je:
          this.svg = null, this.emit("sl-error");
          break;
        default:
          this.svg = r.cloneNode(!0), (t = s == null ? void 0 : s.mutator) == null || t.call(s, this.svg), this.emit("sl-load");
      }
    }
  }
  render() {
    return this.svg;
  }
};
q.styles = [et, $l];
g([
  so()
], q.prototype, "svg", 2);
g([
  p({ reflect: !0 })
], q.prototype, "name", 2);
g([
  p()
], q.prototype, "src", 2);
g([
  p()
], q.prototype, "label", 2);
g([
  p({ reflect: !0 })
], q.prototype, "library", 2);
g([
  Te("label")
], q.prototype, "handleLabelChange", 1);
g([
  Te(["name", "src", "library"])
], q.prototype, "setIcon", 1);
q.define("sl-icon");
function lo(t, e, o) {
  t.dispatchEvent(new CustomEvent(e, { detail: o, bubbles: !0, composed: !0 }));
}
const xt = (t, e) => lo(t, "look-press", { shiftKey: e.shiftKey ?? !1 });
var kl = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, $t = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Al(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && kl(e, o, l), l;
};
let Oe = class extends S {
  constructor() {
    super(...arguments), this.name = "", this.detail = "", this.pressable = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Re(this, "about");
  }
  render() {
    const t = $`<span class="text"
      >${this.name}${this.detail ? $`<small>${this.detail}</small>` : C}</span
    >`;
    return this.pressable ? $`<button class="about" @click=${(e) => xt(this, e)}>
      ${t}<sl-icon name="chevron-down"></sl-icon>
    </button>` : $`<div class="about">${t}</div>`;
  }
};
Oe.styles = [
  M,
  A`
      :host {
        display: block;
        min-width: 0;
      }

      .about {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        min-width: 0;
        font: inherit;
        font-size: 1.25rem;
        font-weight: 600;
        color: inherit;
        background: none;
        border: none;
        border-radius: 4px;
        padding: 0.2rem 0.4rem;
        margin-left: -0.4rem;
      }

      button.about {
        cursor: pointer;
      }

      button.about:hover,
      button.about:focus-visible {
        background: rgba(255, 255, 255, 0.15);
        outline: none;
      }

      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      small {
        font-weight: 400;
        opacity: 0.75;
        font-size: 0.8em;
        margin-left: 0.5rem;
      }

      sl-icon {
        flex-shrink: 0;
        font-size: 0.8em;
      }
    `
];
$t([
  p()
], Oe.prototype, "name", 2);
$t([
  p()
], Oe.prototype, "detail", 2);
$t([
  p({ type: Boolean, reflect: !0 })
], Oe.prototype, "pressable", 2);
Oe = $t([
  T("look-about")
], Oe);
var Cl = Object.getOwnPropertyDescriptor, El = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Cl(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = i(l) || l);
  return l;
};
let Vt = class extends S {
  render() {
    return $`<slot></slot>`;
  }
};
Vt.styles = [
  M,
  A`
      :host {
        white-space: nowrap;
        font-size: 0.95rem;
      }
    `
];
Vt = El([
  T("look-reading")
], Vt);
var Sl = Object.getOwnPropertyDescriptor, zl = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Sl(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = i(l) || l);
  return l;
};
let Wt = class extends S {
  render() {
    return $`<slot></slot>`;
  }
};
Wt.styles = [
  M,
  A`
      :host {
        display: inline-block;
        max-width: 20rem;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        white-space: nowrap;
        background: var(--stop);
        color: var(--band-ink);
        padding: 0.1rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
      }
    `
];
Wt = zl([
  T("look-chip")
], Wt);
var Pl = Object.defineProperty, Ol = Object.getOwnPropertyDescriptor, rs = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Ol(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Pl(e, o, l), l;
};
let pt = class extends S {
  constructor() {
    super(...arguments), this.state = "down";
  }
  render() {
    return $`<span class="dot" role="img" aria-label=${this.state}></span><slot></slot>`;
  }
};
pt.styles = [
  M,
  A`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        white-space: nowrap;
        font-size: 0.85rem;
      }

      .dot {
        width: 0.8rem;
        height: 0.8rem;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid var(--band-ink);
        background: var(--stop);
      }

      :host([state='up']) .dot {
        background: var(--power-on);
      }
    `
];
rs([
  p({ reflect: !0 })
], pt.prototype, "state", 2);
pt = rs([
  T("look-dot")
], pt);
var Ll = A`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rl = { ATTRIBUTE: 1 }, Tl = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ml = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, o, s) {
    this._$Ct = e, this._$AM = o, this._$Ci = s;
  }
  _$AS(e, o) {
    return this.update(e, o);
  }
  update(e, o) {
    return this.render(...o);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = Tl(class extends Ml {
  constructor(t) {
    var e;
    if (super(t), t.type !== Rl.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var s, l;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in e) e[r] && !((s = this.nt) != null && s.has(r)) && this.st.add(r);
      return this.render(e);
    }
    const o = t.element.classList;
    for (const r of this.st) r in e || (o.remove(r), this.st.delete(r));
    for (const r in e) {
      const i = !!e[r];
      i === this.st.has(r) || (l = this.nt) != null && l.has(r) || (i ? (o.add(r), this.st.add(r)) : (o.remove(r), this.st.delete(r)));
    }
    return me;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const is = Symbol.for(""), Dl = (t) => {
  if ((t == null ? void 0 : t.r) === is) return t == null ? void 0 : t._$litStatic$;
}, Oo = (t, ...e) => ({ _$litStatic$: e.reduce((o, s, l) => o + ((r) => {
  if (r._$litStatic$ !== void 0) return r._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(s) + t[l + 1], t[0]), r: is }), Lo = /* @__PURE__ */ new Map(), Bl = (t) => (e, ...o) => {
  const s = o.length;
  let l, r;
  const i = [], n = [];
  let a, c = 0, d = !1;
  for (; c < s; ) {
    for (a = e[c]; c < s && (r = o[c], (l = Dl(r)) !== void 0); ) a += l + e[++c], d = !0;
    c !== s && n.push(r), i.push(a), c++;
  }
  if (c === s && i.push(e[s]), d) {
    const h = i.join("$$lit$$");
    (e = Lo.get(h)) === void 0 && (i.raw = i, Lo.set(h, e = i)), o = n;
  }
  return t(e, ...o);
}, Nl = Bl($);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = (t) => t ?? C;
var D = class extends ee {
  constructor() {
    super(...arguments), this.hasFocus = !1, this.label = "", this.disabled = !1;
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleClick(t) {
    this.disabled && (t.preventDefault(), t.stopPropagation());
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(t) {
    this.button.focus(t);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const t = !!this.href, e = t ? Oo`a` : Oo`button`;
    return Nl`
      <${e}
        part="base"
        class=${Xe({
      "icon-button": !0,
      "icon-button--disabled": !t && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${B(t ? void 0 : this.disabled)}
        type=${B(t ? void 0 : "button")}
        href=${B(t ? this.href : void 0)}
        target=${B(t ? this.target : void 0)}
        download=${B(t ? this.download : void 0)}
        rel=${B(t && this.target ? "noreferrer noopener" : void 0)}
        role=${B(t ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${B(this.name)}
          library=${B(this.library)}
          src=${B(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `;
  }
};
D.styles = [et, Ll];
D.dependencies = { "sl-icon": q };
g([
  W(".icon-button")
], D.prototype, "button", 2);
g([
  so()
], D.prototype, "hasFocus", 2);
g([
  p()
], D.prototype, "name", 2);
g([
  p()
], D.prototype, "library", 2);
g([
  p()
], D.prototype, "src", 2);
g([
  p()
], D.prototype, "href", 2);
g([
  p()
], D.prototype, "target", 2);
g([
  p()
], D.prototype, "download", 2);
g([
  p()
], D.prototype, "label", 2);
g([
  p({ type: Boolean, reflect: !0 })
], D.prototype, "disabled", 2);
D.define("sl-icon-button");
var Fl = A`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`, Hl = A`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;
const qt = /* @__PURE__ */ new Set(), Ee = /* @__PURE__ */ new Map();
let Y, ro = "ltr", io = "en";
const ns = typeof MutationObserver < "u" && typeof document < "u" && typeof document.documentElement < "u";
if (ns) {
  const t = new MutationObserver(cs);
  ro = document.documentElement.dir || "ltr", io = document.documentElement.lang || navigator.language, t.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["dir", "lang"]
  });
}
function as(...t) {
  t.map((e) => {
    const o = e.$code.toLowerCase();
    Ee.has(o) ? Ee.set(o, Object.assign(Object.assign({}, Ee.get(o)), e)) : Ee.set(o, e), Y || (Y = e);
  }), cs();
}
function cs() {
  ns && (ro = document.documentElement.dir || "ltr", io = document.documentElement.lang || navigator.language), [...qt.keys()].map((t) => {
    typeof t.requestUpdate == "function" && t.requestUpdate();
  });
}
let jl = class {
  constructor(e) {
    this.host = e, this.host.addController(this);
  }
  hostConnected() {
    qt.add(this.host);
  }
  hostDisconnected() {
    qt.delete(this.host);
  }
  dir() {
    return `${this.host.dir || ro}`.toLowerCase();
  }
  lang() {
    const e = `${this.host.lang || io}`.toLowerCase().replace(/_/g, "-");
    try {
      return new Intl.Locale(e), e;
    } catch {
      return Y ? Y.$code.toLowerCase() : "en";
    }
  }
  getTranslationData(e) {
    var o, s;
    let l;
    try {
      l = new Intl.Locale(e.replace(/_/g, "-"));
    } catch {
      return { locale: void 0, language: "", region: "", primary: void 0, secondary: void 0 };
    }
    const r = l.language.toLowerCase(), i = (s = (o = l.region) === null || o === void 0 ? void 0 : o.toLowerCase()) !== null && s !== void 0 ? s : "", n = Ee.get(`${r}-${i}`), a = Ee.get(r);
    return { locale: l, language: r, region: i, primary: n, secondary: a };
  }
  exists(e, o) {
    var s;
    const { primary: l, secondary: r } = this.getTranslationData((s = o.lang) !== null && s !== void 0 ? s : this.lang());
    return o = Object.assign({ includeFallback: !1 }, o), !!(l && l[e] || r && r[e] || o.includeFallback && Y && Y[e]);
  }
  term(e, ...o) {
    const { primary: s, secondary: l } = this.getTranslationData(this.lang());
    let r;
    if (s && s[e])
      r = s[e];
    else if (l && l[e])
      r = l[e];
    else if (Y && Y[e])
      r = Y[e];
    else
      return console.error(`No translation found for: ${String(e)}`), String(e);
    return typeof r == "function" ? r(...o) : r;
  }
  date(e, o) {
    return e = new Date(e), new Intl.DateTimeFormat(this.lang(), o).format(e);
  }
  number(e, o) {
    return e = Number(e), isNaN(e) ? "" : new Intl.NumberFormat(this.lang(), o).format(e);
  }
  relativeTime(e, o, s) {
    return new Intl.RelativeTimeFormat(this.lang(), s).format(e, o);
  }
};
var hs = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (t, e) => `Go to slide ${t} of ${e}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (t) => t === 0 ? "No options selected" : t === 1 ? "1 option selected" : `${t} options selected`,
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (t) => `Slide ${t}`,
  toggleColorFormat: "Toggle color format"
};
as(hs);
var Ul = hs, no = class extends jl {
};
as(Ul);
const re = Math.min, G = Math.max, ft = Math.round, rt = Math.floor, J = (t) => ({
  x: t,
  y: t
}), Il = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ds(t, e, o) {
  return G(t, re(e, o));
}
function Me(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ve(t) {
  return t.split("-")[0];
}
function De(t) {
  return t.split("-")[1];
}
function us(t) {
  return t === "x" ? "y" : "x";
}
function ao(t) {
  return t === "y" ? "height" : "width";
}
function Z(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function co(t) {
  return us(Z(t));
}
function Vl(t, e, o) {
  o === void 0 && (o = !1);
  const s = De(t), l = co(t), r = ao(l);
  let i = l === "x" ? s === (o ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (i = gt(i)), [i, gt(i)];
}
function Wl(t) {
  const e = gt(t);
  return [Kt(t), e, Kt(e)];
}
function Kt(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Ro = ["left", "right"], To = ["right", "left"], ql = ["top", "bottom"], Kl = ["bottom", "top"];
function Xl(t, e, o) {
  switch (t) {
    case "top":
    case "bottom":
      return o ? e ? To : Ro : e ? Ro : To;
    case "left":
    case "right":
      return e ? ql : Kl;
    default:
      return [];
  }
}
function Yl(t, e, o, s) {
  const l = De(t);
  let r = Xl(ve(t), o === "start", s);
  return l && (r = r.map((i) => i + "-" + l), e && (r = r.concat(r.map(Kt)))), r;
}
function gt(t) {
  const e = ve(t);
  return Il[e] + t.slice(e.length);
}
function Zl(t) {
  var e, o, s, l;
  return {
    top: (e = t.top) != null ? e : 0,
    right: (o = t.right) != null ? o : 0,
    bottom: (s = t.bottom) != null ? s : 0,
    left: (l = t.left) != null ? l : 0
  };
}
function ps(t) {
  return typeof t != "number" ? Zl(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function mt(t) {
  const {
    x: e,
    y: o,
    width: s,
    height: l
  } = t;
  return {
    width: s,
    height: l,
    top: o,
    left: e,
    right: e + s,
    bottom: o + l,
    x: e,
    y: o
  };
}
function Mo(t, e, o) {
  let {
    reference: s,
    floating: l
  } = t;
  const r = Z(e), i = co(e), n = ao(i), a = ve(e), c = r === "y", d = s.x + s.width / 2 - l.width / 2, h = s.y + s.height / 2 - l.height / 2, f = s[n] / 2 - l[n] / 2;
  let u;
  switch (a) {
    case "top":
      u = {
        x: d,
        y: s.y - l.height
      };
      break;
    case "bottom":
      u = {
        x: d,
        y: s.y + s.height
      };
      break;
    case "right":
      u = {
        x: s.x + s.width,
        y: h
      };
      break;
    case "left":
      u = {
        x: s.x - l.width,
        y: h
      };
      break;
    default:
      u = {
        x: s.x,
        y: s.y
      };
  }
  const m = De(e);
  return m && (u[i] += f * (m === "end" ? 1 : -1) * (o && c ? -1 : 1)), u;
}
async function Gl(t, e) {
  var o;
  e === void 0 && (e = {});
  const {
    x: s,
    y: l,
    platform: r,
    rects: i,
    elements: n,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: h = "floating",
    altBoundary: f = !1,
    padding: u = 0
  } = Me(e, t), m = ps(u), y = n[f ? h === "floating" ? "reference" : "floating" : h], b = mt(await r.getClippingRect({
    element: (o = await (r.isElement == null ? void 0 : r.isElement(y))) == null || o ? y : y.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(n.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: a
  })), w = h === "floating" ? {
    x: s,
    y: l,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(n.floating)), k = await (r.isElement == null ? void 0 : r.isElement(x)) && await (r.getScale == null ? void 0 : r.getScale(x)) || {
    x: 1,
    y: 1
  }, O = mt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: n,
    rect: w,
    offsetParent: x,
    strategy: a
  }) : w);
  return {
    top: (b.top - O.top + m.top) / k.y,
    bottom: (O.bottom - b.bottom + m.bottom) / k.y,
    left: (b.left - O.left + m.left) / k.x,
    right: (O.right - b.right + m.right) / k.x
  };
}
const Jl = 50, Ql = async (t, e, o) => {
  const {
    placement: s = "bottom",
    strategy: l = "absolute",
    middleware: r = [],
    platform: i
  } = o, n = i.detectOverflow ? i : {
    ...i,
    detectOverflow: Gl
  }, a = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let c = await i.getElementRects({
    reference: t,
    floating: e,
    strategy: l
  }), {
    x: d,
    y: h
  } = Mo(c, s, a), f = s, u = 0;
  const m = {};
  for (let v = 0; v < r.length; v++) {
    const y = r[v];
    if (!y)
      continue;
    const {
      name: b,
      fn: w
    } = y, {
      x,
      y: k,
      data: O,
      reset: E
    } = await w({
      x: d,
      y: h,
      initialPlacement: s,
      placement: f,
      strategy: l,
      middlewareData: m,
      rects: c,
      platform: n,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = x ?? d, h = k ?? h, m[b] = {
      ...m[b],
      ...O
    }, E && u < Jl && (u++, typeof E == "object" && (E.placement && (f = E.placement), E.rects && (c = E.rects === !0 ? await i.getElementRects({
      reference: t,
      floating: e,
      strategy: l
    }) : E.rects), {
      x: d,
      y: h
    } = Mo(c, f, a)), v = -1);
  }
  return {
    x: d,
    y: h,
    placement: f,
    strategy: l,
    middlewareData: m
  };
}, er = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: o,
      y: s,
      placement: l,
      rects: r,
      platform: i,
      elements: n,
      middlewareData: a
    } = e, {
      element: c,
      padding: d = 0
    } = Me(t, e) || {};
    if (c == null)
      return {};
    const h = ps(d), f = {
      x: o,
      y: s
    }, u = co(l), m = ao(u), v = await i.getDimensions(c), y = u === "y", b = y ? "top" : "left", w = y ? "bottom" : "right", x = y ? "clientHeight" : "clientWidth", k = r.reference[m] + r.reference[u] - f[u] - r.floating[m], O = f[u] - r.reference[u], E = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let L = E ? E[x] : 0;
    (!L || !await (i.isElement == null ? void 0 : i.isElement(E))) && (L = n.floating[x] || r.floating[m]);
    const N = k / 2 - O / 2, j = L / 2 - v[m] / 2 - 1, P = re(h[b], j), Ne = re(h[w], j), Fe = L - v[m] - Ne, U = L / 2 - v[m] / 2 + N, F = ds(P, U, Fe), ne = !a.arrow && De(l) != null && U !== F && r.reference[m] / 2 - (U < P ? P : Ne) - v[m] / 2 < 0, X = ne ? U < P ? U - P : U - Fe : 0;
    return {
      [u]: f[u] + X,
      data: {
        [u]: F,
        centerOffset: U - F - X,
        ...ne && {
          alignmentOffset: X
        }
      },
      reset: ne
    };
  }
}), tr = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var o, s;
      const {
        placement: l,
        middlewareData: r,
        rects: i,
        initialPlacement: n,
        platform: a,
        elements: c
      } = e, {
        mainAxis: d = !0,
        crossAxis: h = !0,
        fallbackPlacements: f,
        fallbackStrategy: u = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: v = !0,
        ...y
      } = Me(t, e);
      if ((o = r.arrow) != null && o.alignmentOffset)
        return {};
      const b = ve(l), w = Z(n), x = ve(n) === n, k = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), O = f || (x || !v ? [gt(n)] : Wl(n)), E = m !== "none";
      !f && E && O.push(...Yl(n, v, m, k));
      const L = [n, ...O], N = await a.detectOverflow(e, y), j = [];
      let P = ((s = r.flip) == null ? void 0 : s.overflows) || [];
      if (d && j.push(N[b]), h) {
        const F = Vl(l, i, k);
        j.push(N[F[0]], N[F[1]]);
      }
      if (P = [...P, {
        placement: l,
        overflows: j
      }], !j.every((F) => F <= 0)) {
        var Ne, Fe;
        const F = (((Ne = r.flip) == null ? void 0 : Ne.index) || 0) + 1, ne = L[F];
        if (ne && (!(h === "alignment" ? w !== Z(ne) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        P.every((H) => Z(H.placement) === w ? H.overflows[0] > 0 : !0)))
          return {
            data: {
              index: F,
              overflows: P
            },
            reset: {
              placement: ne
            }
          };
        let X = (Fe = P.filter((ae) => ae.overflows[0] <= 0).sort((ae, H) => ae.overflows[1] - H.overflows[1])[0]) == null ? void 0 : Fe.placement;
        if (!X)
          switch (u) {
            case "bestFit": {
              var U;
              const ae = (U = P.filter((H) => {
                if (E) {
                  const oe = Z(H.placement);
                  return oe === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  oe === "y";
                }
                return !0;
              }).map((H) => [H.placement, H.overflows.filter((oe) => oe > 0).reduce((oe, As) => oe + As, 0)]).sort((H, oe) => H[1] - oe[1])[0]) == null ? void 0 : U[0];
              ae && (X = ae);
              break;
            }
            case "initialPlacement":
              X = n;
              break;
          }
        if (l !== X)
          return {
            reset: {
              placement: X
            }
          };
      }
      return {};
    }
  };
}, or = /* @__PURE__ */ new Set(["left", "top"]);
async function sr(t, e) {
  const {
    placement: o,
    platform: s,
    elements: l
  } = t, r = await (s.isRTL == null ? void 0 : s.isRTL(l.floating)), i = ve(o), n = De(o), a = Z(o) === "y", c = or.has(i) ? -1 : 1, d = r && a ? -1 : 1, h = Me(e, t);
  let {
    mainAxis: f,
    crossAxis: u,
    alignmentAxis: m
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: h.mainAxis || 0,
    crossAxis: h.crossAxis || 0,
    alignmentAxis: h.alignmentAxis
  };
  return n && typeof m == "number" && (u = n === "end" ? m * -1 : m), a ? {
    x: u * d,
    y: f * c
  } : {
    x: f * c,
    y: u * d
  };
}
const lr = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var o, s;
      const {
        x: l,
        y: r,
        placement: i,
        middlewareData: n
      } = e, a = await sr(e, t);
      return i === ((o = n.offset) == null ? void 0 : o.placement) && (s = n.arrow) != null && s.alignmentOffset ? {} : {
        x: l + a.x,
        y: r + a.y,
        data: {
          ...a,
          placement: i
        }
      };
    }
  };
}, rr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: o,
        y: s,
        placement: l,
        platform: r
      } = e, {
        mainAxis: i = !0,
        crossAxis: n = !1,
        limiter: a = {
          fn: (w) => {
            let {
              x,
              y: k
            } = w;
            return {
              x,
              y: k
            };
          }
        },
        ...c
      } = Me(t, e), d = {
        x: o,
        y: s
      }, h = await r.detectOverflow(e, c), f = Z(l), u = us(f);
      let m = d[u], v = d[f];
      const y = (w, x) => ds(x + h[w === "y" ? "top" : "left"], x, x - h[w === "y" ? "bottom" : "right"]);
      i && (m = y(u, m)), n && (v = y(f, v));
      const b = a.fn({
        ...e,
        [u]: m,
        [f]: v
      });
      return {
        ...b,
        data: {
          x: b.x - o,
          y: b.y - s,
          enabled: {
            [u]: i,
            [f]: n
          }
        }
      };
    }
  };
}, ir = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      const {
        placement: o,
        rects: s,
        platform: l,
        elements: r
      } = e, {
        apply: i = () => {
        },
        ...n
      } = Me(t, e), a = await l.detectOverflow(e, n), c = ve(o), d = De(o), h = Z(o) === "y", {
        width: f,
        height: u
      } = s.floating;
      let m, v;
      c === "top" || c === "bottom" ? (m = c, v = d === (await (l.isRTL == null ? void 0 : l.isRTL(r.floating)) ? "start" : "end") ? "left" : "right") : (v = c, m = d === "end" ? "top" : "bottom");
      const y = u - a.top - a.bottom, b = f - a.left - a.right, w = re(u - a[m], y), x = re(f - a[v], b), k = e.middlewareData.shift, O = !k;
      let E = w, L = x;
      k != null && k.enabled.x && (L = b), k != null && k.enabled.y && (E = y), O && !d && (h ? L = f - 2 * G(a.left, a.right) : E = u - 2 * G(a.top, a.bottom)), await i({
        ...e,
        availableWidth: L,
        availableHeight: E
      });
      const N = await l.getDimensions(r.floating);
      return f !== N.width || u !== N.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function _t() {
  return typeof window < "u";
}
function Be(t) {
  return fs(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function R(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function te(t) {
  var e;
  return (e = (fs(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function fs(t) {
  return _t() ? t instanceof Node || t instanceof R(t).Node : !1;
}
function I(t) {
  return _t() ? t instanceof Element || t instanceof R(t).Element : !1;
}
function ie(t) {
  return _t() ? t instanceof HTMLElement || t instanceof R(t).HTMLElement : !1;
}
function Do(t) {
  return !_t() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof R(t).ShadowRoot;
}
function kt(t) {
  const {
    overflow: e,
    overflowX: o,
    overflowY: s,
    display: l
  } = V(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + s + o) && l !== "inline" && l !== "contents";
}
function nr(t) {
  return /^(table|td|th)$/.test(Be(t));
}
function At(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const ar = /transform|translate|scale|rotate|perspective|filter/, cr = /paint|layout|strict|content/, he = (t) => !!t && t !== "none";
let Bt;
function Ct(t) {
  const e = I(t) ? V(t) : t;
  return he(e.transform) || he(e.translate) || he(e.scale) || he(e.rotate) || he(e.perspective) || !ho() && (he(e.backdropFilter) || he(e.filter)) || ar.test(e.willChange || "") || cr.test(e.contain || "");
}
function hr(t) {
  let e = be(t);
  for (; ie(e) && !Ye(e); ) {
    if (Ct(e))
      return e;
    if (At(e))
      return null;
    e = be(e);
  }
  return null;
}
function ho() {
  return Bt == null && (Bt = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Bt;
}
function Ye(t) {
  return /^(html|body|#document)$/.test(Be(t));
}
function V(t) {
  return R(t).getComputedStyle(t);
}
function Et(t) {
  return I(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function be(t) {
  if (Be(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Do(t) && t.host || // Fallback.
    te(t)
  );
  return Do(e) ? e.host : e;
}
function gs(t) {
  const e = be(t);
  return Ye(e) ? (t.ownerDocument || t).body : ie(e) && kt(e) ? e : gs(e);
}
function Ze(t, e, o) {
  var s;
  e === void 0 && (e = []), o === void 0 && (o = !0);
  const l = gs(t), r = l === ((s = t.ownerDocument) == null ? void 0 : s.body), i = R(l);
  if (r) {
    const n = Xt(i);
    return e.concat(i, i.visualViewport || [], kt(l) ? l : [], n && o ? Ze(n) : []);
  } else
    return e.concat(l, Ze(l, [], o));
}
function Xt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function ms(t) {
  const e = V(t);
  let o = parseFloat(e.width) || 0, s = parseFloat(e.height) || 0;
  const l = ie(t), r = l ? t.offsetWidth : o, i = l ? t.offsetHeight : s, n = ft(o) !== r || ft(s) !== i;
  return n && (o = r, s = i), {
    width: o,
    height: s,
    $: n
  };
}
function uo(t) {
  return I(t) ? t : t.contextElement;
}
function ze(t) {
  const e = uo(t);
  if (!ie(e))
    return J(1);
  const o = e.getBoundingClientRect(), {
    width: s,
    height: l,
    $: r
  } = ms(e);
  let i = (r ? ft(o.width) : o.width) / s, n = (r ? ft(o.height) : o.height) / l;
  return (!i || !Number.isFinite(i)) && (i = 1), (!n || !Number.isFinite(n)) && (n = 1), {
    x: i,
    y: n
  };
}
const dr = /* @__PURE__ */ J(0);
function vs(t) {
  const e = R(t);
  return !ho() || !e.visualViewport ? dr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ur(t, e, o) {
  return e === void 0 && (e = !1), !!o && e && o === R(t);
}
function ye(t, e, o, s) {
  e === void 0 && (e = !1), o === void 0 && (o = !1);
  const l = t.getBoundingClientRect(), r = uo(t);
  let i = J(1);
  e && (s ? I(s) && (i = ze(s)) : i = ze(t));
  const n = ur(r, o, s) ? vs(r) : J(0);
  let a = (l.left + n.x) / i.x, c = (l.top + n.y) / i.y, d = l.width / i.x, h = l.height / i.y;
  if (r && s) {
    const f = R(r), u = I(s) ? R(s) : s;
    let m = f, v = Xt(m);
    for (; v && u !== m; ) {
      const y = ze(v), b = v.getBoundingClientRect(), w = V(v), x = b.left + (v.clientLeft + parseFloat(w.paddingLeft)) * y.x, k = b.top + (v.clientTop + parseFloat(w.paddingTop)) * y.y;
      a *= y.x, c *= y.y, d *= y.x, h *= y.y, a += x, c += k, m = R(v), v = Xt(m);
    }
  }
  return mt({
    width: d,
    height: h,
    x: a,
    y: c
  });
}
function St(t, e) {
  const o = Et(t).scrollLeft;
  return e ? e.left + o : ye(te(t)).left + o;
}
function bs(t, e) {
  const o = t.getBoundingClientRect(), s = o.left + e.scrollLeft - St(t, o), l = o.top + e.scrollTop;
  return {
    x: s,
    y: l
  };
}
function pr(t) {
  let {
    elements: e,
    rect: o,
    offsetParent: s,
    strategy: l
  } = t;
  const r = l === "fixed", i = te(s), n = e ? At(e.floating) : !1;
  if (s === i || n && r)
    return o;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = J(1);
  const d = J(0), h = ie(s);
  if ((h || !r) && ((Be(s) !== "body" || kt(i)) && (a = Et(s)), h)) {
    const u = ye(s);
    c = ze(s), d.x = u.x + s.clientLeft, d.y = u.y + s.clientTop;
  }
  const f = i && !h && !r ? bs(i, a) : J(0);
  return {
    width: o.width * c.x,
    height: o.height * c.y,
    x: o.x * c.x - a.scrollLeft * c.x + d.x + f.x,
    y: o.y * c.y - a.scrollTop * c.y + d.y + f.y
  };
}
function fr(t) {
  return t.getClientRects ? Array.from(t.getClientRects()) : [];
}
function gr(t) {
  const e = Et(t), o = t.ownerDocument.body, s = G(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), l = G(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let r = -e.scrollLeft + St(t);
  const i = -e.scrollTop;
  return V(o).direction === "rtl" && (r += G(t.clientWidth, o.clientWidth) - s), {
    width: s,
    height: l,
    x: r,
    y: i
  };
}
const mr = 25;
function vr(t, e, o) {
  o === void 0 && (o = "viewport");
  const s = o === "layoutViewport", l = R(t), r = te(t), i = l.visualViewport;
  let n = r.clientWidth, a = r.clientHeight, c = 0, d = 0;
  if (i) {
    const f = !ho() || e === "fixed";
    s ? f || (c = -i.offsetLeft, d = -i.offsetTop) : (n = i.width, a = i.height, f && (c = i.offsetLeft, d = i.offsetTop));
  }
  if (St(r) <= 0) {
    const f = r.ownerDocument, u = f.body, m = getComputedStyle(u), v = f.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, y = Math.abs(r.clientWidth - u.clientWidth - v), b = getComputedStyle(r).scrollbarGutter === "stable both-edges" ? y / 2 : y;
    b <= mr && (n -= b);
  }
  return {
    width: n,
    height: a,
    x: c,
    y: d
  };
}
function br(t, e) {
  const o = ye(t, !0, e === "fixed"), s = o.top + t.clientTop, l = o.left + t.clientLeft, r = ze(t), i = t.clientWidth * r.x, n = t.clientHeight * r.y, a = l * r.x, c = s * r.y;
  return {
    width: i,
    height: n,
    x: a,
    y: c
  };
}
function Bo(t, e, o) {
  let s;
  if (e === "viewport" || e === "layoutViewport")
    s = vr(t, o, e);
  else if (e === "document")
    s = gr(te(t));
  else if (I(e))
    s = br(e, o);
  else {
    const l = vs(t);
    s = {
      x: e.x - l.x,
      y: e.y - l.y,
      width: e.width,
      height: e.height
    };
  }
  return mt(s);
}
function yr(t, e) {
  const o = e.get(t);
  if (o)
    return o;
  let s = Ze(t, [], !1).filter((n) => I(n) && Be(n) !== "body"), l = null;
  const r = V(t).position === "fixed";
  let i = r ? be(t) : t;
  for (; I(i) && !Ye(i); ) {
    const n = V(i), a = Ct(i), c = l ? l.position : r ? "fixed" : "";
    !a && (c === "fixed" || c === "absolute" && n.position === "static") ? s = s.filter((h) => h !== i) : l = n, i = be(i);
  }
  return e.set(t, s), s;
}
function wr(t) {
  let {
    element: e,
    boundary: o,
    rootBoundary: s,
    strategy: l
  } = t;
  const i = [...o === "clippingAncestors" ? At(e) ? [] : yr(e, this._c) : [].concat(o), s], n = Bo(e, i[0], l);
  let a = n.top, c = n.right, d = n.bottom, h = n.left;
  for (let f = 1; f < i.length; f++) {
    const u = Bo(e, i[f], l);
    a = G(u.top, a), c = re(u.right, c), d = re(u.bottom, d), h = G(u.left, h);
  }
  return {
    width: c - h,
    height: d - a,
    x: h,
    y: a
  };
}
function xr(t) {
  const {
    width: e,
    height: o
  } = ms(t);
  return {
    width: e,
    height: o
  };
}
function $r(t, e, o) {
  const s = ie(e), l = te(e), r = o === "fixed", i = ye(t, !0, r, e);
  let n = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = J(0);
  if ((s || !r) && ((Be(e) !== "body" || kt(l)) && (n = Et(e)), s)) {
    const f = ye(e, !0, r, e);
    a.x = f.x + e.clientLeft, a.y = f.y + e.clientTop;
  }
  !s && l && (a.x = St(l));
  const c = l && !s && !r ? bs(l, n) : J(0), d = i.left + n.scrollLeft - a.x - c.x, h = i.top + n.scrollTop - a.y - c.y;
  return {
    x: d,
    y: h,
    width: i.width,
    height: i.height
  };
}
function Nt(t) {
  return V(t).position === "static";
}
function No(t, e) {
  if (!ie(t) || V(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let o = t.offsetParent;
  return te(t) === o && (o = o.ownerDocument.body), o;
}
function ys(t, e) {
  const o = R(t);
  if (At(t))
    return o;
  if (!ie(t)) {
    let l = be(t);
    for (; l && !Ye(l); ) {
      if (I(l) && !Nt(l))
        return l;
      l = be(l);
    }
    return o;
  }
  let s = No(t, e);
  for (; s && nr(s) && Nt(s); )
    s = No(s, e);
  return s && Ye(s) && Nt(s) && !Ct(s) ? o : s || hr(t) || o;
}
const _r = async function(t) {
  const e = this.getOffsetParent || ys, o = this.getDimensions, s = await o(t.floating);
  return {
    reference: $r(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }
  };
};
function kr(t) {
  return V(t).direction === "rtl";
}
const at = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pr,
  getDocumentElement: te,
  getClippingRect: wr,
  getOffsetParent: ys,
  getElementRects: _r,
  getClientRects: fr,
  getDimensions: xr,
  getScale: ze,
  isElement: I,
  isRTL: kr
};
function ws(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Ar(t, e, o) {
  let s = null, l;
  const r = te(t);
  function i() {
    var d;
    clearTimeout(l), (d = s) == null || d.disconnect(), s = null;
  }
  function n(d, h) {
    d === void 0 && (d = !1), h === void 0 && (h = 1), i();
    const f = t.getBoundingClientRect(), {
      left: u,
      top: m,
      width: v,
      height: y
    } = f;
    if (d || e(), !v || !y)
      return;
    const b = rt(m), w = rt(r.clientWidth - (u + v)), x = rt(r.clientHeight - (m + y)), k = rt(u), E = {
      rootMargin: -b + "px " + -w + "px " + -x + "px " + -k + "px",
      threshold: G(0, re(1, h)) || 1
    };
    let L = !0;
    function N(j) {
      const P = j[0].intersectionRatio;
      if (!ws(f, t.getBoundingClientRect()))
        return n();
      if (P !== h) {
        if (!L)
          return n();
        P ? n(!1, P) : l = setTimeout(() => {
          n(!1, 1e-7);
        }, 1e3);
      }
      L = !1;
    }
    try {
      s = new IntersectionObserver(N, {
        ...E,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      s = new IntersectionObserver(N, E);
    }
    s.observe(t);
  }
  const a = R(t), c = () => n(o);
  return a.addEventListener("resize", c), n(!0), () => {
    a.removeEventListener("resize", c), i();
  };
}
function Cr(t, e, o, s) {
  s === void 0 && (s = {});
  const {
    ancestorScroll: l = !0,
    ancestorResize: r = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: n = typeof IntersectionObserver == "function",
    animationFrame: a = !1
  } = s, c = uo(t), d = l || r ? [...c ? Ze(c) : [], ...e ? Ze(e) : []] : [];
  d.forEach((b) => {
    l && b.addEventListener("scroll", o), r && b.addEventListener("resize", o);
  });
  const h = c && n ? Ar(c, o, r) : null;
  let f = -1, u = null;
  i && (u = new ResizeObserver((b) => {
    let [w] = b;
    w && w.target === c && u && e && (u.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var x;
      (x = u) == null || x.observe(e);
    })), o();
  }), c && !a && u.observe(c), e && u.observe(e));
  let m, v = a ? ye(t) : null;
  a && y();
  function y() {
    const b = ye(t);
    v && !ws(v, b) && o(), v = b, m = requestAnimationFrame(y);
  }
  return o(), () => {
    var b;
    d.forEach((w) => {
      l && w.removeEventListener("scroll", o), r && w.removeEventListener("resize", o);
    }), h == null || h(), (b = u) == null || b.disconnect(), u = null, a && cancelAnimationFrame(m);
  };
}
const Er = lr, Sr = rr, zr = tr, Fo = ir, Pr = er, Or = (t, e, o) => {
  const s = /* @__PURE__ */ new Map(), l = o ?? {}, r = {
    ...at,
    ...l.platform,
    _c: s
  };
  return Ql(t, e, {
    ...l,
    platform: r
  });
};
function Lr(t) {
  return Rr(t);
}
function Ft(t) {
  return t.assignedSlot ? t.assignedSlot : t.parentNode instanceof ShadowRoot ? t.parentNode.host : t.parentNode;
}
function Rr(t) {
  for (let e = t; e; e = Ft(e)) if (e instanceof Element && getComputedStyle(e).display === "none") return null;
  for (let e = Ft(t); e; e = Ft(e)) {
    if (!(e instanceof Element)) continue;
    const o = getComputedStyle(e);
    if (o.display !== "contents" && (o.position !== "static" || Ct(o) || e.tagName === "BODY"))
      return e;
  }
  return null;
}
function Tr(t) {
  return t !== null && typeof t == "object" && "getBoundingClientRect" in t && ("contextElement" in t ? t.contextElement instanceof Element : !0);
}
var _ = class extends ee {
  constructor() {
    super(...arguments), this.localize = new no(this), this.active = !1, this.placement = "top", this.strategy = "absolute", this.distance = 0, this.skidding = 0, this.arrow = !1, this.arrowPlacement = "anchor", this.arrowPadding = 10, this.flip = !1, this.flipFallbackPlacements = "", this.flipFallbackStrategy = "best-fit", this.flipPadding = 0, this.shift = !1, this.shiftPadding = 0, this.autoSizePadding = 0, this.hoverBridge = !1, this.updateHoverBridge = () => {
      if (this.hoverBridge && this.anchorEl) {
        const t = this.anchorEl.getBoundingClientRect(), e = this.popup.getBoundingClientRect(), o = this.placement.includes("top") || this.placement.includes("bottom");
        let s = 0, l = 0, r = 0, i = 0, n = 0, a = 0, c = 0, d = 0;
        o ? t.top < e.top ? (s = t.left, l = t.bottom, r = t.right, i = t.bottom, n = e.left, a = e.top, c = e.right, d = e.top) : (s = e.left, l = e.bottom, r = e.right, i = e.bottom, n = t.left, a = t.top, c = t.right, d = t.top) : t.left < e.left ? (s = t.right, l = t.top, r = e.left, i = e.top, n = t.right, a = t.bottom, c = e.left, d = e.bottom) : (s = e.right, l = e.top, r = t.left, i = t.top, n = e.right, a = e.bottom, c = t.left, d = t.bottom), this.style.setProperty("--hover-bridge-top-left-x", `${s}px`), this.style.setProperty("--hover-bridge-top-left-y", `${l}px`), this.style.setProperty("--hover-bridge-top-right-x", `${r}px`), this.style.setProperty("--hover-bridge-top-right-y", `${i}px`), this.style.setProperty("--hover-bridge-bottom-left-x", `${n}px`), this.style.setProperty("--hover-bridge-bottom-left-y", `${a}px`), this.style.setProperty("--hover-bridge-bottom-right-x", `${c}px`), this.style.setProperty("--hover-bridge-bottom-right-y", `${d}px`);
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stop();
  }
  async updated(t) {
    super.updated(t), t.has("active") && (this.active ? this.start() : this.stop()), t.has("anchor") && this.handleAnchorChange(), this.active && (await this.updateComplete, this.reposition());
  }
  async handleAnchorChange() {
    if (await this.stop(), this.anchor && typeof this.anchor == "string") {
      const t = this.getRootNode();
      this.anchorEl = t.getElementById(this.anchor);
    } else this.anchor instanceof Element || Tr(this.anchor) ? this.anchorEl = this.anchor : this.anchorEl = this.querySelector('[slot="anchor"]');
    this.anchorEl instanceof HTMLSlotElement && (this.anchorEl = this.anchorEl.assignedElements({ flatten: !0 })[0]), this.anchorEl && this.active && this.start();
  }
  start() {
    !this.anchorEl || !this.active || (this.cleanup = Cr(this.anchorEl, this.popup, () => {
      this.reposition();
    }));
  }
  async stop() {
    return new Promise((t) => {
      this.cleanup ? (this.cleanup(), this.cleanup = void 0, this.removeAttribute("data-current-placement"), this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height"), requestAnimationFrame(() => t())) : t();
    });
  }
  /** Forces the popup to recalculate and reposition itself. */
  reposition() {
    if (!this.active || !this.anchorEl)
      return;
    const t = [
      // The offset middleware goes first
      Er({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    this.sync ? t.push(
      Fo({
        apply: ({ rects: o }) => {
          const s = this.sync === "width" || this.sync === "both", l = this.sync === "height" || this.sync === "both";
          this.popup.style.width = s ? `${o.reference.width}px` : "", this.popup.style.height = l ? `${o.reference.height}px` : "";
        }
      })
    ) : (this.popup.style.width = "", this.popup.style.height = ""), this.flip && t.push(
      zr({
        boundary: this.flipBoundary,
        // @ts-expect-error - We're converting a string attribute to an array here
        fallbackPlacements: this.flipFallbackPlacements,
        fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
        padding: this.flipPadding
      })
    ), this.shift && t.push(
      Sr({
        boundary: this.shiftBoundary,
        padding: this.shiftPadding
      })
    ), this.autoSize ? t.push(
      Fo({
        boundary: this.autoSizeBoundary,
        padding: this.autoSizePadding,
        apply: ({ availableWidth: o, availableHeight: s }) => {
          this.autoSize === "vertical" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-height", `${s}px`) : this.style.removeProperty("--auto-size-available-height"), this.autoSize === "horizontal" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-width", `${o}px`) : this.style.removeProperty("--auto-size-available-width");
        }
      })
    ) : (this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height")), this.arrow && t.push(
      Pr({
        element: this.arrowEl,
        padding: this.arrowPadding
      })
    );
    const e = this.strategy === "absolute" ? (o) => at.getOffsetParent(o, Lr) : at.getOffsetParent;
    Or(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware: t,
      strategy: this.strategy,
      platform: Zo(yt({}, at), {
        getOffsetParent: e
      })
    }).then(({ x: o, y: s, middlewareData: l, placement: r }) => {
      const i = this.localize.dir() === "rtl", n = { top: "bottom", right: "left", bottom: "top", left: "right" }[r.split("-")[0]];
      if (this.setAttribute("data-current-placement", r), Object.assign(this.popup.style, {
        left: `${o}px`,
        top: `${s}px`
      }), this.arrow) {
        const a = l.arrow.x, c = l.arrow.y;
        let d = "", h = "", f = "", u = "";
        if (this.arrowPlacement === "start") {
          const m = typeof a == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          d = typeof c == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "", h = i ? m : "", u = i ? "" : m;
        } else if (this.arrowPlacement === "end") {
          const m = typeof a == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          h = i ? "" : m, u = i ? m : "", f = typeof c == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else this.arrowPlacement === "center" ? (u = typeof a == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "", d = typeof c == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "") : (u = typeof a == "number" ? `${a}px` : "", d = typeof c == "number" ? `${c}px` : "");
        Object.assign(this.arrowEl.style, {
          top: d,
          right: h,
          bottom: f,
          left: u,
          [n]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    }), requestAnimationFrame(() => this.updateHoverBridge()), this.emit("sl-reposition");
  }
  render() {
    return $`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Xe({
      "popup-hover-bridge": !0,
      "popup-hover-bridge--visible": this.hoverBridge && this.active
    })}
      ></span>

      <div
        part="popup"
        class=${Xe({
      popup: !0,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? $`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
_.styles = [et, Hl];
g([
  W(".popup")
], _.prototype, "popup", 2);
g([
  W(".popup__arrow")
], _.prototype, "arrowEl", 2);
g([
  p()
], _.prototype, "anchor", 2);
g([
  p({ type: Boolean, reflect: !0 })
], _.prototype, "active", 2);
g([
  p({ reflect: !0 })
], _.prototype, "placement", 2);
g([
  p({ reflect: !0 })
], _.prototype, "strategy", 2);
g([
  p({ type: Number })
], _.prototype, "distance", 2);
g([
  p({ type: Number })
], _.prototype, "skidding", 2);
g([
  p({ type: Boolean })
], _.prototype, "arrow", 2);
g([
  p({ attribute: "arrow-placement" })
], _.prototype, "arrowPlacement", 2);
g([
  p({ attribute: "arrow-padding", type: Number })
], _.prototype, "arrowPadding", 2);
g([
  p({ type: Boolean })
], _.prototype, "flip", 2);
g([
  p({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (t) => t.split(" ").map((e) => e.trim()).filter((e) => e !== ""),
      toAttribute: (t) => t.join(" ")
    }
  })
], _.prototype, "flipFallbackPlacements", 2);
g([
  p({ attribute: "flip-fallback-strategy" })
], _.prototype, "flipFallbackStrategy", 2);
g([
  p({ type: Object })
], _.prototype, "flipBoundary", 2);
g([
  p({ attribute: "flip-padding", type: Number })
], _.prototype, "flipPadding", 2);
g([
  p({ type: Boolean })
], _.prototype, "shift", 2);
g([
  p({ type: Object })
], _.prototype, "shiftBoundary", 2);
g([
  p({ attribute: "shift-padding", type: Number })
], _.prototype, "shiftPadding", 2);
g([
  p({ attribute: "auto-size" })
], _.prototype, "autoSize", 2);
g([
  p()
], _.prototype, "sync", 2);
g([
  p({ type: Object })
], _.prototype, "autoSizeBoundary", 2);
g([
  p({ attribute: "auto-size-padding", type: Number })
], _.prototype, "autoSizePadding", 2);
g([
  p({ attribute: "hover-bridge", type: Boolean })
], _.prototype, "hoverBridge", 2);
var xs = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new WeakMap();
function Dr(t) {
  return t ?? { keyframes: [], options: { duration: 0 } };
}
function Ho(t, e) {
  return e.toLowerCase() === "rtl" ? {
    keyframes: t.rtlKeyframes || t.keyframes,
    options: t.options
  } : t;
}
function ke(t, e) {
  xs.set(t, Dr(e));
}
function de(t, e, o) {
  const s = Mr.get(t);
  if (s != null && s[e])
    return Ho(s[e], o.dir);
  const l = xs.get(e);
  return l ? Ho(l, o.dir) : {
    keyframes: [],
    options: { duration: 0 }
  };
}
function vt(t, e) {
  return new Promise((o) => {
    function s(l) {
      l.target === t && (t.removeEventListener(e, s), o());
    }
    t.addEventListener(e, s);
  });
}
function ue(t, e, o) {
  return new Promise((s) => {
    if ((o == null ? void 0 : o.duration) === 1 / 0)
      throw new Error("Promise-based animations must be finite.");
    const l = t.animate(e, Zo(yt({}, o), {
      duration: Br() ? 0 : o.duration
    }));
    l.addEventListener("cancel", s, { once: !0 }), l.addEventListener("finish", s, { once: !0 });
  });
}
function jo(t) {
  return t = t.toString().toLowerCase(), t.indexOf("ms") > -1 ? parseFloat(t) : t.indexOf("s") > -1 ? parseFloat(t) * 1e3 : parseFloat(t);
}
function Br() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Se(t) {
  return Promise.all(
    t.getAnimations().map((e) => new Promise((o) => {
      e.cancel(), requestAnimationFrame(o);
    }))
  );
}
var z = class extends ee {
  constructor() {
    super(), this.localize = new no(this), this.content = "", this.placement = "top", this.disabled = !1, this.distance = 8, this.open = !1, this.skidding = 0, this.trigger = "hover focus", this.hoist = !1, this.handleBlur = () => {
      this.hasTrigger("focus") && this.hide();
    }, this.handleClick = () => {
      this.hasTrigger("click") && (this.open ? this.hide() : this.show());
    }, this.handleFocus = () => {
      this.hasTrigger("focus") && this.show();
    }, this.handleDocumentKeyDown = (t) => {
      t.key === "Escape" && (t.stopPropagation(), this.hide());
    }, this.handleMouseOver = () => {
      if (this.hasTrigger("hover")) {
        const t = jo(getComputedStyle(this).getPropertyValue("--show-delay"));
        clearTimeout(this.hoverTimeout), this.hoverTimeout = window.setTimeout(() => this.show(), t);
      }
    }, this.handleMouseOut = () => {
      if (this.hasTrigger("hover")) {
        const t = jo(getComputedStyle(this).getPropertyValue("--hide-delay"));
        clearTimeout(this.hoverTimeout), this.hoverTimeout = window.setTimeout(() => this.hide(), t);
      }
    }, this.addEventListener("blur", this.handleBlur, !0), this.addEventListener("focus", this.handleFocus, !0), this.addEventListener("click", this.handleClick), this.addEventListener("mouseover", this.handleMouseOver), this.addEventListener("mouseout", this.handleMouseOut);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.closeWatcher) == null || t.destroy(), document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  firstUpdated() {
    this.body.hidden = !this.open, this.open && (this.popup.active = !0, this.popup.reposition());
  }
  hasTrigger(t) {
    return this.trigger.split(" ").includes(t);
  }
  async handleOpenChange() {
    var t, e;
    if (this.open) {
      if (this.disabled)
        return;
      this.emit("sl-show"), "CloseWatcher" in window ? ((t = this.closeWatcher) == null || t.destroy(), this.closeWatcher = new CloseWatcher(), this.closeWatcher.onclose = () => {
        this.hide();
      }) : document.addEventListener("keydown", this.handleDocumentKeyDown), await Se(this.body), this.body.hidden = !1, this.popup.active = !0;
      const { keyframes: o, options: s } = de(this, "tooltip.show", { dir: this.localize.dir() });
      await ue(this.popup.popup, o, s), this.popup.reposition(), this.emit("sl-after-show");
    } else {
      this.emit("sl-hide"), (e = this.closeWatcher) == null || e.destroy(), document.removeEventListener("keydown", this.handleDocumentKeyDown), await Se(this.body);
      const { keyframes: o, options: s } = de(this, "tooltip.hide", { dir: this.localize.dir() });
      await ue(this.popup.popup, o, s), this.popup.active = !1, this.body.hidden = !0, this.emit("sl-after-hide");
    }
  }
  async handleOptionsChange() {
    this.hasUpdated && (await this.updateComplete, this.popup.reposition());
  }
  handleDisabledChange() {
    this.disabled && this.open && this.hide();
  }
  /** Shows the tooltip. */
  async show() {
    if (!this.open)
      return this.open = !0, vt(this, "sl-after-show");
  }
  /** Hides the tooltip */
  async hide() {
    if (this.open)
      return this.open = !1, vt(this, "sl-after-hide");
  }
  //
  // NOTE: Tooltip is a bit unique in that we're using aria-live instead of aria-labelledby to trick screen readers into
  // announcing the content. It works really well, but it violates an accessibility rule. We're also adding the
  // aria-describedby attribute to a slot, which is required by <sl-popup> to correctly locate the first assigned
  // element, otherwise positioning is incorrect.
  //
  render() {
    return $`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Xe({
      tooltip: !0,
      "tooltip--open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open ? "polite" : "off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `;
  }
};
z.styles = [et, Fl];
z.dependencies = { "sl-popup": _ };
g([
  W("slot:not([name])")
], z.prototype, "defaultSlot", 2);
g([
  W(".tooltip__body")
], z.prototype, "body", 2);
g([
  W("sl-popup")
], z.prototype, "popup", 2);
g([
  p()
], z.prototype, "content", 2);
g([
  p()
], z.prototype, "placement", 2);
g([
  p({ type: Boolean, reflect: !0 })
], z.prototype, "disabled", 2);
g([
  p({ type: Number })
], z.prototype, "distance", 2);
g([
  p({ type: Boolean, reflect: !0 })
], z.prototype, "open", 2);
g([
  p({ type: Number })
], z.prototype, "skidding", 2);
g([
  p()
], z.prototype, "trigger", 2);
g([
  p({ type: Boolean })
], z.prototype, "hoist", 2);
g([
  Te("open", { waitUntilFirstUpdate: !0 })
], z.prototype, "handleOpenChange", 1);
g([
  Te(["content", "distance", "hoist", "placement", "skidding"])
], z.prototype, "handleOptionsChange", 1);
g([
  Te("disabled")
], z.prototype, "handleDisabledChange", 1);
ke("tooltip.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 150, easing: "ease" }
});
ke("tooltip.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 150, easing: "ease" }
});
z.define("sl-tooltip");
var Nr = Object.defineProperty, Fr = Object.getOwnPropertyDescriptor, tt = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Fr(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Nr(e, o, l), l;
};
let we = class extends S {
  constructor() {
    super(...arguments), this.icon = "", this.word = "", this.label = "", this.disabled = !1;
  }
  press(t) {
    this.disabled || xt(this, t);
  }
  render() {
    return this.word ? $`<button ?disabled=${this.disabled} title=${this.label} @click=${this.press}>
        ${this.word}
      </button>` : $`<sl-tooltip content=${this.label} placement="bottom">
      <sl-icon-button
        name=${this.icon}
        library=${Jt(this.icon)}
        label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.press}
      ></sl-icon-button>
    </sl-tooltip>`;
  }
};
we.styles = [
  M,
  ls,
  A`
      sl-icon-button {
        font-size: 1.5rem;
      }

      button {
        font: inherit;
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        color: var(--band-ink);
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.55);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
      }

      button:hover,
      button:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        outline: none;
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }
    `
];
tt([
  p()
], we.prototype, "icon", 2);
tt([
  p()
], we.prototype, "word", 2);
tt([
  p()
], we.prototype, "label", 2);
tt([
  p({ type: Boolean, reflect: !0 })
], we.prototype, "disabled", 2);
we = tt([
  T("look-band-press")
], we);
var Hr = Object.getOwnPropertyDescriptor, jr = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Hr(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = i(l) || l);
  return l;
};
let Yt = class extends S {
  connectedCallback() {
    super.connectedCallback(), Re(this, "gear");
  }
  render() {
    return $`<sl-tooltip content="Settings" placement="bottom">
      <sl-icon-button
        name="gear"
        label="Settings"
        @click=${(t) => xt(this, t)}
      ></sl-icon-button>
    </sl-tooltip>`;
  }
};
Yt.styles = [
  M,
  ls,
  A`
      sl-icon-button {
        font-size: 1.5rem;
      }
    `
];
Yt = jr([
  T("look-gear")
], Yt);
var Ur = Object.defineProperty, Ir = Object.getOwnPropertyDescriptor, zt = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Ir(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Ur(e, o, l), l;
};
const Vr = {
  on: "Track power is on; turn it off",
  off: "Track power is off; turn it on",
  stopped: "Stopped; turn track power on",
  draining: "Draining: power goes off when every train is at rest; keep it on"
};
let Le = class extends S {
  constructor() {
    super(...arguments), this.state = "off", this.reason = "", this.toggleReason = "";
  }
  connectedCallback() {
    super.connectedCallback(), Re(this, "power");
  }
  ask(t, e) {
    e || lo(this, "look-power", { state: t });
  }
  render() {
    const t = this.reason || this.toggleReason, e = t || Vr[this.state], o = this.reason || "Stop every train";
    return $`
      <sl-tooltip content=${e} placement="bottom">
        <sl-icon-button
          class="power ${t ? "off" : ""}"
          name="power"
          label=${e}
          @click=${() => this.ask(this.state === "on" ? "off" : "on", t)}
        ></sl-icon-button>
      </sl-tooltip>
      <sl-tooltip content=${o} placement="bottom">
        <sl-icon-button
          class="stop ${this.reason ? "off" : ""}"
          name="sign-stop-fill"
          label=${o}
          @click=${() => this.ask("stopped", this.reason)}
        ></sl-icon-button>
      </sl-tooltip>
    `;
  }
};
Le.styles = [
  M,
  A`
      :host {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      sl-icon-button {
        transition: transform 0.1s;
      }

      sl-icon-button:not(.off):hover {
        transform: scale(1.1);
      }

      /* Not disabled: a disabled sl-icon-button takes no pointer events, and
         the tooltip has to open to say why. */
      .off {
        opacity: 0.35;
      }

      .off::part(base) {
        cursor: default;
      }

      .power {
        font-size: 1.5rem;
      }

      .power::part(base),
      .power::part(base):hover {
        color: rgba(255, 255, 255, 0.55);
      }

      :host([state='on']) .power::part(base) {
        color: var(--power-on);
      }

      :host([state='draining']) .power::part(base) {
        color: var(--power-on);
        animation: pulse 1.2s ease-in-out infinite;
      }

      @keyframes pulse {
        50% {
          opacity: 0.4;
        }
      }

      :host([state='stopped']) .power::part(base) {
        color: var(--stop);
      }

      .stop {
        font-size: 1.9rem;
      }

      .stop::part(base),
      .stop::part(base):hover {
        color: var(--stop);
      }
    `
];
zt([
  p({ reflect: !0 })
], Le.prototype, "state", 2);
zt([
  p()
], Le.prototype, "reason", 2);
zt([
  p({ attribute: "toggle-reason" })
], Le.prototype, "toggleReason", 2);
Le = zt([
  T("look-power")
], Le);
var Wr = Object.defineProperty, qr = Object.getOwnPropertyDescriptor, $s = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? qr(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Wr(e, o, l), l;
};
let bt = class extends S {
  constructor() {
    super(...arguments), this.hasViews = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Re(this, "rail");
  }
  onViews(t) {
    this.hasViews = t.target.assignedElements().length > 0;
  }
  render() {
    return $`
      <div class="views" role="group" aria-label="View" ?hidden=${!this.hasViews}>
        <slot name="views" @slotchange=${this.onViews}></slot>
      </div>
      <slot></slot>
    `;
  }
};
bt.styles = [
  M,
  A`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5em;
        padding: 0.6em 0.3em;
        width: 78px;
        box-sizing: border-box;
        flex-shrink: 0;
        background: var(--rail);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
        overflow-y: auto;
        user-select: none;
        position: relative;
        z-index: 50;
        font-family: var(--sl-font-sans);
      }

      .views {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em 0;
        width: calc(100% - 8px);
        background: rgba(0, 0, 0, 0.25);
        border-radius: 8px;
      }

      .views[hidden] {
        display: none;
      }

      @media (max-height: ${_e(Qe)}px) {
        :host {
          flex-direction: row;
          width: auto;
          gap: 0.75em;
          padding: 0.4em 0.5em;
          overflow-x: auto;
          overflow-y: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .views {
          flex-direction: row;
          width: auto;
          padding: 0 0.35em;
        }
      }
    `
];
$s([
  so()
], bt.prototype, "hasViews", 2);
bt = $s([
  T("look-rail")
], bt);
var Kr = Object.defineProperty, Xr = Object.getOwnPropertyDescriptor, ot = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Xr(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Kr(e, o, l), l;
};
let xe = class extends S {
  constructor() {
    super(...arguments), this.name = "", this.icon = "", this.label = "", this.current = !1;
  }
  connectedCallback() {
    super.connectedCallback(), Re(this, "views");
  }
  choose() {
    this.current || lo(this, "look-view", { name: this.name });
  }
  render() {
    return $`<button aria-current=${this.current ? "page" : C} @click=${this.choose}>
      <sl-icon name=${this.icon} library=${Jt(this.icon)}></sl-icon>${this.label}
    </button>`;
  }
};
xe.styles = [
  M,
  A`
      :host {
        display: block;
        width: 100%;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.1em;
        width: 100%;
        min-height: var(--rail-button);
        padding: 0.25em 0;
        box-sizing: border-box;
        font: inherit;
        font-size: 0.7rem;
        color: white;
        background: none;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      sl-icon {
        font-size: 1.75rem;
        transition: transform 0.1s;
      }

      button:hover,
      button:focus-visible {
        color: rgba(255, 255, 255, 0.7);
        outline: none;
      }

      button:hover sl-icon {
        transform: scale(1.1);
      }

      :host([current]) button {
        background: rgba(255, 255, 255, 0.22);
        color: white;
        cursor: default;
      }

      :host([current]) button:hover sl-icon {
        transform: none;
      }

      @media (max-height: ${_e(Qe)}px) {
        :host {
          width: auto;
        }

        button {
          min-width: var(--rail-button);
          padding: 0.2em 0.5em;
        }
      }
    `
];
ot([
  p()
], xe.prototype, "name", 2);
ot([
  p()
], xe.prototype, "icon", 2);
ot([
  p()
], xe.prototype, "label", 2);
ot([
  p({ type: Boolean, reflect: !0 })
], xe.prototype, "current", 2);
xe = ot([
  T("look-view")
], xe);
var Yr = Object.defineProperty, Zr = Object.getOwnPropertyDescriptor, po = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Zr(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && Yr(e, o, l), l;
};
let Ge = class extends S {
  constructor() {
    super(...arguments), this.label = "", this.end = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "group");
  }
  updated() {
    this.label ? this.setAttribute("aria-label", this.label) : this.removeAttribute("aria-label");
  }
  render() {
    return $`<slot></slot>`;
  }
};
Ge.styles = [
  M,
  A`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.45em;
        padding: 0.35em 0;
        width: calc(100% - 8px);
        background: var(--rail-group);
        border-radius: 8px;
      }

      :host([end]) {
        margin-top: auto;
      }

      @media (max-height: ${_e(Qe)}px) {
        :host {
          flex-direction: row;
          width: auto;
          gap: 0.75em;
          padding: 0 0.5em;
        }

        :host([end]) {
          margin-top: 0;
          margin-left: auto;
        }
      }
    `
];
po([
  p()
], Ge.prototype, "label", 2);
po([
  p({ type: Boolean, reflect: !0 })
], Ge.prototype, "end", 2);
Ge = po([
  T("look-group")
], Ge);
const Gr = () => {
  var t;
  return /Mac|iPhone|iPad/.test(((t = globalThis.navigator) == null ? void 0 : t.platform) ?? "");
}, Jr = { Mod: "⌘", Shift: "⇧", Alt: "⌥", Ctrl: "⌃" };
function Qr(t, e = Gr()) {
  const o = t.endsWith("+") ? "+" : t.slice(t.lastIndexOf("+") + 1), s = [...t.slice(0, t.length - o.length).split("+").filter(Boolean), o];
  if (e) return s.map((n) => Jr[n] ?? n).join("");
  const l = ["Mod", "Ctrl", "Alt", "Shift"], r = s.filter((n) => l.includes(n)).sort((n, a) => l.indexOf(n) - l.indexOf(a)), i = s.filter((n) => !l.includes(n));
  return [...new Set(r.map((n) => n === "Mod" ? "Ctrl" : n)), ...i].join("+");
}
const ei = (t, e) => e ? `${t}  ${Qr(e)}` : t;
var ti = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, Ae = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? oi(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && ti(e, o, l), l;
};
let Q = class extends S {
  constructor() {
    super(...arguments), this.icon = "", this.word = "", this.label = "", this.key = "", this.pressed = !1, this.disabled = !1;
  }
  press(t) {
    this.disabled || xt(this, t);
  }
  render() {
    const t = ei(this.label, this.key);
    return this.word ? $`<button
        ?disabled=${this.disabled}
        title=${t}
        aria-pressed=${this.pressed ? "true" : C}
        @click=${this.press}
      >
        ${this.word}
      </button>` : $`<sl-tooltip content=${t} placement="right">
      <sl-icon-button
        name=${this.icon}
        library=${Jt(this.icon)}
        label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.press}
      ></sl-icon-button>
    </sl-tooltip>`;
  }
};
Q.styles = [
  M,
  A`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      sl-icon-button {
        font-size: 2.1em;
        transition: transform 0.1s;
      }

      sl-icon-button::part(base) {
        color: white;
        justify-content: center;
        min-width: var(--rail-button);
        min-height: var(--rail-button);
      }

      sl-icon-button::part(base):hover,
      sl-icon-button::part(base):focus-visible {
        color: rgba(255, 255, 255, 0.7);
      }

      sl-icon-button:not([disabled]):hover {
        transform: scale(1.1);
      }

      sl-icon-button[disabled] {
        opacity: 0.35;
      }

      :host([pressed]) sl-icon-button::part(base) {
        background: rgba(255, 255, 255, 0.22);
        border-radius: 8px;
      }

      button {
        width: calc(100% - 8px);
        min-height: var(--rail-button);
        font: inherit;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: white;
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 6px;
        cursor: pointer;
      }

      button:hover,
      button:focus-visible {
        background: rgba(255, 255, 255, 0.18);
        outline: none;
      }

      :host([pressed]) button {
        background: rgba(255, 255, 255, 0.22);
      }

      button:disabled {
        opacity: 0.35;
        cursor: default;
        background: none;
      }

      @media (max-height: ${_e(Qe)}px) {
        :host {
          width: auto;
        }

        sl-icon-button {
          font-size: 1.6em;
        }

        button {
          width: auto;
          padding: 0 0.8rem;
        }
      }
    `
];
Ae([
  p()
], Q.prototype, "icon", 2);
Ae([
  p()
], Q.prototype, "word", 2);
Ae([
  p()
], Q.prototype, "label", 2);
Ae([
  p()
], Q.prototype, "key", 2);
Ae([
  p({ type: Boolean, reflect: !0 })
], Q.prototype, "pressed", 2);
Ae([
  p({ type: Boolean, reflect: !0 })
], Q.prototype, "disabled", 2);
Q = Ae([
  T("look-command")
], Q);
function* fo(t = document.activeElement) {
  t != null && (yield t, "shadowRoot" in t && t.shadowRoot && t.shadowRoot.mode !== "closed" && (yield* Is(fo(t.shadowRoot.activeElement))));
}
function si() {
  return [...fo()].pop();
}
var Uo = /* @__PURE__ */ new WeakMap();
function _s(t) {
  let e = Uo.get(t);
  return e || (e = window.getComputedStyle(t, null), Uo.set(t, e)), e;
}
function li(t) {
  if (typeof t.checkVisibility == "function")
    return t.checkVisibility({ checkOpacity: !1, checkVisibilityCSS: !0 });
  const e = _s(t);
  return e.visibility !== "hidden" && e.display !== "none";
}
function ri(t) {
  const e = _s(t), { overflowY: o, overflowX: s } = e;
  return o === "scroll" || s === "scroll" ? !0 : o !== "auto" || s !== "auto" ? !1 : t.scrollHeight > t.clientHeight && o === "auto" || t.scrollWidth > t.clientWidth && s === "auto";
}
function ii(t) {
  const e = t.tagName.toLowerCase(), o = Number(t.getAttribute("tabindex"));
  if (t.hasAttribute("tabindex") && (isNaN(o) || o <= -1) || t.hasAttribute("disabled") || t.closest("[inert]"))
    return !1;
  if (e === "input" && t.getAttribute("type") === "radio") {
    const r = t.getRootNode(), i = `input[type='radio'][name="${t.getAttribute("name")}"]`, n = r.querySelector(`${i}:checked`);
    return n ? n === t : r.querySelector(i) === t;
  }
  return li(t) ? (e === "audio" || e === "video") && t.hasAttribute("controls") || t.hasAttribute("tabindex") || t.hasAttribute("contenteditable") && t.getAttribute("contenteditable") !== "false" || [
    "button",
    "input",
    "select",
    "textarea",
    "a",
    "audio",
    "video",
    "summary",
    "iframe"
  ].includes(e) ? !0 : ri(t) : !1;
}
function ni(t, e) {
  var o;
  return ((o = t.getRootNode({ composed: !0 })) == null ? void 0 : o.host) !== e;
}
function Io(t) {
  const e = /* @__PURE__ */ new WeakMap(), o = [];
  function s(l) {
    if (l instanceof Element) {
      if (l.hasAttribute("inert") || l.closest("[inert]") || e.has(l))
        return;
      e.set(l, !0), !o.includes(l) && ii(l) && o.push(l), l instanceof HTMLSlotElement && ni(l, t) && l.assignedElements({ flatten: !0 }).forEach((r) => {
        s(r);
      }), l.shadowRoot !== null && l.shadowRoot.mode === "open" && s(l.shadowRoot);
    }
    for (const r of l.children)
      s(r);
  }
  return s(t), o.sort((l, r) => {
    const i = Number(l.getAttribute("tabindex")) || 0;
    return (Number(r.getAttribute("tabindex")) || 0) - i;
  });
}
var Ue = [], ai = class {
  constructor(t) {
    this.tabDirection = "forward", this.handleFocusIn = () => {
      this.isActive() && this.checkFocus();
    }, this.handleKeyDown = (e) => {
      var o;
      if (e.key !== "Tab" || this.isExternalActivated || !this.isActive()) return;
      const s = si();
      if (this.previousFocus = s, this.previousFocus && this.possiblyHasTabbableChildren(this.previousFocus))
        return;
      e.shiftKey ? this.tabDirection = "backward" : this.tabDirection = "forward";
      const l = Io(this.element);
      let r = l.findIndex((n) => n === s);
      this.previousFocus = this.currentFocus;
      const i = this.tabDirection === "forward" ? 1 : -1;
      for (; ; ) {
        r + i >= l.length ? r = 0 : r + i < 0 ? r = l.length - 1 : r += i, this.previousFocus = this.currentFocus;
        const n = (
          /** @type {HTMLElement} */
          l[r]
        );
        if (this.tabDirection === "backward" && this.previousFocus && this.possiblyHasTabbableChildren(this.previousFocus) || n && this.possiblyHasTabbableChildren(n))
          return;
        e.preventDefault(), this.currentFocus = n, (o = this.currentFocus) == null || o.focus({ preventScroll: !1 });
        const a = [...fo()];
        if (a.includes(this.currentFocus) || !a.includes(this.previousFocus))
          break;
      }
      setTimeout(() => this.checkFocus());
    }, this.handleKeyUp = () => {
      this.tabDirection = "forward";
    }, this.element = t, this.elementsWithTabbableControls = ["iframe"];
  }
  /** Activates focus trapping. */
  activate() {
    Ue.push(this.element), document.addEventListener("focusin", this.handleFocusIn), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
  }
  /** Deactivates focus trapping. */
  deactivate() {
    Ue = Ue.filter((t) => t !== this.element), this.currentFocus = null, document.removeEventListener("focusin", this.handleFocusIn), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
  }
  /** Determines if this modal element is currently active or not. */
  isActive() {
    return Ue[Ue.length - 1] === this.element;
  }
  /** Activates external modal behavior and temporarily disables focus trapping. */
  activateExternal() {
    this.isExternalActivated = !0;
  }
  /** Deactivates external modal behavior and re-enables focus trapping. */
  deactivateExternal() {
    this.isExternalActivated = !1;
  }
  checkFocus() {
    if (this.isActive() && !this.isExternalActivated) {
      const t = Io(this.element);
      if (!this.element.matches(":focus-within")) {
        const e = t[0], o = t[t.length - 1], s = this.tabDirection === "forward" ? e : o;
        typeof (s == null ? void 0 : s.focus) == "function" && (this.currentFocus = s, s.focus({ preventScroll: !1 }));
      }
    }
  }
  possiblyHasTabbableChildren(t) {
    return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase()) || t.hasAttribute("controls");
  }
}, Zt = /* @__PURE__ */ new Set();
function ci() {
  const t = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function hi() {
  const t = Number(getComputedStyle(document.body).paddingRight.replace(/px/, ""));
  return isNaN(t) || !t ? 0 : t;
}
function Vo(t) {
  if (Zt.add(t), !document.documentElement.classList.contains("sl-scroll-lock")) {
    const e = ci() + hi();
    let o = getComputedStyle(document.documentElement).scrollbarGutter;
    (!o || o === "auto") && (o = "stable"), e < 2 && (o = ""), document.documentElement.style.setProperty("--sl-scroll-lock-gutter", o), document.documentElement.classList.add("sl-scroll-lock"), document.documentElement.style.setProperty("--sl-scroll-lock-size", `${e}px`);
  }
}
function Wo(t) {
  Zt.delete(t), Zt.size === 0 && (document.documentElement.classList.remove("sl-scroll-lock"), document.documentElement.style.removeProperty("--sl-scroll-lock-size"));
}
var di = A`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`, ui = (t) => {
  var e;
  const { activeElement: o } = document;
  o && t.contains(o) && ((e = document.activeElement) == null || e.blur());
}, pi = class {
  constructor(t, ...e) {
    this.slotNames = [], this.handleSlotChange = (o) => {
      const s = o.target;
      (this.slotNames.includes("[default]") && !s.name || s.name && this.slotNames.includes(s.name)) && this.host.requestUpdate();
    }, (this.host = t).addController(this), this.slotNames = e;
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((t) => {
      if (t.nodeType === t.TEXT_NODE && t.textContent.trim() !== "")
        return !0;
      if (t.nodeType === t.ELEMENT_NODE) {
        const e = t;
        if (e.tagName.toLowerCase() === "sl-visually-hidden")
          return !1;
        if (!e.hasAttribute("slot"))
          return !0;
      }
      return !1;
    });
  }
  hasNamedSlot(t) {
    return this.host.querySelector(`:scope > [slot="${t}"]`) !== null;
  }
  test(t) {
    return t === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(t);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
}, K = class extends ee {
  constructor() {
    super(...arguments), this.hasSlotController = new pi(this, "footer"), this.localize = new no(this), this.modal = new ai(this), this.open = !1, this.label = "", this.noHeader = !1, this.handleDocumentKeyDown = (t) => {
      t.key === "Escape" && this.modal.isActive() && this.open && (t.stopPropagation(), this.requestClose("keyboard"));
    };
  }
  firstUpdated() {
    this.dialog.hidden = !this.open, this.open && (this.addOpenListeners(), this.modal.activate(), Vo(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.modal.deactivate(), Wo(this), this.removeOpenListeners();
  }
  requestClose(t) {
    if (this.emit("sl-request-close", {
      cancelable: !0,
      detail: { source: t }
    }).defaultPrevented) {
      const o = de(this, "dialog.denyClose", { dir: this.localize.dir() });
      ue(this.panel, o.keyframes, o.options);
      return;
    }
    this.hide();
  }
  addOpenListeners() {
    var t;
    "CloseWatcher" in window ? ((t = this.closeWatcher) == null || t.destroy(), this.closeWatcher = new CloseWatcher(), this.closeWatcher.onclose = () => this.requestClose("keyboard")) : document.addEventListener("keydown", this.handleDocumentKeyDown);
  }
  removeOpenListeners() {
    var t;
    (t = this.closeWatcher) == null || t.destroy(), document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show"), this.addOpenListeners(), this.originalTrigger = document.activeElement, this.modal.activate(), Vo(this);
      const t = this.querySelector("[autofocus]");
      t && t.removeAttribute("autofocus"), await Promise.all([Se(this.dialog), Se(this.overlay)]), this.dialog.hidden = !1, requestAnimationFrame(() => {
        this.emit("sl-initial-focus", { cancelable: !0 }).defaultPrevented || (t ? t.focus({ preventScroll: !0 }) : this.panel.focus({ preventScroll: !0 })), t && t.setAttribute("autofocus", "");
      });
      const e = de(this, "dialog.show", { dir: this.localize.dir() }), o = de(this, "dialog.overlay.show", { dir: this.localize.dir() });
      await Promise.all([
        ue(this.panel, e.keyframes, e.options),
        ue(this.overlay, o.keyframes, o.options)
      ]), this.emit("sl-after-show");
    } else {
      ui(this), this.emit("sl-hide"), this.removeOpenListeners(), this.modal.deactivate(), await Promise.all([Se(this.dialog), Se(this.overlay)]);
      const t = de(this, "dialog.hide", { dir: this.localize.dir() }), e = de(this, "dialog.overlay.hide", { dir: this.localize.dir() });
      await Promise.all([
        ue(this.overlay, e.keyframes, e.options).then(() => {
          this.overlay.hidden = !0;
        }),
        ue(this.panel, t.keyframes, t.options).then(() => {
          this.panel.hidden = !0;
        })
      ]), this.dialog.hidden = !0, this.overlay.hidden = !1, this.panel.hidden = !1, Wo(this);
      const o = this.originalTrigger;
      typeof (o == null ? void 0 : o.focus) == "function" && setTimeout(() => o.focus()), this.emit("sl-after-hide");
    }
  }
  /** Shows the dialog. */
  async show() {
    if (!this.open)
      return this.open = !0, vt(this, "sl-after-show");
  }
  /** Hides the dialog */
  async hide() {
    if (this.open)
      return this.open = !1, vt(this, "sl-after-hide");
  }
  render() {
    return $`
      <div
        part="base"
        class=${Xe({
      dialog: !0,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasSlotController.test("footer")
    })}
      >
        <div part="overlay" class="dialog__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${B(this.noHeader ? this.label : void 0)}
          aria-labelledby=${B(this.noHeader ? void 0 : "title")}
          tabindex="-1"
        >
          ${this.noHeader ? "" : $`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length > 0 ? this.label : "\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${() => this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
K.styles = [et, di];
K.dependencies = {
  "sl-icon-button": D
};
g([
  W(".dialog")
], K.prototype, "dialog", 2);
g([
  W(".dialog__panel")
], K.prototype, "panel", 2);
g([
  W(".dialog__overlay")
], K.prototype, "overlay", 2);
g([
  p({ type: Boolean, reflect: !0 })
], K.prototype, "open", 2);
g([
  p({ reflect: !0 })
], K.prototype, "label", 2);
g([
  p({ attribute: "no-header", type: Boolean, reflect: !0 })
], K.prototype, "noHeader", 2);
g([
  Te("open", { waitUntilFirstUpdate: !0 })
], K.prototype, "handleOpenChange", 1);
ke("dialog.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
ke("dialog.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});
ke("dialog.denyClose", {
  keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
  options: { duration: 250 }
});
ke("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
ke("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});
K.define("sl-dialog");
const fi = A`
  sl-button::part(base):hover {
    filter: brightness(1.06);
  }

  sl-dialog::part(panel) {
    border-radius: 6px;
    overflow: hidden;
  }

  sl-dialog::part(header) {
    background: var(--band);
    color: var(--band-ink);
  }

  sl-dialog::part(title) {
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-semibold);
    padding: 0.75rem 1rem;
  }

  sl-dialog::part(header-actions) {
    padding: 0 0.5rem;
  }

  sl-dialog::part(close-button) {
    color: var(--band-ink);
  }

  sl-dialog::part(close-button__base):hover {
    color: rgba(255, 255, 255, 0.7);
  }

  sl-dialog::part(body) {
    padding: 1rem;
    font-size: var(--sl-font-size-small);
  }

  sl-dialog::part(footer) {
    padding: 0.6rem 1rem;
    background: var(--sl-color-neutral-50);
    border-top: 1px solid var(--sl-color-neutral-200);
  }
`;
var gi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, st = (t, e, o, s) => {
  for (var l = s > 1 ? void 0 : s ? mi(e, o) : e, r = t.length - 1, i; r >= 0; r--)
    (i = t[r]) && (l = (s ? i(e, o, l) : i(l)) || l);
  return s && l && gi(e, o, l), l;
};
let $e = class extends S {
  constructor() {
    super(...arguments), this.label = "", this.size = "medium", this.open = !1;
  }
  async show() {
    return await this.updateComplete, this.dialog.show();
  }
  async hide() {
    return await this.updateComplete, this.dialog.hide();
  }
  // Only the dialog's own sl-show and sl-hide: a slotted widget's pass through it too.
  follow(t) {
    t.target === t.currentTarget && (this.open = t.type === "sl-show");
  }
  render() {
    return $`<sl-dialog label=${this.label} ?open=${this.open} @sl-show=${this.follow} @sl-hide=${this.follow}>
      <slot></slot>
      <div slot="footer" class="footer"><slot name="footer"></slot></div>
    </sl-dialog>`;
  }
};
$e.styles = [
  M,
  fi,
  A`
      sl-dialog {
        --width: 560px;
      }

      :host([size='small']) sl-dialog {
        --width: 420px;
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--sl-spacing-x-small);
      }
    `
];
st([
  p()
], $e.prototype, "label", 2);
st([
  p({ reflect: !0 })
], $e.prototype, "size", 2);
st([
  p({ type: Boolean, reflect: !0 })
], $e.prototype, "open", 2);
st([
  W("sl-dialog")
], $e.prototype, "dialog", 2);
$e = st([
  T("look-dialog")
], $e);
const qo = {
  "chevron-down": Vs,
  gear: Ws,
  power: qs,
  "sign-stop-fill": Ks
};
Xo("default", {
  resolver: (t) => t in qo ? Jo(qo[t]) : ""
});
const ks = new CSSStyleSheet();
ks.replaceSync(Xs);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, ks];
export {
  Oe as LookAbout,
  It as LookBand,
  we as LookBandPress,
  Wt as LookChip,
  Q as LookCommand,
  $e as LookDialog,
  pt as LookDot,
  Yt as LookGear,
  Ge as LookGroup,
  Le as LookPower,
  bt as LookRail,
  Vt as LookReading,
  Ut as LookShell,
  xe as LookView,
  ml as TOKENS,
  Qe as TURN_HEIGHT_PX,
  fi as lookTheme
};
