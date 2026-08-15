The Northstar Sprint — Individual Deliverable
Chatbot Framework Confirmation

Revision note: this document originally described a browser-based decision-tree UI. The team has since built and shipped a command-line (CLI) chatbot instead. This version reflects what was actually built.

1. Decision
We built a free-text, natural-language CLI chatbot: the customer types a question in plain English (e.g. "where is my order ORD-78432"), and the bot detects intent by keyword/phrase matching, then returns a formatted answer directly in the terminal. No menu selection — the customer doesn't pick a numbered category first.

2. Why This Approach
Given a 5-day sprint with a beginner team new to GitHub, a CLI (vs. a hosted web page) removed the need for HTML/CSS layout work, browser testing, or deployment/hosting — letting the team focus effort on the actual intent-detection and response logic, which is what the brief's evaluation criteria actually grade.

3. Technical Specification (what's actually in the repo)
Stack: plain Node.js (built-in "readline" module only) — no framework, no build step, no browser, no external dependencies.
Files: bot-cli.js (terminal interface + routing), orderstatus.js (Order Status intent detection + responses), returns-refunds.js (Returns & Refunds intent detection + responses). One file per ticket category, so categories were built and committed independently without merge conflicts.
Shared response shape: every category module exports getResponse(userInput) and returns { reply: string, escalate: boolean, needsOrderNumber: boolean } — this consistent shape is what lets bot-cli.js call either module the same way.
State: everything runs in-memory using hardcoded mock data. No login, no database, no persistence between runs — a known limitation, covered in the go-live note.

4. What This Confirms for Teammates Building Ticket Logic
Each ticket category is a self-contained module exporting getResponse(userInput), returning the shared response shape above. New categories should follow this same pattern — one file, one getResponse function, same return shape — rather than introducing a different interaction style.

5. Sign-Off
Confirmed by: Kibet Forbes, on behalf of the team.
Reviewed/agreed by team on: _______________________________________________
