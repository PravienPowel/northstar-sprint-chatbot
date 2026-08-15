// ============================================
// Northstar Support Bot — CLI (Task #12)
// Owner: Pravien Laban
// Routing integration: Topister (Task #10/#11)
// ============================================
// Terminal interface for the chatbot. Real logic lives in Morris's
// order-status module and Anne's returns/refunds module, imported below.
//
// BotResponse shape (enforced via makeResponse):
//   { reply: string, escalate: boolean, needsOrderNumber: boolean }

const readline = require("readline");

// --------------------------------------------
// Helper: guarantees every response has the full shared shape.
// --------------------------------------------
function makeResponse({ reply, escalate = false, needsOrderNumber = false }) {
  return { reply, escalate, needsOrderNumber };
}

// --------------------------------------------
// Import Morris's real order-status logic (Task #5/#6)
// --------------------------------------------
let orderStatus;
try {
  orderStatus = require("./orderstatus.js");
} catch (err) {
  console.warn("[Warning] Could not load orderstatus.js — using placeholder.");
  orderStatus = {
    getResponse: (userInput) =>
      makeResponse({ reply: "[PLACEHOLDER] Order-status reply for: " + userInput }),
  };
}

// --------------------------------------------
// Import Anne's real returns & refunds logic (Task #7/#8/#9)
// --------------------------------------------
let returnsRefunds;
try {
  returnsRefunds = require("./returns-refunds.js");
} catch (err) {
  console.warn("[Warning] Could not load returns-refunds.js — using placeholder.");
  returnsRefunds = {
    getResponse: (userInput) =>
      makeResponse({ reply: "[PLACEHOLDER] Refunds reply for: " + userInput }),
  };
}

// --------------------------------------------
// Routing logic (Task #10/#11 — Topister).
// Word-boundary regex avoids false positives (e.g. "border" != "order").
// Return/refund is checked FIRST so overlapping phrases like
// "How do I return my order?" correctly go to returns-refunds,
// not order-status.
// --------------------------------------------
const RETURN_PATTERN = /\b(return|refund|exchange)\b/i;
const ORDER_PATTERN = /\b(order|ship|shipped|shipping|track|tracking|deliver|delivery)\b/i;

function getBotResponse(userInput) {
  const looksLikeReturn = RETURN_PATTERN.test(userInput);
  const looksLikeOrder = ORDER_PATTERN.test(userInput);

  if (looksLikeReturn) {
    return returnsRefunds.getResponse(userInput);
  }

  if (looksLikeOrder) {
    return orderStatus.getResponse(userInput);
  }

  // Matches neither — escalate to a human rather than guess (Task #11).
  return makeResponse({
    reply: "I'm not able to help with that here. I'm connecting you with a " +
           "member of our support team who can assist further.",
    escalate: true,
  });
}

// --------------------------------------------
// CLI loop — Task #12 deliverable.
// --------------------------------------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("=================================================");
console.log(" Northstar Support Bot (CLI)");
console.log(" Ask about your order status, or returns/refunds.");
console.log(" Type 'exit' or 'quit' to stop.");
console.log("=================================================");

function askQuestion() {
  rl.question("\nYou: ", (userInput) => {
    const trimmed = userInput.trim().toLowerCase();

    if (trimmed === "exit" || trimmed === "quit") {
      console.log("Bot: Goodbye!");
      rl.close();
      return;
    }

    const response = getBotResponse(userInput);
    console.log("Bot: " + response.reply);

    if (response.escalate) {
      console.log("[This conversation would be escalated to a human agent.]");
    }

    askQuestion();
  });
}

askQuestion();
