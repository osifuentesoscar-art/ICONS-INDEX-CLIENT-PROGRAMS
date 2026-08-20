# Network Allowlist Request — NotebookLM CLI in Remote Sessions

**Requested by:** Oscar Sifuentes (osifuentesoscar@gmail.com)
**Date:** 2026-08-20
**Applies to:** the Claude Code remote execution environment used for
`osifuentesoscar-art/ICONS-INDEX-CLIENT-PROGRAMS`
**Does not apply to:** local workstations, which are unaffected and already work.

---

## What is being asked for

Add the hosts in the table below to the remote environment's egress
allowlist, so the `notebooklm-py` CLI can reach Google NotebookLM from a
remote Claude Code session.

**One host is load-bearing:** `notebook.google.com`. The rest are optional
and only needed for specific features (Drive-sourced documents, headless
token refresh). If the policy owner wants the smallest possible change,
approving that single host is enough to make the CLI functional.

## Why

The ICONS system produces client training plans, assessment reports, and
trainer education material from a research-heavy evidence base. NotebookLM
is being evaluated as a way to query that corpus programmatically from the
same automated pipeline that already builds the documents. Today that only
works on a workstation; the automated/remote path fails at the network layer.

## Current state — measured, not assumed

Probed from inside the remote container on 2026-08-20. `BLOCKED` means the
egress proxy answered `403` to `CONNECT` (policy denial), surfacing to
`curl` as status `000`.

| Host | Status | Needed for |
|---|---|---|
| `notebook.google.com` | **BLOCKED** | **Required.** The CLI's `DEFAULT_BASE_URL` — every API call. |
| `accounts.google.com` | ok (302) | Auth / cookie rotation. Already permitted. |
| `oauth2.googleapis.com` | ok (404) | Token mint for headless refresh. Already permitted. |
| `www.googleapis.com` | ok (404) | Google API surface. Already permitted. |
| `notebooklm.google.com` | BLOCKED | Optional — web UI hostname, redirect target. |
| `drive.google.com` | BLOCKED | Optional — only for `source add-drive`. |
| `drive.usercontent.google.com` | BLOCKED | Optional — Drive file download path. |
| `notebooklm.cloud.google.com` | BLOCKED | Optional — enterprise/Workspace tenants. |
| `www.google.com` | BLOCKED | Optional — incidental redirects. |

Host list derived from the endpoint constants in `notebooklm-py` v0.8.1
(`_env.py`, `_auth/`, `_source/drive_import.py`), not guessed.

### Minimal vs. full request

- **Minimal (recommended):** `notebook.google.com` only. Makes the CLI work
  for notebook/source/chat/artifact operations.
- **Add if Drive sources are wanted:** `drive.google.com`,
  `drive.usercontent.google.com`.
- **Add for enterprise tenants:** `notebooklm.cloud.google.com`.

## Scope and risk notes

- **Read/write is to the requester's own Google account.** No new
  third-party service is introduced; these are Google first-party hosts,
  and `accounts.google.com` is already allowlisted.
- **No credentials are stored in the repository.** Auth lives in
  `~/.notebooklm/profiles/<profile>/storage_state.json` on whichever
  machine ran `notebooklm login`. Nothing in this request changes that.
- **Client data consideration:** approving this makes it *possible* to send
  ICONS content to NotebookLM. Client documents in this repo contain
  personal health information (Styku body-composition scans, clinical
  flags, PT/SOAP-note findings). Whether any of that may be uploaded to
  NotebookLM is a separate policy decision and is **not** part of this
  request — this asks only for network reachability.

## A second, independent blocker (for awareness)

Even with the allowlist change, `notebooklm login` cannot complete inside a
remote session: it requires an interactive browser sign-in, and the
container is headless with no display. Auth must be established on a
workstation and the resulting session transported, or minted via the CLI's
`--master-token` headless path (which still needs one initial browser
sign-in elsewhere).

So the allowlist change is **necessary but not sufficient** on its own. It
should be approved only if remote NotebookLM access is genuinely wanted;
for one-off local use, no policy change is needed at all.

## How to verify after the change

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://notebook.google.com/
# expect a real HTTP status (e.g. 200/302/404), not 000

notebooklm auth check --test --json    # expect "status": "ok"
notebooklm list                        # expect the account's notebooks
```
