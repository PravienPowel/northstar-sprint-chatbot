# Returns & Refunds — Trigger Phrases / Intents

## Intent 1: Return Request
- "How do I return an item?"
- "I want to return my order."
- "Can I return this product?"
- "How can I send this item back?"
- "What is your return process?"
- "I need to make a return."

## Intent 2: Refund Status
- "When will I get my refund?"
- "How long does a refund take?"
- "Where is my refund?"
- "I haven't received my refund."
- "Can I get a refund?"
- "How do refunds work?"

## Intent 3: Out of Scope / Escalate
- "Can I exchange instead of return?"
- "I received the wrong item."
- "Can you exchange this for a different size?"
- "I got sent the wrong product."

Per Kibet's category definitions doc, these fall outside Returns & Refunds
scope. They should be recognized and routed to a human rather than treated
as a normal return request. (Response/escalation handling itself is out of
scope for Task #7 — this list only defines the trigger phrases.)
