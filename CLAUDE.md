# look

## Agent skills

The rules every rails49 repository shares are the organisation's
[`docs/agents/`](https://github.com/rails49/.github/tree/main/docs/agents):
`issue-tracker.md`, `triage-labels.md` and `domain.md`.

- Issue tracker: GitHub Issues on rails49/look, via the `gh` CLI.
- Triage labels: `needs-triage`, `needs-info`, `ready-for-agent`,
  `ready-for-human`, `wontfix`.
- Domain docs: `GLOSSARY.md` and `docs/adr/` at the repo root, and the
  reference `docs/LOOK.md`. What each kind of doc holds: org
  [ADR-0025](https://github.com/rails49/.github/blob/main/docs/adr/0025-each-fact-has-one-owner-and-an-adr-is-written-after-its-decision-has-run.md).

## Gate

The gate runs what CI runs, including the check that the committed `dist/`
matches a fresh build:

gate: pnpm install --frozen-lockfile && pnpm check && pnpm exec playwright install chromium && pnpm test && pnpm build && test -z "$(git status --porcelain dist)"
