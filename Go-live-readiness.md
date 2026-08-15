The Northstar Sprint — Go-Live Readiness Note
Support Deflection MVP (Node.js CLI chatbot). Replaces an earlier browser-based concept; team built a CLI instead.
How to run it
No install beyond Node.js. In the project folder, run: node bot-cli.js
Example questions that work
The bot matches specific phrases, not free-form language yet — use these as a demo script:
Order status: "where is my order ORD-78432", "track my order ORD-78432", "has my order shipped ORD-78432", "when will my order arrive ORD-78432", "tracking number ORD-78432"
Returns & refunds: any phrase containing "return" or "refund" works, e.g. "how do I return an item RET-10293", "when will I get my refund RET-10293"
What works today
Ticket type	Status	Owner
Order status	Working end-to-end for the phrasings above. Looks up 3 mock orders (ORD-XXXXX). Handles empty input, bad format, and not-found cases.	Morris
Returns & refunds	Working end-to-end, more flexible phrasing. Looks up 3 mock records (RET-XXXXX). Escalates exchanges/wrong-item; asks for clarification on ambiguous input.	Anne
Stock availability	Not built — scoped as a stretch goal; team prioritized the other two categories.	Kibet
Known-broken / out of scope
• Order-status matching uses fixed phrases, not free-form language — rewordings outside the demo script above may return "I didn't understand." Returns/refunds is more flexible (matches any phrase with "return"/"refund").
• Stock availability not built. Dataset is mocked, hardcoded — not connected to real Northstar systems.
• No authentication, no logging, single-session only, no shared backend.
For Northstar's team to pick this up
1. Confirm Node.js is installed (node --version).
2. Widen order-status matching to catch more phrasings (Anne's returns-refunds.js already does this — same pattern can be reused).
3. Replace mock data with real order/inventory data; add authentication before using real customer data.
4. To add stock availability: build stockAvailability.js following the same getResponse() pattern, then wire it into bot-cli.js's routing.
Primary contact: Pravien Laban (team lead).

