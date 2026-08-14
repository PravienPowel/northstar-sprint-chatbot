// Northstar Support Deflection MVP — CLI chatbot entry point.
// Run with: node main.js
// Depends on orderStatus.js, returns.js — the 2 ticket categories built and wired this sprint.
// stock.js exists in the repo (category logic + mock lookup data) but is deliberately NOT
// wired into this menu — Stock Availability was scoped as a stretch goal and wasn't picked
// up this sprint. See the Go-Live Readiness Note for the exact next step to wire it in.

const readline = require("readline");
const { runOrderStatus } = require("./orderStatus");
const { runReturns } = require("./returns");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Uses the async-iterator form of readline rather than repeated rl.question() calls.
// rl.question() is known to drop answers when stdin is piped/non-interactive instead of
// a real terminal, because a 'line' event can fire before the next question() call attaches
// its listener. The async iterator buffers lines correctly regardless of timing.
const lineIterator = rl[Symbol.asyncIterator]();
function ask(prompt) {
  process.stdout.write(prompt);
  return lineIterator.next().then(res => (res.done ? "" : res.value));
}

function printMenu() {
  console.log("\n===================================");
  console.log(" Northstar Support Deflection — MVP");
  console.log("===================================");
  console.log("  1. Order status");
  console.log("  2. Returns & refunds");
  console.log("  0. Exit");
}

async function main() {
  console.log("Mock dataset · 5 sample orders · not connected to live Northstar systems");

  let running = true;
  while (running) {
    printMenu();
    const choice = await ask("\nChoose an option: ");

    switch (choice.trim()) {
      case "1":
        await runOrderStatus(ask);
        break;
      case "2":
        await runReturns(ask);
        break;
      case "0":
        console.log("\nGoodbye.");
        running = false;
        break;
      default:
        console.log("\nNot a valid option — choose 0, 1, or 2.");
    }
  }

  rl.close();
  process.exit(0);
}

main();
