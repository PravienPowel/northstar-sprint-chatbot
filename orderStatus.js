// Order Status category — "Where is my order?" / "Has this shipped yet?"
// Maps to Project Board T03 (question-flow design) and T04 (lookup logic).

const { findOrder } = require("./lookup");

// ask: a promise-returning function (see main.js) that prompts the terminal and resolves with the typed answer.
async function runOrderStatus(ask) {
  console.log('\n--- Order Status ---');
  console.log('"Where is my order?" / "Has this shipped yet?"');
  console.log("Try NS-10021, NS-10022, or marcus.b@example.com\n");

  const input = await ask("Order ID or email: ");
  const o = findOrder(input);

  if (!o) {
    console.log("\nNot found — we couldn't match that order ID or email against our sample records.");
    console.log("In production this routes to a live order lookup; here it's limited to 5 seeded orders.\n");
    return;
  }

  console.log(`\n${o.status}`);
  console.log(`${o.item} — placed ${o.placed}`);
  if (o.carrier) {
    console.log(`Shipping via ${o.carrier}, expected ${o.eta}.\n`);
  } else {
    console.log(`Still being prepared — expected to ship by ${o.eta}.\n`);
  }
}

module.exports = { runOrderStatus };
