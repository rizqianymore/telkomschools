# Strict Engineering Rules: Token Optimization, Anti-Hallucination, & Scope Discipline

> These rules apply to **OpenCode**, **Claude (Claude Code)**, **Antigravity**, and all AI coding assistants operating within this repository.

---

## 1. Zero Hallucination Protocol (Kebenaran Fakta & Kode Nyata)
- **Always inspect before assuming**: NEVER write code based on assumptions about APIs, library signatures, exports, or file contents. Inspect the actual file or type definition (`d.ts`, `package.json`, or component source) first.
- **Strict adherence to existing dependencies**: DO NOT hallucinate, import, or introduce arbitrary new libraries/packages unless explicitly instructed by the user. Use the exact installed libraries visible in `package.json`.
- **Verify before reporting**: Before stating that something works or passes, verify via `tsc --noEmit` or appropriate compiler/linter. Never claim completion without proof.
- **Honest limits**: If a file does not exist, an API is deprecated, or an instruction is ambiguous, immediately clarify or state the facts directly. Never guess or fabricate plausible-looking code.

---

## 2. Token Saving & Context Efficiency (Hemat Token)
- **Concise & Direct Responses**: Avoid long-winded conversational filler, preambles ("Tentu, saya akan membantu Anda..."), and repetitive postambles. Jump directly into the solution or diff.
- **Surgical Code Edits**:
  - Prefer small, targeted line replacements or diffs over printing out entire files.
  - Do not reprint unchanged blocks of code.
- **Avoid Tool Spam & Repetitive Queries**:
  - Do not perform redundant tool calls (e.g., repeatedly listing the same directory or re-reading unchanged files).
  - Target exact lines/slices when viewing files rather than reading thousands of lines indiscriminately.
- **Compact Explanations**: Provide brief, bulleted summaries of what was changed and why. Omit redundant prose.

---

## 3. Strict Task Scope (Hanya Kerjakan yang Disuruh)
- **No Unrequested Changes**: NEVER refactor, rename, rewrite, or alter code, configurations, or styling outside the explicit boundary of what the user requested.
- **Preserve Existing Implementations**: Do not touch working pages, layouts, or components unless specifically asked to modify them.
- **No Over-Engineering**: Deliver the cleanest, simplest solution that meets the prompt's requirements. Do not introduce speculative helper functions, unnecessary abstractions, or unrequested features.

---

## 4. UI & Component Standards (shadcn/ui & Tailwind)
- **Use Official shadcn/ui Directly**: Do not invent proprietary wrapper components when shadcn/ui already provides official components (`components/ui/*`).
- **Match Existing Design Tokens**: Use predefined CSS variables (`primary`, `border`, `card`, `background`, etc.) and avoid hardcoded, arbitrary styling.
- **Native Accessibility**: Ensure components comply with semantics (e.g. `nativeButton={false}` when rendering links in Base UI buttons).
