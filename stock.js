// Stock Availability category — "Is this back in stock?" / "Do you have another size?"
// Maps to Project Board T07 (question-flow design) and T08 (lookup logic).
// This is the 3rd ticket type — stretch goal once Order Status + Returns are solid,
// since the assignment only requires 2 of 3 categories covered end-to-end.

const { STOCK } = require("./data");

async function runStock(ask) {
  console.log("\n--- Stock Availability ---");
  console.log('"Is this back in stock?" / "Do you have this in a different size?"\n');

  const items = Object.keys(STOCK);
  items.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
  const itemChoice = await ask("\nSelect an item (number): ");
  const item = items[parseInt(itemChoice, 10) - 1];

  if (!item) {
    console.log("\nThat wasn't one of the listed options.\n");
    return;
  }

  const variants = Object.keys(STOCK[item]);
  variants.forEach((v, i) => console.log(`  ${i + 1}. ${v}`));
  const variantChoice = await ask("\nSelect a variant (number): ");
  const variant = variants[parseInt(variantChoice, 10) - 1];

  if (!variant) {
    console.log("\nThat wasn't one of the listed options.\n");
    return;
  }

  const inStock = STOCK[item][variant];
  if (inStock) {
    console.log(`\nIn stock — ${item} (${variant}) is available now.\n`);
  } else {
    console.log(`\nOut of stock — ${item} (${variant}) is currently unavailable.`);
    console.log("This is where a restock-notify flow would plug in.\n");
  }
}

module.exports = { runStock };
