// Northstar Support Bot — CLI (Task #12)
// Owner: Pravien Laban
// ============================================
// This is the terminal interface for the chatbot. It does not contain
// the "brain" logic itself — that lives in Morris's order-status module
// and Anne's returns/refunds module, imported below.
//
// Both modules export getResponse(userInput) and return the same shape:
//   { reply: string, escalate: boolean, needsOrderNumber: boolean }
// This shared shape is what makes it possible to plug both in here
// using one consistent pattern.
 
const readline = require("readline");
 
// --------------------------------------------
// Import Morris's order-status logic (Task #5/#6)
// File name must match exactly what's committed in the repo.
// --------------------------------------------
let orderStatus;
try {
  orderStatus = require("./orderstatus.js");
} catch (err) {
  console.warn("[Warning] Could not load orderstatus.js — using placeholder. " +
               "Check the filename matches what Morris committed.");
  orderStatus = {
    getResponse: (userInput) => ({
      reply: "[PLACEHOLDER] Order-status reply for: " + userInput,
      escalate: false,
      needsOrderNumber: false,
    }),
  };
}
 
// --------------------------------------------
// Import Anne's returns & refunds logic (Task #7/#8/#9)
// File name must match exactly what's committed in the repo.
// --------------------------------------------
let returnsRefunds;
try {
  returnsRefunds = require("./returns-refunds.js");
} catch (err) {
  console.warn("[Warning] Could not load returns-refunds.js — using placeholder. " +
               "Check the filename matches what Anne committed.");
  returnsRefunds = {
    getResponse: (userInput) => ({
      reply: "[PLACEHOLDER] Refunds reply for: " + userInput,
      escalate: false,
      needsOrderNumber: false,
    }),
  };
}
 
// --------------------------------------------
// Routing logic (Task #10 territory — simple version for now).
// Decides which module should handle the message, based on keywords.
// Topister may replace this with smarter routing later.
// --------------------------------------------
function getBotResponse(userInput) {
  const text = userInput.toLowerCase();
 
  const looksLikeOrder = text.includes("order") || text.includes("ship") ||
                         text.includes("track") || text.includes("deliver");
  const looksLikeReturn = text.includes("return") || text.includes("refund") ||
                          text.includes("exchange");
 
  if (looksLikeOrder && !looksLikeReturn) {
    return orderStatus.getResponse(userInput);
  }
 
  if (looksLikeReturn && !looksLikeOrder) {
    return returnsRefunds.getResponse(userInput);
  }
 
  // Ambiguous between the two categories, or matches neither —
  // fall back to a generic clarifying message.
  return {
    reply: "I can help with order status, or returns & refunds. " +
           "Could you tell me which one you're asking about?",
    escalate: false,
    needsOrderNumber: false,
  };
}
 
// --------------------------------------------
// CLI loop — the actual Task #12 deliverable.
// Repeatedly reads terminal input, prints the bot's reply, until exit.
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
 
    askQuestion(); // loop again
  });
}
 
askQuestion();
