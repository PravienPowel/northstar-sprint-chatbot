# Audit Log — Northstar Sprint

This log tracks team activity: commits and board movement, mapped to tasks.
Updated regularly through the sprint, finalized on Day 5.

## Commits
| Date | Author | Commit Message |
|------|--------|-----------------|
| Aug 12, 2026 | Pravien Laban | Initial commit |
| Aug 13, 2026 | Pravien Laban | docs: add team charter - establishes norms and conventions |
| Aug 13, 2026 | Morris Njeru | feat: define order-status trigger phrases |
| Aug 13, 2026 | Morris Njeru | feat: add order-status happy-path response logic |
| Aug 13, 2026 | Morris Njeru | feat: add graceful fallback for order-not-found edge case |
| Aug 13, 2026 | Anne Mugunye | feat: define returns & refunds trigger phrases |
| Aug 13, 2026 | Anne Mugunye | feat: add returns & refunds happy-path response logic |
| Aug 13, 2026 | Anne Mugunye | feat: handle ambiguous input edge case - returns & refunds |
| Aug 13, 2026 | Pravien Laban | feat: build CLI conversation UI and wire in order-status/returns-refunds modules |

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
| Aug 13, 2026 | #12 Build basic conversation UI | Todo → In Progress | Pravien Laban |

## Review Notes
- All merged PRs went through code review before merging, per the Charter's review rule — no branch merged directly into main without at least one reviewer approval.
- Task #4 (Morris): approved as-is.
- Task #5 (Morris): approved as-is.
- Task #6 (Morris): an unconfirmed filename case-sensitivity issue; was flagged in review and fixed before merge.
- Task #8 (Anne): approved as-is, correctly matched the shared response interface.
- Task #9 (Anne): approved after confirming intent-check ordering handled overlapping edge cases correctly.
- Task #12 (Pravien): open, pending review from teammate.
