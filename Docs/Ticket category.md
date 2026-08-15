The Northstar Sprint — Individual Deliverable
Ticket Category Definitions
Purpose: the brief names 3 ticket categories but only gives 1-2 example questions each. Before anyone writes lookup logic, we need an explicit, shared definition of exactly which question variants are in scope, what a correct answer must contain, and what's explicitly out — otherwise two teammates building two categories will make different, incompatible assumptions about how much the tool is supposed to handle. Revision note: content below is unchanged from the web-UI version — what counts as a correct answer doesn't depend on whether it's shown in a browser or printed to a terminal.
1. Order Status
“Where is my order?” / “Has this shipped yet?”
Question variant	What the answer must include	In/Out of scope
“Where is my order?”	Current status (Processing / Shipped / Delivered), item name, and either an ETA (not yet shipped) or carrier + expected delivery date (shipped).	In scope
“Has this shipped yet?”	A direct yes/no plus the same status detail as above — don't make the customer infer shipped-or-not from a status word alone.	In scope
“Why is my order late?”	Requires a delay reason field we don't have in the mock data.	Out of scope for MVP — flag in go-live note
“Can I change my shipping address?”	Requires a write action, not a lookup.	Out of scope — different feature entirely
2. Returns & Refunds
“How do I return this?” / “When will I get my refund?”
Question variant	What the answer must include	In/Out of scope
“How do I return this?”	Eligibility (yes/no) based on the return window, and if eligible, the exact date the window closes.	In scope
“When will I get my refund?”	Only answerable if eligible; states the refund timeline after the item is received back, not from today's date.	In scope
“Can I exchange instead of return?”	Requires inventory-hold logic we haven't built.	Out of scope for MVP
“I received the wrong item”	This is a service-recovery case, not a standard eligibility check — different handling entirely.	Out of scope — route to human
3. Stock Availability
“Is this back in stock?” / “Do you have this in a different size?”
Question variant	What the answer must include	In/Out of scope
“Is this back in stock?”	A direct yes/no for the specific item + variant asked about, not just the item in general.	In scope
“Do you have this in a different size/color?”	Same lookup, different variant — must let the customer pick a variant, not just confirm the one they already have.	In scope
“When will it be back in stock?”	Requires a restock-date field we don't have.	Out of scope for MVP
“Can you notify me when it's back?”	Requires storing a customer's contact info — a write action, not a lookup.	Out of scope — stretch goal for post-MVP
4. Shared Rules Across All 3 Categories
•	- Every answer must state a concrete fact (a date, a yes/no, a status) printed as plain text to the terminal — never a vague reassurance like "your order is on its way" with no specifics, and never a raw object or error trace.
•	If the input (order ID, email, item) doesn't match any record, say so plainly and explain the limitation (mock dataset), rather than crashing or failing silently.
•	Per the brief, the MVP only needs 2 of the 3 categories fully working end-to-end — Order Status and Returns & Refunds are the two committed to for this sprint; Stock Availability is a stretch goal if time allows.
•	Anything marked “Out of scope” above goes in the go-live note's known-limitations section, not silently dropped.
