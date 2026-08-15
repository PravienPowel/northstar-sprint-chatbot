# Audit Log — Northstar Sprint (Final)

This log tracks team activity: commits, PRs, and board movement, mapped to tasks.

## Pull Requests (merged)
| PR # | Title | Author | Task(s) |
|------|-------|--------|---------|
| #16 | feat: define order-status trigger phrases | Morris Njeru | #4 |
| #17 | feat: add order-status happy-path logic | Morris Njeru | #5 |
| #18 | feat: add graceful fallback for order-not-found edge case | Morris Njeru | #6 |
| #19 | Create returns-refunds-triggers.md | Anne Mugunye | #7 |
| #20 | Task 7-8: Add Returns & Refunds intents and response logic | Anne Mugunye | #7, #8 |
| #21 | Task #9: Handle ambiguous input edge case - Returns & Refunds | Anne Mugunye | #9 |
| #22 | Feature/conversation UI | Pravien Laban | #12 |
| #23 | feat: integrate order-status handler and ticket routing | Topister Were | #10, #11 |
| #24 | Fix: sync docs with CLI menu (remove unwired stock-availability option) | Kibet Forbes | #13 |
| #27 | Docs/chatbot framework | Kibet Forbes | #2 |
| #29 | Add ticket category definitions to documentation | Kibet Forbes | #3 |
| #30 | fix: wire orderStatusEdgeCase.js into CLI - activates task #6 safety net | Pravien Laban | #6, #12 |
| #31 | Chore/cleanup unused files | Pravien Laban | repo hygiene |

Note: PRs #25 and #26 (Kibet, early go-live/framework drafts) were closed without merging — superseded by corrected versions after review caught scope and accuracy issues (see Review Notes below).

## Post-merge cleanup & corrections (direct commits to main)
| Date | Change | By |
|------|--------|-----|
| Aug 15, 2026 | Deleted Go_Live_Readiness_Note_corrected.docx (duplicate of plain-text version) | Pravien Laban |
| Aug 15, 2026 | Renamed Go-live-readiness → Go-live-readiness.md for proper rendering | Pravien Laban |
| Aug 15, 2026 | Deleted Chatbot_Framework_Confirmation_corrected.docx (duplicate) | Pravien Laban |
| Aug 15, 2026 | Renamed chatbot framework → chatbot-framework.md for proper rendering | Pravien Laban |
| Aug 15, 2026 | Fixed stray "Python" reference in Ticket Category Definitions (project is Node.js) | Pravien Laban |

## Board Activity (final state)
| Task # | Task | Status | Owner |
|--------|------|--------|-------|
| #1 | Set up repo, invite team, initialize board | Done | Pravien Laban |
| #2 | Confirm chatbot framework/tech stack | Done | Kibet Forbes |
| #3 | Define the 2 ticket categories to handle | Done | Kibet Forbes |
| #4 | Define intents/trigger phrases — Order status | Done | Morris Njeru |
| #5 | Build happy-path response logic — Order status | Done | Morris Njeru |
| #6 | Handle "no order found" edge case — Order status | Done | Morris Njeru |
| #7 | Define intents/trigger phrases — Returns & refunds | Done | Anne Mugunye |
| #8 | Build happy-path response logic — Returns & refunds | Done | Anne Mugunye |
| #9 | Handle ambiguous input edge case — Returns & refunds | Done | Anne Mugunye |
| #10 | Integrate both categories into one bot session | Done | Topister Were |
| #11 | Add fallback for unrecognized questions | Done | Topister Were |
| #12 | Build basic conversation UI | Done | Pravien Laban |
| #13 | Write go-live readiness note | Done | Kibet Forbes |
| #14 | Test full demo across both categories | Done | Topister Were |
| #15 | Export commit/edit audit log | Done | Pravien Laban |

## Review Notes — issues caught and fixed during review
- **Task #6 (Morris):** a filename case-sensitivity issue (orderStatus.js vs orderstatus.js); flagged in review and fixed before merge. Separately, the edge-case handler (orderStatusEdgeCase.js) was merged but never actually imported anywhere — discovered during Day 4 review, fixed in PR #30, and verified working via live end-to-end terminal testing.
- **Task #9 (Anne):** approved after directly testing that intent-check ordering correctly handled overlapping edge cases (e.g. "problem with my order, can I exchange it" correctly routes to escalation, not a normal return).
- **Task #10/#11 (Topister):** PR #23 hit a GitHub auto-merge bug that silently duplicated code (two ORDER_PATTERN/RETURN_PATTERN declarations) without flagging it as a real conflict. Caught by testing the merged file directly rather than trusting GitHub's "no conflicts" status; fixed by deleting and re-adding the file cleanly.
- **Task #13 (Kibet):** initial go-live readiness note and framework confirmation docs described a different architecture (browser-based UI, numbered menu, files like main.js/data.js/stock.js) than what was actually built (CLI, free-text input, bot-cli.js/orderstatus.js/returns-refunds.js). Also initially listed Stock Availability as "working" despite it not being built. Corrected to match the real repo; original drafts (#25, #26) closed without merging.
- **Repo hygiene (#31):** removed 6 unused files (data.js, main.js, lookup.js, stock.js, returns.js, duplicate orderStatus.js) left over from the earlier, abandoned browser-based architecture — confirmed unused via repo-wide search for each filename before deletion.
- **Documentation cleanup:** removed duplicate .docx copies of the go-live note and framework confirmation (plain-text .md versions kept as the single source of truth); fixed a stray "Python" reference in the Ticket Category Definitions doc (project is Node.js/JavaScript throughout).

## End-to-end verification (Day 4)
Full system tested live via `node bot-cli.js` after all modules were merged together, confirming:
- Valid order lookup (real data, correct formatting)
- Valid returns/refunds lookup (real data, correct formatting)
- Overlapping-phrase routing ("How do I return my order?" → correctly routes to returns, not order-status)
- False-positive avoidance ("crossing the border" → correctly does NOT trigger order-status)
- Out-of-scope escalation ("can I exchange this" → correctly escalates to human)
- Clean exit via 'exit'/'quit' command

All confirmed working as an integrated system, not just as individually reviewed modules.

## Post-cleanup regression & fix
On Aug 15, a fresh git clone (used to verify the repo works for anyone 
cloning it new, not just the original test machine) revealed 
orderStatusEdgeCase.js had been silently truncated during an earlier edit, 
causing a syntax error and silent fallback to placeholder logic. Fixed by 
rewriting the file completely; re-verified the full system end-to-end on 
the fresh clone afterward, confirming all core flows (order lookup, refund 
lookup, routing, escalation) work correctly for a first-time clone.
