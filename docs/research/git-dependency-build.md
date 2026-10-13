# How a UI builds this package as a pnpm git dependency

Resolves [rails49/look#2](https://github.com/rails49/look/issues/2), under the map
[rails49/look#1](https://github.com/rails49/look/issues/1).

## Answer

Ship compiled JavaScript and `.d.ts` files in a committed `dist/`, built by `tsc`
from the TypeScript source in this repository. Put the package at the
repository root, so a tag here is a version of the package. A UI depends on it
as `"@rails49/look": "github:rails49/look#v0.1.0"`.

This needs no setting in any UI: no `allowBuilds` entry, no Vite or vitest
option, no `tsconfig` change. It worked the same under pnpm 9.15.9, 11.0.4 and
11.28.2. Lit and Shoelace as peer dependencies gave one copy of each in the
installed tree and in the built page. A frozen install in a container with no
git and no token fetches the tag from GitHub.

The other two ways fail or cost more:

- A `prepare` build is blocked by pnpm 10.26 and later unless each UI adds an
  `allowBuilds` entry. What that entry must say has changed four times between
  pnpm 10.26 and 11.19. It also installs this package's devDependencies in
  every UI install, including inside dccex's Docker image.
- TypeScript source is compiled by each UI's Vite with esbuild defaults, not by
  this package's `tsconfig.json`, and type-checked by each UI's `tsc` under that
  UI's own flags. Experimental decorators build without error and then throw at
  run time.

The cost of a committed `dist/` is that it can fall out of step with `src/`.
This repository's CI closes that by building and failing when `dist/` differs
from what is committed.

## Versions tested

Run on 2026-10-13 on macOS, in a scratch directory:

- pnpm 9.15.9, 10.34.6, 11.0.4, 11.28.2 (installed with `npm i --prefix`)
- node 24.11.1, git 2.50.1
- vite 6.4.4, vitest 3.2.7 and 5.0.4, typescript 5.9.3, happy-dom 20.14.6
- lit 3.3.3, @shoelace-style/shoelace 2.20.1

The consumers pin: control CI `pnpm/action-setup` `version: 11` (resolves to the
newest 11.x, 11.28.2 today) and no `packageManager`; occupancy
`pnpm@9.15.9`; dccex `pnpm@11.0.4`. All three use Vite 6.

## What was run

A local git repository stood in for this one, with a Lit element
`look-band` that uses `@customElement` and `@property` and renders an
`sl-button`. It had four tags:

| Tag | What it ships |
|---|---|
| `v0.1.0` | TypeScript source, experimental decorators, `exports` to `./src/index.ts` |
| `v0.1.1` | TypeScript source, standard decorators (`accessor`) |
| `v0.2.0` | committed `dist/` from `tsc`, `files: ["dist"]` |
| `v0.3.0` | `dist/` git-ignored, `"prepare": "tsc -p tsconfig.build.json"` |

Each had `lit ^3.2.1` and `@shoelace-style/shoelace ^2.20.1` as
`peerDependencies` and as `devDependencies`. The package's own `tsc --noEmit`
and `vitest run` (happy-dom) passed for each.

A consumer app depended on `lit`, Shoelace and the package by
`git+file://…#<tag>`. Its `tsconfig.json` copied dccex's flags (strict,
`noUnusedLocals`, `exactOptionalPropertyTypes`, `useDefineForClassFields: false`,
no `experimentalDecorators`); a second run added `experimentalDecorators: true`
as control has it. For each pnpm version and tag the script ran `pnpm install`,
listed `node_modules/.pnpm`, then ran `tsc --noEmit`, `vite build` and a vitest
test that mounts `look-band` from the package.

GitHub fetching was tested against public repositories:
`github:sindresorhus/escape-string-regexp#v5.0.0` and
`github:RexSkz/test-git-subfolder-fetch#path:/packages/simple-react-app`.

## 1. TypeScript source, committed `dist/`, or `prepare`

### Committed `dist/`: works under every version, with no setting

| | pnpm 9.15.9 | pnpm 11.0.4 | pnpm 11.28.2 |
|---|---|---|---|
| install | ok | ok | ok |
| consumer `tsc --noEmit` | ok | ok | ok |
| `vite build` | ok | ok | ok |
| vitest 3 | see note | ok | ok |

The installed package held only `package.json` and `dist/`: pnpm applies the
`files` field to a git dependency even when nothing is built.

The note: under pnpm 9 with a `git+file:` URL, the store directory was named
`@rails49+look@git+file++++tmp+…+look#4aa803a…`. vitest 3 stopped reading the
path at `#` and failed with `Cannot find module`. This comes from the local
test URL, not from GitHub. For a GitHub spec pnpm 9 names the directory after
the codeload tarball (`…@https+++codeload.github.com+…`), with no `#`, and a
vitest test importing such a package passed under pnpm 9. A `#path:` GitHub
dependency under pnpm 9 also produced a name without `#`. Testing this package
locally under pnpm 9 should use a `github:` spec or `link:`, not `git+file:`.

### `prepare`: blocked by default since pnpm 10.26

| | result without an entry | entry that works |
|---|---|---|
| pnpm 9.15.9 | builds, `dist/` installed | none needed |
| pnpm 10.34.6 | `ERR_PNPM_GIT_DEP_PREPARE_NOT_ALLOWED` | `onlyBuiltDependencies: ["@rails49/look@git+file:///…/look#f866870…"]` (the name, or name@version, is refused) |
| pnpm 11.0.4 | `ERR_PNPM_GIT_DEP_PREPARE_NOT_ALLOWED` | `allowBuilds: {"@rails49/look": true}` |
| pnpm 11.28.2 | `ERR_PNPM_GIT_DEP_PREPARE_NOT_ALLOWED` | `allowBuilds: {"@rails49/look@git+file:///…/look#<sha>": true}` or `{"@rails49/look@git+file:///…/look": true}`; the bare name is refused |

The rule has moved with each release line:

- pnpm 10.0.0: "Lifecycle scripts of dependencies are not executed during
  installation by default"
  ([release notes](https://github.com/pnpm/pnpm/releases/tag/v10.0.0)).
- pnpm 10.26.0: "Block git-hosted dependencies from running prepare scripts
  unless explicitly allowed in `onlyBuiltDependencies`"
  ([release notes](https://github.com/pnpm/pnpm/releases/tag/v10.26.0),
  [#10288](https://github.com/pnpm/pnpm/pull/10288)).
- pnpm 11.0.0: "`allowBuilds` replaces the old build-dependency settings"
  ([release notes](https://github.com/pnpm/pnpm/releases/tag/v11.0.0)).
- pnpm 10.34.2 and 11.5.3: "Require trusted package identity before
  package-name `allowBuilds` entries can approve lifecycle scripts for git,
  git-hosted tarball, direct tarball, and local directory artifacts. To
  approve one of those artifacts explicitly, use its peer-suffix-free lockfile
  depPath as the `allowBuilds` key"
  ([11.5.3](https://github.com/pnpm/pnpm/releases/tag/v11.5.3),
  [10.34.2](https://github.com/pnpm/pnpm/releases/tag/v10.34.2)).
  The depPath holds the commit, so every bump would edit the entry.
- pnpm 11.11.0 and 11.19.0: the key may be the repository URL with no ref, and
  from 11.19.0 that also covers packages "that pnpm downloads as a tarball"
  ([pnpm.io/settings/build#allowbuilds](https://pnpm.io/settings/build#allowbuilds)).

So with `prepare`, dccex on 11.0.4 needs one key form, control on the newest
11.x another, and a future pnpm may need a third. A `prepare` build also runs
`pnpm install` of this package's devDependencies inside every UI install (seen
in the 11.x output as a nested `pnpm-install` step), and in dccex that happens
inside the Docker build.

### TypeScript source: compiled and checked by each UI's settings

Vite 6 compiles `.ts` files with esbuild and reads compiler options from the
nearest `tsconfig.json` through tsconfck. For a file inside `node_modules` it
reads none. Vite 6.4.4's bundled copy of tsconfck's `find()` begins:

```js
let dir = path$c.dirname(path$c.resolve(filename));
if (isInNodeModules(dir)) {
  return null;
}
```

(`vite/dist/node/chunks/dep-3O3b9SCF.js` in vite 6.4.4.) tsconfck's README says
why: "esbuild ignores node_modules". So the package's own `tsconfig.json` and
the UI's are both ignored, and esbuild's defaults apply.

What that did:

- `v0.1.0` (experimental decorators): `vite build` succeeded, but the output
  used standard-decorator helpers (`__decorateElement`, `__runInitializers`).
  The vitest test failed with Lit's `Error: Unsupported decorator location:
  field`. Adding `experimentalDecorators: true` to the UI's `tsconfig.json`
  changed nothing. Dev pre-bundling (`vite optimize`) gave the same output.
- `v0.1.1` (standard decorators with `accessor`): build and vitest passed with
  both consumer `tsconfig` styles.

Lit documents both forms: with standard decorators they "must be applied to
accessors or auto-accessors", and experimental decorators need
`experimentalDecorators` and `useDefineForClassFields: false`
([lit.dev/docs/components/decorators](https://lit.dev/docs/components/decorators/)).

Type-checking is the second problem. A UI's `tsc --noEmit` follows the import
into `node_modules` and checks the `.ts` files under the UI's flags.
`skipLibCheck` skips only declaration files
([typescriptlang.org/tsconfig#skipLibCheck](https://www.typescriptlang.org/tsconfig/#skipLibCheck)).
With an unused local and an optional property added to the package's source,
the UI reported:

```
look/src/look-band.ts(17,9): error TS6133: 'unused' is declared but its value is never read.
look/src/look-band.ts(18,9): error TS2375: Type '{ a: string | undefined; }' is not assignable to type '{ a?: string; }' with 'exactOptionalPropertyTypes: true'. …
```

`v0.1.0`, which imports `./look-band.ts`, gave `TS5097: An import path can only
end with a '.ts' extension when 'allowImportingTsExtensions' is enabled` in a
UI without that flag, and decorator overload errors in a UI without
`experimentalDecorators`. The source would have to satisfy every UI's flags
and TypeScript version at once (occupancy uses TypeScript ~6.0, the others 5.x).

Lit's publishing guide asks for compiled output: compile TypeScript "to
standard ES2021 supported natively in browsers before publishing", and
"Publish your `.d.ts` typings"
([lit.dev/docs/tools/publishing](https://lit.dev/docs/tools/publishing/)).
Its advice not to bundle applies here too: `dist/` should be `tsc` output, one
module per source file, with `lit` and Shoelace left as imports.

## 2. Lit and Shoelace as peer dependencies

Every variant, under every pnpm version, gave one `lit@3.3.3`, one
`lit-html@3.3.3`, one `lit-element@4.2.2` and one
`@shoelace-style+shoelace@2.20.1` directory in `node_modules/.pnpm`. The
package's directory held a `lit` link to `../../lit@3.3.3/node_modules/lit`,
the UI's own copy.

In each built bundle, Lit's version registration
(`litHtmlVersions … .push("3.3.3")`, `reactiveElementVersions … .push`)
appeared once, and `define("sl-button")` appeared once.

pnpm defaults that make this so: `autoInstallPeers: true`,
`dedupePeerDependents: true`, `strictPeerDependencies: false`, and in a
workspace `resolvePeersFromWorkspaceRoot: true`
([pnpm.io/settings/peer-dependencies](https://pnpm.io/settings/peer-dependencies)).
The peer ranges `lit ^3.2.1` and `@shoelace-style/shoelace ^2.20.1` cover all
three UIs today (control and dccex `lit ^3.2.1`, occupancy `^3.3.2` plus a
root override). A UI outside the range was not tested.

What a second copy would do:

- Lit: Lit calls duplicated Lit a dev-mode warning and extra bytes
  ([lit.dev/docs/tools/development](https://lit.dev/docs/tools/development/#multiple-versions-of-lit-warning)).
- Shoelace: its `define()` skips a tag that is already registered and logs a
  warning when the versions differ (`ShoelaceElement.define` in
  `dist/chunks/chunk.4TUIT776.js`, Shoelace 2.20.1). The first copy wins.
- This package's own elements: Lit's `@customElement` calls
  `customElements.define`, which throws on a name already defined
  ([HTML spec](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api)).
  One dependency gives one copy, so this only matters if a page ever loads two
  builds.

Shoelace assets stay the UI's: Shoelace needs `setBasePath` when cherry-picked
or bundled
([shoelace.style/getting-started/installation](https://shoelace.style/getting-started/installation)),
and each UI already copies the assets and sets the path.

## 3. How Vite and vitest treat the package

A git dependency is a real directory under `node_modules`, not a link, so Vite
treats it as a dependency, not as source:

- Dev: Vite pre-bundles imports that resolve from `node_modules`; linked
  packages outside it are treated as source
  ([vite.dev/guide/dep-pre-bundling](https://vite.dev/guide/dep-pre-bundling)).
  `vite optimize` put `@rails49/look`, `lit` and the Shoelace button into
  `.vite/deps` with Lit in one shared chunk.
- Build: Rollup bundles it with the app. One Lit, one Shoelace (section 2).
- occupancy's `resolve.dedupe: ['lit', 'lit-html', 'lit-element']` does no harm
  and is not needed for this package.

vitest:

- vitest 3 externalizes `node_modules` by default and lets Node load it;
  modules it inlines go through Vite
  ([v3.vitest.dev/config, server.deps](https://v3.vitest.dev/config/#server-deps-inline)).
  The `dist/` build is plain ESM JavaScript, so Node loads it. The TypeScript
  source cannot be loaded by Node and was transformed by Vite, with the esbuild
  defaults from section 1.
- The `dist/` and standard-decorator source variants passed under vitest 3.2.7
  and 5.0.4 (dccex uses `vitest ^5.0.1`), with no `server.deps` setting.

## 4. dccex's Docker build fetches a public tag with no token

For a GitHub spec, both pnpm 9 and 11 write a tarball resolution to the
lockfile:

```yaml
escape-string-regexp@https://codeload.github.com/sindresorhus/escape-string-regexp/tar.gz/ba9a447…:
  resolution: {tarball: https://codeload.github.com/sindresorhus/escape-string-regexp/tar.gz/ba9a447…}
  version: 5.0.0
```

With `PATH` holding only `node`, `GITHUB_TOKEN` and `GH_TOKEN` unset, an empty
store and no `node_modules`, `pnpm install --frozen-lockfile` succeeded under
pnpm 9.15.9 and 11.0.4. A `#path:` dependency also resolves to a codeload
tarball (`resolution: {path: /packages/simple-react-app, tarball: …}`) and
installed the same way under pnpm 11.0.4.

Without a lockfile, the same install failed:
`Command failed with ENOENT: git ls-remote 'https://github.com/sindresorhus/escape-string-regexp.git' v5.0.0 'v5.0.0^{}'`.
Turning a tag into a commit needs git; downloading a commit does not.

What this means for dccex's `deploy/ui.Dockerfile`:

- It already runs `pnpm install --frozen-lockfile`, so no change is needed.
- `node:22-alpine` has no git: "it's uncommon for additional related tools
  (such as `git` or `bash`) to be included in Alpine-based images"
  ([hub.docker.com/_/node](https://hub.docker.com/_/node)). The frozen install
  does not need it.
- The build must reach `codeload.github.com` as well as the npm registry.
- The bump that writes the new commit into the lockfile runs where git is
  installed: a developer machine or a GitHub Actions runner.

A detail: pnpm 9 wrote the annotated tag object's SHA into the URL
(`2103b41…`), pnpm 11 the commit it points at (`ba9a447…`, the `^{}` line of
`git ls-remote`). codeload served both.

## 5. This package's own tests and type-check

What worked in the scratch copy:

- `package.json` with `"type": "module"`, `exports` with `types` and `default`
  under `dist/`, `files: ["dist"]`, `lit` and Shoelace in `peerDependencies`
  and again in `devDependencies` for the tests, plus `typescript`, `vite`,
  `vitest` and `happy-dom` in `devDependencies`. A UI does not install
  devDependencies of a dependency that has no `prepare` script.
- `packageManager: "pnpm@11.x"` and a `pnpm-workspace.yaml` with
  `allowBuilds: {esbuild: true}`, as dccex has, for vite's esbuild.
- Scripts: `check` (`tsc --noEmit`), `test` (`vitest run` in happy-dom),
  `build` (`tsc -p tsconfig.build.json`, emitting `.js` and `.d.ts` to `dist/`
  with `rewriteRelativeImportExtensions` so `./x.ts` imports become `./x.js`).
- CI: `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`,
  `pnpm build`, then `git diff --exit-code dist` so a stale `dist/` fails.

Because `tsc` builds `dist/`, the decorator style is this package's choice.
Experimental decorators compiled by `tsc` gave the `__decorate` output, and the
UIs never compile the source.

## 6. The `#path:` finding from prior work

[`research/ui-sharing`](https://github.com/rails49/control/blob/research/ui-sharing/docs/research/ui-sharing.md)
found that pnpm 9 and later install a subdirectory of a repository with
`#path:`, and that `#semver:` matches repository tags, not the package's
version. With the package at this repository's root, neither applies: no
`#path:` is needed, and the tags are the package's versions. If the package
ever moves to a subdirectory, `#path:` still resolves to a codeload tarball and
installs without git (section 4).

## Open points for other tickets

- The single-file build for static pages could be committed in the same
  `dist/` and so come with the same tag. Not tested here.
- Marking `dist/**` as `linguist-generated` in `.gitattributes` collapses it in
  pull request diffs. Not tested here.
