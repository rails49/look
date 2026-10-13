import { TOKENS } from "./tokens.js";
const TOKEN_NAMES = Object.keys(TOKENS).map((t) => t.slice(2));
const SET_PROPERTY = `--(?:${TOKEN_NAMES.join('|')}|sl-[\\w-]+)(?![\\w-])`;
/** A declaration that sets a package token or a Shoelace property. */
const ASSIGNMENT = new RegExp(`(?<![\\w-])(${SET_PROPERTY})\\s*:`, 'g');
/** `style.setProperty('--band', …)`. */
const SET_CALL = new RegExp(`setProperty\\(\\s*['"\`](${SET_PROPERTY})['"\`]`, 'g');
/** `sl-button::part(base)`. */
const SL_PART = /(?<![\w-])(sl-[\w-]+)(?:[^\s{},;]*?)::part\(/g;
/** A type selector naming a `look-` element. */
const LOOK_ELEMENT = /(?<![\w.#\-[="'])look-[a-z][\w-]*/g;
const lineAt = (text, offset) => text.slice(0, offset).split('\n').length;
/** Blanks out CSS comments, keeping line breaks so offsets stay put. */
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
/** The CSS in a file, as [offset, text] pieces. */
function cssPieces(path, text) {
    if (path.endsWith('.css'))
        return [[0, text]];
    const pattern = path.endsWith('.html') ? /<style\b[^>]*>([\s\S]*?)<\/style>/g : /\bcss`([^`]*)`/g;
    return [...text.matchAll(pattern)].map((m) => [m.index + m[0].indexOf(m[1]), m[1]]);
}
/** Selectors naming a `look-` element. Interpolations count as text. */
function lookSelectors(offset, css, text) {
    const found = [];
    const clean = stripComments(css).replace(/\$\{[^}]*\}/g, (s) => s.replace(/[^\n]/g, ' '));
    let start = 0;
    for (let i = 0; i < clean.length; i++) {
        const c = clean[i];
        if (c === '{') {
            const prelude = clean.slice(start, i);
            if (!prelude.trimStart().startsWith('@'))
                for (const m of prelude.matchAll(LOOK_ELEMENT))
                    found.push({
                        line: lineAt(text, offset + start + m.index),
                        message: `selector names ${m[0]}; the package draws its elements`,
                    });
        }
        if (c === '{' || c === '}' || c === ';')
            start = i + 1;
    }
    return found;
}
/** What a file does to the chrome that the app may not. */
export function check(path, text) {
    const found = [];
    for (const [offset, css] of cssPieces(path, text))
        found.push(...lookSelectors(offset, css, text));
    for (const m of text.matchAll(ASSIGNMENT))
        found.push({ line: lineAt(text, m.index), message: `sets ${m[1]}; read it with var() instead` });
    for (const m of text.matchAll(SET_CALL))
        found.push({ line: lineAt(text, m.index), message: `sets ${m[1]}; read it with var() instead` });
    for (const m of text.matchAll(SL_PART))
        found.push({ line: lineAt(text, m.index), message: `${m[1]}::part() styles a widget; the theme layer is the package's` });
    return found.sort((a, b) => a.line - b.line);
}
