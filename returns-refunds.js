/**
 * Returns & Refunds — Happy-Path Response Logic
 *
 * This module handles customer questions about returns and refunds.
 * It takes the customer's message, figures out what they're asking,
 * and returns the correct response.
 *
 * Task #7: Define intents/trigger phrases — Returns & Refunds
 * (see returns-refunds-triggers.md for the full trigger-phrase list)
 *
 * Task #8: Build happy-path response logic — Returns & Refunds
 * Definition of Done: Bot returns correct answer for one test question
 *
 * Note: Ambiguous-input clarification (Task #9) is not handled here yet.
 */

// ============ MOCK DATA (fake returns/refunds for demo) ============
// No real Northstar policies, fees, or eligibility rules — generic
// status values only, same spirit as Morris's mock orders data.
const returns = {
  "RET-10293": {
    item: "Nike Air Max (Size 42)",
    status: "Return Approved"
  },
  "RET-10387": {
    item: "Samsung Galaxy Buds",
    status: "Refund Processing"
  },
  "RET-10420": {
    item: "Laptop Stand",
    status: "Refund Completed"
  }
};

// ============ INTENT MATCHING ============
/**
 * Figures out what the customer is asking about.
 * Returns the intent name or "unknown" if it can't tell.
 *
 * Three intents (see returns-refunds-triggers.md):
 *   - return_request: customer wants to send an item back
 *   - refund_status: customer is asking about a refund they're owed
 *   - out_of_scope: exchanges / wrong-item issues — hand off to a human
 */
function detectIntent(message) {
  // Convert to lowercase so matching works regardless of caps
  const msg = message.toLowerCase();

  // Out of scope / escalate (checked first — exchanges/wrong-item
  // should never be treated as a normal return request)
  if (msg.includes("exchange") ||
      msg.includes("wrong item") ||
      msg.includes("wrong product") ||
      msg.includes("wrong size")) {
    return "out_of_scope";
  }

  // Return request
  if (msg.includes("how do i return an item") ||
      msg.includes("want to return my order") ||
      msg.includes("can i return this product") ||
      msg.includes("how can i send this item back") ||
      msg.includes("return process") ||
      msg.includes("need to make a return") ||
      msg.includes("return")) {
    return "return_request";
  }

  // Refund status
  if (msg.includes("when will i get my refund") ||
      msg.includes("how long does a refund take") ||
      msg.includes("where is my refund") ||
      msg.includes("haven't received my refund") ||
      msg.includes("can i get a refund") ||
      msg.includes("how do refunds work") ||
      msg.includes("refund")) {
    return "refund_status";
  }

  return "unknown";
}

// ============ EXTRACT RETURN NUMBER ============
/**
 * Looks for a return/refund reference number (like RET-12345) in the message.
 * Returns the reference number or null if not found.
 */
function extractReturnNumber(message) {
  const match = message.match(/RET-\d{5}/i);
  return match ? match[0].toUpperCase() : null;
}

// ============ MAIN RESPONSE FUNCTION ============
/**
 * This is the function Topister's integration (Task #10) will call
 * for Returns & Refunds messages.
 *
 * Takes: user's message (string)
 * Returns: { reply: string, escalate: boolean, needsOrderNumber: boolean }
 */
function getResponse(userInput) {
  const intent = detectIntent(userInput);
  const returnNumber = extractReturnNumber(userInput);

  // ============ OUT OF SCOPE — hand off to a human ============
  if (intent === "out_of_scope") {
    return {
      reply: "That's something our support team needs to help with directly " +
             "(exchanges and wrong-item issues aren't handled by this bot yet). " +
             "I'll connect you to a support agent.",
      escalate: true,
      needsOrderNumber: false
    };
  }

  // ============ UNKNOWN — can't tell what they're asking ============
  if (intent === "unknown") {
    return {
      reply: "I'm sorry, I didn't quite understand that. I can help you with:\n" +
             "• Starting a return\n" +
             "• Checking a refund status\n\n" +
             "Try asking something like: \"How do I return an item?\" or " +
             "\"Where is my refund?\"",
      escalate: false,
      needsOrderNumber: false
    };
  }

  // ============ RETURN_REQUEST / REFUND_STATUS — need a reference number ============
  if (!returnNumber) {
    return {
      reply: "I'd be happy to help with that! Please provide your return or " +
             "refund reference number (e.g., RET-10293). You can find it in " +
             "your return confirmation email.",
      escalate: false,
      needsOrderNumber: true
    };
  }

  // Look up the return/refund in our records
  const record = returns[returnNumber];

  // If not found — this will be handled better in a future edge-case task
  if (!record) {
    return {
      reply: `I couldn't find ${returnNumber} in our system. ` +
             "Please double-check the reference number and try again.",
      escalate: false,
      needsOrderNumber: true
    };
  }

  // ============ HAPPY PATH RESPONSES ============
  // Reference number found — respond based on intent

  if (intent === "return_request") {
    return {
      reply: `Here's the update for ${returnNumber}:\n\n` +
             `Item: ${record.item}\n` +
             `Status: ${record.status}\n\n` +
             "Is there anything else I can help you with?",
      escalate: false,
      needsOrderNumber: false
    };
  }

  if (intent === "refund_status") {
    return {
      reply: `Here's the refund update for ${returnNumber}:\n\n` +
             `Item: ${record.item}\n` +
             `Status: ${record.status}\n\n` +
             "Is there anything else I can help you with?",
      escalate: false,
      needsOrderNumber: false
    };
  }

  // Fallback (shouldn't normally be reached)
  return {
    reply: "I'm not sure how to help with that. Let me connect you to a support agent.",
    escalate: true,
    needsOrderNumber: false
  };
}

// ============ EXPORT FOR USE BY CLI / INTEGRATION (Task #10) ============
module.exports = { getResponse, detectIntent, extractReturnNumber };

// ============ QUICK TEST ============
// Run this file directly to test: node returns-refunds.js
if (require.main === module) {
  console.log("=== Testing Returns & Refunds Bot ===\n");

  // Test 1: Happy path — return request with valid reference number
  const test1 = getResponse("How do I return an item? RET-10293");
  console.log("Test 1: 'How do I return an item? RET-10293'");
  console.log("Reply:", test1.reply);
  console.log("Escalate:", test1.escalate);
  console.log("\n---\n");

  // Test 2: Happy path — refund status with valid reference number
  const test2 = getResponse("Where is my refund? RET-10387");
  console.log("Test 2: 'Where is my refund? RET-10387'");
  console.log("Reply:", test2.reply);
  console.log("Escalate:", test2.escalate);
  console.log("\n---\n");

  // Test 3: No reference number provided
  const test3 = getResponse("I want to return my order.");
  console.log("Test 3: 'I want to return my order.' (no reference number)");
  console.log("Reply:", test3.reply);
  console.log("\n---\n");

  // Test 4: Out of scope — should escalate
  const test4 = getResponse("Can I exchange instead of return?");
  console.log("Test 4: 'Can I exchange instead of return?' (out of scope)");
  console.log("Reply:", test4.reply);
  console.log("Escalate:", test4.escalate);
  console.log("\n---\n");

  // Test 5: Unknown intent
  const test5 = getResponse("What's the weather today?");
  console.log("Test 5: 'What's the weather today?' (unknown)");
  console.log("Reply:", test5.reply);
  console.log("");
}
