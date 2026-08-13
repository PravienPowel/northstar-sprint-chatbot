// ============================================
// Northstar Support Bot — CLI (Task #12)
// Owner: Pravien Laban
// ============================================

//
// UPDATED: now follows Morris's real interface —
// getResponse(userInput) returns an object:
//   { reply: string, escalate: boolean, needsOrderNumber: boolean }
// instead of a plain string. Anne's refunds logic will follow
// the same shape.

const readline = require("readline");

// --------------------------------------------
// Morris's order-status logic (Task #5)
// Once his PR is merged, replace this placeholder with:
//   const { getResponse: getOrderStatusResponse } = require("./orderStatus.js");
// For now, using a placeholder that mimics his real return shape.
// --------------------------------------------
const { getResponse: getOrderStatusResponse } = require("./orderstatus.js");

// --------------------------------------------
// PLACEHOLDER: Anne's returns & refunds logic (Task #8)
// Replace this with Anne's real function once it's ready.
// Anne has agreed to follow the same return shape as Morris:
//   { reply: string, escalate: boolean, ... }
// --------------------------------------------
function getRefundsResponse(userInput) {
  return {
    reply: "[PLACEHOLDER] Refunds reply for: " + userInput,
    escalate: false,
  };
}

// --------------------------------------------
// PLACEHOLDER: Topister's routing/integration logic (Task #10)
// Simple keyword check for now — Topister will replace this with
// the real routing logic once both functions above are ready.
// Now returns the full object, not just a string.
// --------------------------------------------
function getBotResponse(userInput) {
  const text = userInput.toLowerCase();

 if (text.includes("return") || text.includes("refund")) {
  return getRefundsResponse(userInput);
}

if (text.includes("order") || text.includes("ship") || text.includes("track")) {
  return getOrderStatusResponse(userInput);
}

  // Fallback for anything that doesn't match either category
 return {
  reply: "I'm not able to help with that here. I'm connecting you with a member of our support team who can assist further.",
  escalate: true,
  needsOrderNumber: false,
  };
}
// --------------------------------------------
// CLI loop — this is the actual Task #12 work.
// Repeatedly asks for input, prints the bot's reply, until user exits.
// Now reads the .reply field from the response object, and shows
// a note if the bot flagged escalate: true.
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

    // If the bot logic flagged this as needing human handoff, show that too
    if (response.escalate) {
      console.log("[This conversation would be escalated to a human agent.]");
    }

    askQuestion(); // loop again
  });
}

askQuestion();
