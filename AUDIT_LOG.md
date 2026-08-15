# Audit Log — Northstar Sprint

This log tracks team activity: commits and board movement, mapped to tasks.
Updated regularly through the sprint, finalized on Day 5.

## Commits
| Date | Author | Commit Message |
|------|--------|-----------------|
| Aug 12, 2026 | Pravien Laban | Initial commit |
| Aug 12, 2026 | Pravien Laban | docs: add team charter - establishes norms and conventions |
| Aug 13, 2026 | Morris Njeru | feat: define order-status trigger phrases |
| Aug 13, 2026 | Morris Njeru | feat: add order-status happy-path response logic |
| Aug 13, 2026 | Morris Njeru | feat: add graceful fallback for order-not-found edge case |
| Aug 13, 2026 | Anne Mugunye | feat: define returns & refunds trigger phrases |
| Aug 13, 2026 | Anne Mugunye | feat: add returns & refunds happy-path response logic |
| Aug 13, 2026 | Anne Mugunye | feat: handle ambiguous input edge case - returns & refunds |
| Aug 13, 2026 | Pravien Laban | feat: build CLI conversation UI and wire in order-status/returns-refunds modules |
| Aug 14, 2026 | Kibet Forbes | docs: confirm chatbot framework/tech stack |
| Aug 14, 2026 | Kibet Forbes | docs: define the 2 ticket categories to handle |
| Aug 14, 2026 | Kibet Forbes | docs: write go-live readiness note |
| Aug 14, 2026 | Topister Were | feat: integrate order-status and returns-refunds into one session |
| Aug 14, 2026 | Topister Were | feat: add fallback for unrecognized questions |
| Aug 14, 2026 | Topister Were | docs: test full demo across both ticket categories |

## Board Activity
| Date | Task | Status Change | By |
|------|------|----------------|-----|
| Aug 12, 2026 | #1 Set up repo, invite team, initialize board | Todo → Done | Pravien Laban |
| Aug 13, 2026 | #4 Define intents/trigger phrases — Order status | Todo → Done | Morris Njeru |
| Aug 13, 2026 | #5 Build happy-path response logic — Order status | Todo → Done | Morris Njeru |
| Aug 13, 2026 | #6 Handle "no order found" edge case — Order status | Todo → Done | Morris Njeru |
| Aug 13, 2026 | #7 Define intents/trigger phrases — Returns & refunds | Todo → Done | Anne Mugunye |
| Aug 13, 2026 | #8 Build happy-path response logic — Returns & refunds | Todo → Done | Anne Mugunye |
| Aug 13, 2026 | #9 Handle ambiguous input edge case — Returns & refunds | Todo → Done | Anne Mugunye |
| Aug 14, 2026 | #12 Build basic conversation UI | In Progress → Done | Pravien Laban |
| Aug 14, 2026 | #2 Confirm chatbot framework/tech stack | Todo → Done | Kibet Forbes |
| Aug 14, 2026 | #3 Define the 2 ticket categories to handle | Todo → Done | Kibet Forbes |
| Aug 14, 2026 | #13 Write go-live readiness note | Todo → Done | Kibet Forbes |
| Aug 14, 2026 | #10 Integrate both categories into one bot session | Todo → Done | Topister Were |
| Aug 14, 2026 | #11 Add fallback for unrecognized questions | Todo → Done | Topister Were |
| Aug 14, 2026 | #14 Test full demo across both categories | Todo → Done | Topister Were |

## Review Notes
- All merged PRs went through code review before merging, per the Charter's review rule — no branch merged directly into main without at least one reviewer approval.
- Task #4 (Morris): approved as-is.
- Task #5 (Morris): approved as-is.
- Task #6 (Morris):  an unconfirmed filename case-sensitivity issue; both were flagged in review and fixed before merge.
- Task #8 (Anne): approved as-is, correctly matched the shared response interface.
- Task #9 (Anne): approved after confirming intent-check ordering handled overlapping edge cases correctly.
- Remaining task (#15 Export audit log): in progress — this file itself.
