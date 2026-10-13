# How a release reaches the five consumers

Research for [rails49/look#3](https://github.com/rails49/look/issues/3).

## Answer

One workflow in this repository, run when a `v*` tag is pushed, opens a bump
pull request in each of the five consumers. It authenticates as a GitHub App
owned by `rails49` and installed on those five repositories only, with
`contents: write` and `pull-requests: write`. The App's private key is one
GitHub Actions secret in `rails49/look`; its client ID is an Actions variable.
Nothing is stored on any disk, and no person's token is involved.

What the pull request changes differs per consumer:

| consumer | what the bump changes |
| --- | --- |
| `control` | `ui/package.json` specifier `github:rails49/look#<tag>` and `ui/pnpm-lock.yaml` |
| `occupancy` | `ui/package.json` specifier and the root `pnpm-lock.yaml` |
| `dccex` | `ui/package.json` specifier and `ui/pnpm-lock.yaml` |
| `installation` | a committed copy of the single-file build, and the tag it came from |
| `rails49.org` | the tag in the jsDelivr URL in `site/index.html` and `site/404.html` |

The built UIs keep Lit and Shoelace as peer dependencies and bundle them once,
in their own build. The single-file build is a second Vite library build of
the same source with nothing marked external, so Lit, the Shoelace components
the chrome uses and the theme CSS are inside it. It is for pages that load no
Lit or Shoelace of their own.

The reasons, in short:

- `GITHUB_TOKEN` cannot write to another repository, so some other credential
  is needed whichever repository starts the bump.
- A pull request opened with `GITHUB_TOKEN` gets its `pull_request` runs in an
  approval-required state. With an App token the runs start on their own, so
  `control`'s required `ci` check runs without a person.
- Renovate and Dependabot need no secret, but neither can write the
  installation's copy of the single-file build, and Dependabot cannot edit the
  landing page's URL. Either would cover only part of the five and still need
  a second mechanism.
- An App installation token lasts one hour and belongs to no person. A
  fine-grained PAT is tied to a person's account and has an expiry to renew.

## Sources

Consumers read at these commits on `main`:

- control [`a863abd`](https://github.com/rails49/control/tree/a863abdac2b807d536d9ff9b4f15cc6deff7965b):
  `.github/workflows/ci.yml`, `ui/package.json`, `ui/pnpm-lock.yaml`, `scripts/deploy.sh`.
- occupancy [`75c3baf`](https://github.com/rails49/occupancy/tree/75c3bafce4f053e2bae3543e798d2c413f3f888b):
  `.github/workflows/test.yml`, `package.json`, `pnpm-workspace.yaml`, `ui/package.json`, `bin/deploy.sh`.
- dccex [`2cf5036`](https://github.com/rails49/dccex/tree/2cf5036d584ddafc7a18ff9a5901126fed2647a2):
  `.github/workflows/ci.yml`, `ui/package.json`, `deploy/ui.Dockerfile`, `scripts/deploy.sh`.
- installation [`28f7c0b`](https://github.com/rails49/installation/tree/28f7c0bd58a3fc79771b36318a79c9ad896847fe):
  `.github/workflows/ci.yml`, `compose.yaml`, `page/`, `deploy.sh`, `scripts/check.sh`, `look/README.md`.
- rails49.org [`65c3cdb`](https://github.com/rails49/rails49.org/tree/65c3cdbdec97efe2927b6e9f83130aed28383136):
  `README.md`, `deploy.sh`, `site/index.html`, `look/README.md`.
- rails49/.github [`3cff700`](https://github.com/rails49/.github/tree/3cff700afb6992184009d7b99d1862bb2b79b51b):
  ADR-0004, 0005, 0007, 0009, 0010.
- Rulesets and Actions settings, read with `gh api repos/rails49/<repo>/rulesets`
  and `gh api repos/rails49/<repo>/actions/permissions/workflow` on 2026-10-13.

Tools read at:

- Renovate [`66c56b5`](https://github.com/renovatebot/renovate/tree/66c56b514f1d25495520fc93be1e0c9c1be1cc5a)
  and its docs at docs.renovatebot.com.
- dependabot-core [`95cd52e`](https://github.com/dependabot/dependabot-core/tree/95cd52ed9f6776b284441d60ddbd8d128b8648ef).
- jsDelivr [`5a3f39d`](https://github.com/jsdelivr/jsdelivr/tree/5a3f39db3032bbb366d72c74e8a0ac133977877b)
  `README.md`, plus response headers observed on 2026-10-13.
- actions/create-github-app-token [`64ab729`](https://github.com/actions/create-github-app-token/tree/64ab729a6294000f5aa4a4bc0b73d1f32bc45510).
- GitHub, pnpm, Vite, Shoelace, Lit, MDN and Docker docs as linked below,
  read on 2026-10-13.

## The five consumers today

| repo | gate | `main` ruleset | pnpm | deploy |
| --- | --- | --- | --- | --- |
| `control` | `ci` job, required | PR only, `ci` required, no bypass, auto-merge allowed | 11 in CI; no `packageManager` field in `ui/` | `scripts/deploy.sh`: ssh, `git pull`, `pnpm --dir ui build`, compose |
| `occupancy` | `test` workflow on PRs and `main` | none | 9.15.9 from root `packageManager`; `ui` is a workspace package | `bin/deploy.sh` to Cloudflare Pages, by hand |
| `dccex` | `ci`, `docker`, `node`, `broker`, all required | PR only, no bypass, auto-merge allowed | 11.0.4 from `ui/package.json` via corepack | `scripts/deploy.sh`: ssh, image build on the box |
| `installation` | `ci`, required | PR only, `ci` required, no bypass, auto-merge allowed | 11.0.4 (tests only) | `./deploy.sh <box>`: ssh, `git pull`, `compose up -d` |
| `rails49.org` | none | none | none, no build | `./deploy.sh` to Cloudflare Pages, by hand |

All six repositories, `look` included, have default workflow permissions
`read` and "Allow GitHub Actions to create and approve pull requests" off.
No repository has a `dependabot.yml` or a Renovate config. The only App
installed on the org is `claude`.

Every consumer deploys by hand after a merge. A bump pull request ends at the
merge; the next deploy of that consumer ships it, as it ships anything else.

## Why a cross-repository credential is needed

- `GITHUB_TOKEN` is limited to its own repository: "The token's permissions
  are limited to the repository that contains your workflow."
  ([GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token))
  "The `GITHUB_TOKEN` can only access resources within the workflow's
  repository. If you need to access additional resources, such as resources in
  an organization or in another repository, you can use a GitHub App."
  ([GitHub App in a workflow](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/making-authenticated-api-requests-with-a-github-app-in-a-github-actions-workflow))
- Events made with `GITHUB_TOKEN` do not start workflows, with two exceptions.
  `workflow_dispatch` and `repository_dispatch` always do. A pull request
  opened or updated with `GITHUB_TOKEN` gets its `pull_request` runs "in an
  approval-required state", started by a person with write access. An App
  token or a PAT "lets `pull_request` workflows run automatically (without the
  approval prompt)".
  ([Triggering a workflow from a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow))
- So a bump opened by each consumer's own `GITHUB_TOKEN` (for example from a
  scheduled workflow there) would need "Allow GitHub Actions to create and
  approve pull requests" turned on in each repository
  ([Actions settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests)),
  and then a person would approve each `ci` run before the pull request could
  merge.
- `repository_dispatch` from here to each consumer does not avoid a token. The
  endpoint needs `Contents: write` on the target repository
  ([fine-grained permissions](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens),
  [create a dispatch event](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)),
  and the pull request the consumer then opens with its own `GITHUB_TOKEN`
  has the approval problem above. It adds a workflow per consumer and removes
  nothing.

## The ways to open the bump pull requests

### A workflow here, with a GitHub App token (recommended)

- Setup, once, by an org owner: register an App owned by `rails49`, give it
  repository permissions Contents read/write and Pull requests read/write,
  install it on `control`, `occupancy`, `dccex`, `installation` and
  `rails49.org` only. Store the client ID as an Actions variable and the
  private key as an Actions secret in `rails49/look`
  ([steps](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/making-authenticated-api-requests-with-a-github-app-in-a-github-actions-workflow#authenticating-with-a-github-app)).
- The private key is downloaded once as a `.pem` file; "GitHub only stores
  the public portion of the key"
  ([private keys](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps)).
  Pipe it into `gh secret set` and delete the file. A lost key is replaced by
  generating a new one.
- In the workflow, `actions/create-github-app-token` mints the token. It takes
  `owner`, a `repositories` list and `permission-<name>` inputs, so the token
  can be cut down to the five repositories and two permissions. The token
  expires after one hour and is revoked when the job ends
  ([README](https://github.com/actions/create-github-app-token/blob/64ab729a6294000f5aa4a4bc0b73d1f32bc45510/README.md),
  [installation tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)).
- Trigger: `on: push: tags: ['v*']`. No event is created when more than three
  tags are pushed at once
  ([push](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#push)).
- Pull requests it opens run each consumer's gate at once, with no approval.
  `control`, `dccex` and `installation` allow auto-merge, so the workflow
  could also call `gh pr merge --auto --rebase`. Whether it should is a
  decision for the map, not a technical limit.
- Fires within a minute of the tag.

A fine-grained PAT works in the same place. It is tied to a person's account,
its lifetime is 1 to 366 days or none if org policy allows, and the pull
requests are authored by that person
([PATs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)).
The App is preferred because it has neither of these.

Sketch of the token step:

```yaml
- uses: actions/create-github-app-token@v3
  id: token
  with:
    client-id: ${{ vars.LOOK_APP_CLIENT_ID }}
    private-key: ${{ secrets.LOOK_APP_PRIVATE_KEY }}
    owner: rails49
    repositories: control,occupancy,dccex,installation,rails49.org
    permission-contents: write
    permission-pull-requests: write
```

For each consumer the job clones it with that token, makes the change in the
table above on a fixed branch such as `look/bump`, force-pushes, and opens a
pull request if none is open. One open bump per consumer, replaced by the next
tag. For the three built UIs the lockfile is rewritten with the consumer's own
pnpm (`pnpm install --lockfile-only` in `ui/` for `control` and `dccex`, at the
root for `occupancy`): corepack reads `packageManager` in `occupancy` and
`dccex`; `control/ui` has no such field and its CI uses pnpm 11.

### Renovate, through the Mend-hosted app

- Handles `github:rails49/look#v1.2.0`. Its npm manager strips `github:`,
  `git+` and `https://github.com/`, and when the part after `#` is a version
  it sets datasource `github-tags` with npm versioning. It also handles
  `#semver:<range>`. Any other ref, such as a branch or
  `#v1.2.0&path:/packages/look`, is skipped as `unversioned-reference`
  ([`dependency.ts` lines 165–242](https://github.com/renovatebot/renovate/blob/66c56b514f1d25495520fc93be1e0c9c1be1cc5a/lib/modules/manager/npm/extract/common/dependency.ts#L165-L242)).
  So the package must sit at the repository root, not in a subdirectory.
- Updates `pnpm-lock.yaml`. It picks the pnpm version from `packageManager`
  or `engines`, else from the lockfile version
  ([`pnpm.ts`](https://github.com/renovatebot/renovate/blob/66c56b514f1d25495520fc93be1e0c9c1be1cc5a/lib/modules/manager/npm/post-update/pnpm.ts#L55-L65)).
  `control/ui` has no `packageManager`, so its pnpm would be inferred.
- The landing page URL could be bumped by a custom `regex` manager with
  `datasourceTemplate: github-tags`
  ([regex manager](https://docs.renovatebot.com/modules/manager/regex/)).
  The built-in `html` manager only knows cdnjs URLs
  ([html manager](https://docs.renovatebot.com/modules/manager/html/)).
- It cannot write the installation's copy. That needs a command after the
  update (`postUpgradeTasks`), and on the hosted app "Free users cannot modify
  nor request arbitrary commands"
  ([Mend FAQ](https://docs.renovatebot.com/mend-hosted/faq/),
  [postUpgradeTasks](https://docs.renovatebot.com/configuration-options/#postupgradetasks)).
- Runs every 4 hours on the free plan, plus on webhooks from the consumer
  repository; a tag here is not one of them
  ([Mend-hosted overview](https://docs.renovatebot.com/mend-hosted/overview/)).
- Needs no secret. Needs an org owner to install a third-party App with write
  access, and a `renovate.json` in each consumer limiting it to
  `@rails49/look`, or it opens pull requests for every other dependency too.

### Dependabot

- The docs list pnpm v7, v8, v9 and v10 as supported for version updates
  ([supported ecosystems](https://docs.github.com/en/code-security/dependabot/ecosystems-supported-by-dependabot/supported-ecosystems-and-repositories)).
  `control`, `dccex` and `installation` use pnpm 11. The dependabot-core
  source already lists 11 and 12
  ([`pnpm_package_manager.rb`](https://github.com/dependabot/dependabot-core/blob/95cd52ed9f6776b284441d60ddbd8d128b8648ef/npm_and_yarn/lib/dependabot/npm_and_yarn/pnpm_package_manager.rb#L27-L36)),
  but the docs do not say so.
- The npm parser recognises `github:owner/repo#ref` and updates a pinned ref
  that looks like a version to the newest such tag
  ([`file_parser.rb`](https://github.com/dependabot/dependabot-core/blob/95cd52ed9f6776b284441d60ddbd8d128b8648ef/npm_and_yarn/lib/dependabot/npm_and_yarn/file_parser.rb#L33-L42),
  [`update_checker.rb`](https://github.com/dependabot/dependabot-core/blob/95cd52ed9f6776b284441d60ddbd8d128b8648ef/npm_and_yarn/lib/dependabot/npm_and_yarn/update_checker.rb)).
  The docs do not state that git dependencies under pnpm are supported, so this
  rests on source code and is untested here.
- Runs on a schedule (`daily`, `weekly`, … or `cron`), not on a tag here
  ([options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#schedule-)).
- Has no manager for an HTML URL or a copied file, so it covers at most the
  three built UIs.
- Needs no secret and no App; its pull requests run the consumer's workflows,
  with secrets taken from Dependabot secrets rather than Actions secrets
  ([Dependabot and Actions](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/automating-dependabot-with-github-actions)).

### Comparison

| | workflow + App | Renovate (hosted) | Dependabot |
| --- | --- | --- | --- |
| built UIs | yes | yes, root package only | probably; pnpm 11 and git deps not in docs |
| landing page URL | yes | yes, with a regex manager | no |
| installation copy | yes | no | no |
| when | on the tag | up to 4 hours | on its schedule |
| secret | App private key, Actions secret in `look` | none | none |
| standing parts | one App, one workflow here | third-party App, config in 4 repos | config in 3 repos |

The mixed option, Renovate for four consumers plus something else for the
installation, has more parts than the workflow alone.

ADR-0005 considered and set aside "a workflow here that files the issues.
Real machinery, needing a cross-repository token to write into three
repositories, for an event that has happened zero times. If it starts
happening monthly, this is the upgrade." This map makes releases a routine
event, so the org ADR the map ends in should record the change.

## The landing page and jsDelivr

- `cdn.jsdelivr.net/gh/rails49/look@<version>/<path>` serves a file from the
  repository at a tag, a commit or a branch
  ([jsDelivr GitHub](https://github.com/jsdelivr/jsdelivr/blob/5a3f39db3032bbb366d72c74e8a0ac133977877b/README.md#github)).
  It serves files in the git tree. So the single-file build must be committed
  at the tag; a GitHub release asset is not reachable this way. This bears on
  [#2](https://github.com/rails49/look/issues/2) (committed `dist/` or a build
  step): if `dist/` is not committed, the release must commit the single-file
  build before tagging.
- A `v`-prefixed tag works. Observed on 2026-10-13:
  `gh/twbs/bootstrap@v5.3.0/...` answered `x-jsd-version: 5.3.0`.
- An exact tag is cached for good. The README: "Static Versions and commit
  hashes – Effectively forever … no option or way to update the contents of
  that file." Observed header: `cache-control: public, max-age=31536000,
  s-maxage=31536000, immutable`. A bad release is fixed with a new tag, never
  by moving one.
- A range such as `@1` resolves to the newest matching tag. The README says
  version aliases are cached 7 days; observed was `max-age=604800,
  s-maxage=43200` (7 days in the browser, 12 hours at the CDN). Branches are
  cached 12 hours. Purge works only for aliases and needs access granted by
  email ([caching](https://github.com/jsdelivr/jsdelivr/blob/5a3f39db3032bbb366d72c74e8a0ac133977877b/README.md#caching),
  [purge](https://github.com/jsdelivr/jsdelivr/blob/5a3f39db3032bbb366d72c74e8a0ac133977877b/README.md#purge-cache)).
- A module script from it loads cross-origin: observed
  `access-control-allow-origin: *` and
  `content-type: application/javascript; charset=utf-8`.
- Size limit for GitHub files: 20 MB per file.

How a bump reaches the page: the pull request changes the tag in the URL in
`site/index.html` and `site/404.html`. `rails49.org` has no gate and no
ruleset, so the change is read and merged by hand, then `./deploy.sh` uploads
`site/`. A range URL (`@0` or `@1`) would reach the page with no pull request
and no deploy, up to 7 days late, with no review and no pin. It is not
recommended, because every other consumer pins a tag.

## The installation page

- The box runs with no internet during operation (ADR-0004), so the browser
  cannot fetch the file from jsDelivr. The file has to be served by the box.
- The installation builds no image. The `page` service is stock
  `nginx:alpine` with `./page` bind-mounted read-only, and `render.sh` writes
  `index.html` once at container start (`compose.yaml`). The box takes new
  files by `git pull` in `./deploy.sh`.
- So the single-file build is committed into `installation`, with the tag it
  came from recorded beside it, the way `look/README.md` records the commit of
  `tokens.css` today. The bump pull request replaces the file and the tag.
  `installation`'s required `ci` gate runs on it.
- `docker compose up -d` recreates a container only when "the service's
  configuration or image was changed"
  ([compose up](https://github.com/docker/compose/blob/main/docs/reference/compose_up.md)).
  A new file under a bind mount is neither. If nginx serves a copy made at
  container start, a bump needs a restart of `page`. If the file sits in its
  own directory mounted into nginx's html root (for example
  `./page/look:/usr/share/nginx/html/look:ro`), `git pull` alone updates it.
  `compose.yaml` already mounts directories rather than files for this reason
  (control#353).
- Any icon the page draws must come from the build itself. See below.

## Lit and Shoelace in the single-file build

- For the built UIs, Lit and `@shoelace-style/shoelace` are peer dependencies
  (and dev dependencies here, for this repository's own tests). The package
  ships modules that import them by name, and the consumer's bundler resolves
  one copy. Lit's guidance: "Bundling a reusable component before publishing
  to npm can also introduce multiple versions of Lit … into a user's
  application"
  ([Lit publishing](https://lit.dev/docs/tools/publishing/#don't-bundle,-minify,-or-optimize-modules)).
- The single-file build is a separate Vite library build (`build.lib`, format
  `es`) from a second entry. Vite bundles every dependency not listed in
  `external`, so leaving `external` empty puts Lit and the imported Shoelace
  components in the file
  ([library mode](https://vite.dev/guide/build#library-mode)).
- Import Shoelace components one by one from its npm `dist/` directory
  ("always cherry pick"), not the pre-bundled `cdn/` directory
  ([Shoelace bundling](https://shoelace.style/getting-started/installation#bundling)).
- CSS: in library mode Vite writes imported CSS to a separate `.css` file. To
  keep one file, import the theme CSS with `?inline`, which returns it as a
  string, and adopt it into the document from the entry
  ([library CSS](https://vite.dev/guide/build#css-support),
  [`?inline`](https://vite.dev/guide/features#disabling-css-injection-into-the-page)).
- Icons: Shoelace's default library loads Bootstrap Icons from files under the
  base path. A static page has no such files, and the box has no internet.
  Shoelace's own `system` library "does not rely on physical assets … its
  icons are hard-coded as data URIs"
  ([Shoelace icons](https://shoelace.style/components/icon#customizing-the-system-library)).
  The single-file build does the same: any glyph the static pages use, from
  Bootstrap or from the rails49 set
  ([#4](https://github.com/rails49/look/issues/4)), is bundled as an SVG
  string and resolved to a `data:` URL.
- A page must never load both the single-file build and another copy of the
  same elements. `customElements.define` throws `NotSupportedError` when the
  name is already defined
  ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#exceptions)).
  The two static pages load no Lit or Shoelace of their own, so this holds
  today; a built UI must import the package, never the single-file build.

## Open points for the map

- Whether bump pull requests in `control`, `dccex` and `installation` enable
  auto-merge, or wait for a person.
- The file name and path of the single-file build in this repository, which
  the jsDelivr URL and the installation copy both name.
- Whether `dist/` is committed ([#2](https://github.com/rails49/look/issues/2));
  jsDelivr needs at least the single-file build in the tagged tree.
- The org ADR records the App, its two permissions and the five
  repositories it is installed on, and amends ADR-0005's line that a change
  is announced by hand.
