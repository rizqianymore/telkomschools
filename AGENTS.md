<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Strict Agent Guidelines (OpenCode, Claude, Antigravity)

## 1. Zero Hallucination & Fact Grounding
- **Always verify first**: Inspect files, types, and actual exports before referencing or modifying them.
- **No speculative packages**: Only use dependencies found in `package.json`. Do not install or import unrequested packages.
- **Verify compilation**: Always run `tsc --noEmit` before concluding. Never claim a task is completed without verification.

## 2. Token Conservation & Efficiency
- **Be concise**: Skip conversational fluff, generic introductions, and repetitive text.
- **Surgical edits**: Only modify the exact lines needed. Never regenerate whole files unnecessarily.
- **Zero tool spam**: Avoid querying the same directories or files repeatedly.

## 3. Strict Scope Enforcement
- **Do ONLY what is asked**: Never alter, refactor, or delete code/features that were not explicitly requested by the user.
- **Preserve existing working code**: Keep functional components intact.

