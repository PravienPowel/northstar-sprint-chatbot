// ============================================
// Northstar Support Bot — CLI (Task #12)
// Owner: Pravien Laban
// ============================================
// This is the terminal interface for the chatbot. It does not contain
// the "brain" logic itself — that lives in Morris's order-status module
// and Anne's returns/refunds module, imported below.
//
// BotResponse shape (enforced by all modules, see makeResponse below):
//   {
//     reply: string,            // required
//     escalate: boolean,        // required
//     needsOrderNumber: boolean // always present, defaults to false
//   }

const readline = require("readline");

// --------------------------------------------
// Helper: builds a response that always conforms to the shared shape,
// even if a module only supplies some of the fields.
// --------------------------------------------
function makeResponse({ reply, escalate = false, needsOrderNumber = false }) {
  return { reply, escalate, needsOrderNumber };
}

// --------------------------------------------
// Import Morris's order-status logic (Task #5/#6)
// --------------------------------------------
let orderStatus;
try {
  orderStatus = require("./orderstatus.js");
} catch (err) {
  console.warn("[Warning] Could not load orderstatus.js — using placeholder. " +
               "Check the filename matches what Morris committed.");
  orderStatus = {
    getResponse: (userInput) =>
      makeResponse({ reply: "[PLACEHOLDER] Order-status reply for: " + userInput }),
  };
}

// --------------------------------------------
// Import Anne's returns & refunds logic (Task #7/#8/#9)
// --------------------------------------------
let returnsRefunds;
try {
  returnsRefunds = require("./returns-refunds.js");
} catch (err) {
  console.warn("[Warning] Could not load returns-refunds.js — using placeholder. " +
               "Check the filename matches what Anne committed.");
  returnsRefunds = {
    getResponse: (userInput) =>
      makeResponse({ reply: "[PLACEHOLDER] Refunds reply for: " + userInput }),
  };
}

// --------------------------------------------
// Routing logic (Task #10 territory — simple version for now).
// Uses word-boundary regex instead of plain substring matching,
// so "border", "shipwreck", etc. don't falsely match.
// --------------------------------------------
const ORDER_PATTERN = /\b(order|ship|shipped|shipping|track|tracking|deliver|delivery)\b/i;
const RETURN_PATTERN = /\b(return|refund|exchange)\b/i;

function getBotResponse(userInput) {
  const looksLikeOrder = ORDER_PATTERN.test(userInput);
  const looksLikeReturn = RETURN_PATTERN.test(userInput);

  if (looksLikeOrder && !looksLikeReturn) {
    return orderStatus.getResponse(userInput);
  }

  if (looksLikeReturn && !looksLikeOrder) {
    return returnsRefunds.getResponse(userInput);
  }

  // Ambiguous (matches both or neither) — single, clear fallback message.
  return makeResponse({
    reply: "I can help with order status, or returns & refunds. " +
           "Could you tell me which one you're asking about?",
  });
}

// --------------------------------------------
// CLI loop — the actual Task #12 deliverable.
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
