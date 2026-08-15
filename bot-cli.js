// ============================================
// Northstar Support Bot — CLI (Task #12)
// Owner: Pravien Laban
// Routing integration: Topister (Task #10/#11)
// ============================================
// Terminal interface for the chatbot. Real logic lives in Morris's
// order-status modules and Anne's returns/refunds module, imported below.
//
// BotResponse shape (enforced via makeResponse):
//   { reply: string, escalate: boolean, needsOrderNumber: boolean }

const readline = require("readline");

function makeResponse({ reply, escalate = false, needsOrderNumber = false }) {
  return { reply, escalate, needsOrderNumber };
}

// --------------------------------------------
// Import Morris's edge-case-hardened order-status logic (Task #6).
// Falls back to the base order-status module (Task #5) if the
// edge-case file isn't available, then to a placeholder as a last resort.
// --------------------------------------------
let orderStatusEdge = null;
try {
  orderStatusEdge = require("./orderStatusEdgeCase.js");
} catch (err) {
  console.warn("[Warning] Could not load orderStatusEdgeCase.js — using base order-status logic instead.");
}

let orderStatusBase;
try {
  orderStatusBase = require("./orderstatus.js");
} catch (err) {
  console.warn("[Warning] Could not load orderstatus.js — using placeholder.");
  orderStatusBase = {
    getResponse: (userInput) =>
      makeResponse({ reply: "[PLACEHOLDER] Order-status reply for: " + userInput }),
  };
}

const orderStatus = {
  getResponse: (userInput) =>
    orderStatusEdge
      ? makeResponse(orderStatusEdge.getResponseSafe(userInput))
      : makeResponse(orderStatusBase.getResponse(userInput)),
};

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
// Return/refund checked first so overlapping phrases like
// "How do I return my order?" go to returns-refunds, not order-status.
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
