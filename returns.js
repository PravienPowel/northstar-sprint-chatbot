// Returns & Refunds category — "How do I return this?" / "When will I get my refund?"
// Maps to Project Board T05 (question-flow design) and T06 (eligibility + refund logic).

const { findOrder } = require("./lookup");

async function runReturns(ask) {
  console.log("\n--- Returns & Refunds ---");
  console.log('"How do I return this?" / "When will I get my refund?"');
  console.log("Try NS-10023 (eligible) or NS-10024 (window closed)\n");

  const input = await ask("Order ID or email: ");
  const o = findOrder(input);

  if (!o) {
    console.log("\nNot found — we couldn't match that order against our sample records.\n");
    return;
  }

  if (o.returnEligible) {
    console.log(`\nEligible for return`);
    console.log(`${o.item} can be returned until ${o.returnWindowEnds}.`);
    console.log(`Once we receive the item, refunds land in ${o.refundDays}.\n`);
  } else {
    console.log(`\nNot eligible`);
    const reason = o.returnWindowEnds
      ? o.returnWindowEnds
      : "is still processing and hasn't shipped yet, so a return can't be started";
    console.log(`${o.item} ${reason}.\n`);
  }
}

module.exports = { runReturns };
