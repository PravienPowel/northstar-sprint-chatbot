 Team Charter — Northstar Sprint

 Team
- Pravien Laban (Team Lead)
- Kibet Forbes
- Morris Njeru
- Anne Mugunye
- Topister Were

 Communication
- Primary channel: WhatsApp group
- Expected response time: within 4 hours during work hours (8am–8pm)
- Daily check-in: 8pm, quick update on progress in the group chat

 Deadlines & Status Updates
- Board status must move the same day work happens — no batching updates to end of week
- "Done" means: work is committed/pushed AND the issue is moved to Done on the board
- When starting a task, move its card to "In Progress" immediately

 Conflict Resolution
- Disagreements on approach: raised in the group chat, decided by majority vote, or by the team lead if tied
- Missed deadlines: if a task shows zero visible activity for 2+ days, the owner is checked in on immediately by the team lead
- If unresolved after check-in, the task may be reassigned by the team lead

 Branch Naming Convention
Format: `<type>/<short-description>`
Types: `feature`, `fix`, `docs`
Examples:
- `feature/order-status-intent`
- `feature/refund-fallback-message`
- `fix/bot-crash-on-empty-input`
- `docs/readme-update`

Rule: every task/issue should have its own branch before work starts, named after what the issue is doing. No working directly on `main`, and no vague names like "test" or "patch1".

 Commit/Edit Convention
Format: `<type>: <what changed> - <why it matters>`
Types: `feat`, `fix`, `docs`, `refactor`
Examples:
- `feat: add order-status intent matching - lets bot recognize "where is my order" queries`
- `fix: correct refund fallback message - was returning blank response`
- `docs: add team charter - establishes norms and commit conventions`

Not acceptable: "wip", "updates", "fix stuff", or any message that doesn't explain what changed and why.

 Code Review
- No branch merges directly into main without review.
- Before merging, open a Pull Request and tag at least one teammate to review.
- Reviewer checks: does it work, does it follow the commit convention, any obvious bugs.
- Once approved, the task owner merges the PR and moves the board card to Done.

 Signed by
- Pravien Laban ✅
- Kibet Forbes — ✅
- Morris Njeru -✅
- Anne Mugunye -✅
- Topister Were -✅
