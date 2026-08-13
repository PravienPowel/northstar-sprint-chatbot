
// Northstar Support Bot — CLI (Task #12)
// Owner: Pravien Laban

const readline = require("readline");

// --------------------------------------------
// PLACEHOLDER: Morris's order-status logic (Task #5)
// Replace this with Morris's real function once it's ready.
// It should take the user's text and return a reply string.
// --------------------------------------------
function getOrderStatusReply(userInput) {
  return "[PLACEHOLDER] Order-status reply for: " + userInput;
}

// --------------------------------------------
// PLACEHOLDER: Anne's returns & refunds logic (Task #8)
// Replace this with Anne's real function once it's ready.
// Same shape: takes user's text, returns a reply string.
// --------------------------------------------
function getRefundsReply(userInput) {
  return "[PLACEHOLDER] Refunds reply for: " + userInput;
}

// --------------------------------------------
// PLACEHOLDER: Topister's routing/integration logic (Task #10)
// For now, this does a very simple keyword check to decide
// which category to call. Topister will replace this with
// the real routing logic once both functions above are ready.
// --------------------------------------------
function getBotReply(userInput) {
  const text = userInput.toLowerCase();

  if (text.includes("order") || text.includes("ship") || text.includes("track")) {
    return getOrderStatusReply(userInput);
  }

  if (text.includes("return") || text.includes("refund")) {
    return getRefundsReply(userInput);
  }

  // Fallback for anything that doesn't match either category
  return "Sorry, I didn't understand that. Try asking about your order status, or a return/refund.";
}

// --------------------------------------------
// CLI loop — this is the actual Task #12 work.
// Repeatedly asks for input, prints the bot's reply, until user exits.
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
      console.log("Bot: Goodbye! 👋");
      rl.close();
      return;
    }

    const reply = getBotReply(userInput);
    console.log("Bot: " + reply);

    askQuestion(); // loop again
  });
}

askQuestion();
