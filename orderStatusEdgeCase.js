
/**
 * Order Status — "No Order Found" Edge Case Handler
 * 
 * Task #6: Handle "no order found" edge case — Order status
 * Definition of Done: Bot returns a graceful fallback, not a crash
 * 
 * This module adds graceful error handling so the bot never crashes,
 * even when given bad input, empty input, or invalid order numbers.
 */

const { detectIntent, extractOrderNumber } = require('./orderstatus');

// Mock database (same as Task #5)
const orders = {
  "ORD-78432": { customer: "John Mwangi", status: "In Transit", shipped: "August 10, 2026", eta: "August 14, 2026", tracking: "https://track.northstar.co/ORD-78432", items: "Nike Air Max (Size 42), White T-shirt (L)" },
  "ORD-78501": { customer: "Jane Achieng", status: "Delivered", shipped: "August 7, 2026", eta: "August 9, 2026", tracking: "https://track.northstar.co/ORD-78501", items: "Samsung Galaxy Buds, Phone Case" },
  "ORD-78599": { customer: "Peter Omondi", status: "Processing", shipped: null, eta: "August 16, 2026", tracking: null, items: "Laptop Stand, USB Cable, Mouse" }
};

/**
 * Validates the format of an order number.
 * Valid format: ORD- followed by exactly 5 digits (e.g., ORD-12345)
 */
function isValidOrderFormat(input) {
  return /^ORD-\d{5}$/i.test(input);
}

/**
 * Enhanced getResponse with full edge-case handling.
 * Handles: empty input, null input, invalid format, order not found,
 * and any unexpected errors (try-catch so it NEVER crashes).
 */
function getResponseSafe(userInput) {
  try {
    // Edge case: empty, null, or undefined input
    if (!userInput || userInput.trim() === "") {
      return {
        reply: "It looks like you didn't type anything. How can I help you?\n\n" +
               "You can ask me things like:\n" +
               '• "Where is my order ORD-78432?"\n' +
               '• "When will my order arrive?"\n' +
               '• "I need my tracking number"',
        escalate: false
      };
    }

    const intent = detectIntent(userInput);
    const orderNumber = extractOrderNumber(userInput);

    // Edge case: can't understand what they're asking
    if (intent === "unknown") {
      return {
        reply: "I'm sorry, I didn't quite understand that. I can help you with:\n" +
               "• Order tracking and status\n" +
               "• Shipping and delivery updates\n" +
               "• Tracking numbers\n\n" +
               'Try asking something like: "Where is my order ORD-78432?"\n\n' +
               "Or type 'agent' to speak to a human.",
        escalate: false
      };
    }

    // Edge case: no order number provided
    if (!orderNumber) {
      return {
        reply: "I'd be happy to help! Please provide your order number.\n\n" +
               "It looks like ORD-XXXXX (5 digits) and you can find it in:\n" +
"• Your order confirmation email\n" +
               "• Your account order history\n\n" +
               "Example: ORD-78432",
        escalate: false
      };
    }

    // Edge case: order number format looks wrong
    if (!isValidOrderFormat(orderNumber)) {
      return {
        reply: `"${orderNumber}" doesn't look like a valid order number.\n\n` +
               "Our order numbers follow this format: ORD-XXXXX\n" +
               "(ORD- followed by exactly 5 digits)\n\n" +
               "Example: ORD-78432\n" +
               "Please check your confirmation email and try again.",
        escalate: false
      };
    }

    // Edge case: ORDER NOT FOUND (the main one for this task)
    const order = orders[orderNumber];
    if (!order) {
      return {
        reply: `I couldn't find order ${orderNumber} in our system.\n\n` +
               "This could mean:\n" +
               "• The order number might have a typo\n" +
               "• The order may have been placed with a different account\n" +
               "• It may be too old (orders older than 6 months are archived)\n\n" +
               "Would you like to:\n" +
               "1. Try a different order number\n" +
               "2. Search by email address instead\n" +
               "3. Talk to a support agent\n\n" +
               "Type 'agent' anytime to connect to a human.",
        escalate: false
      };
    }

    // If order IS found, return the normal happy-path response
    return {
      reply: `Here's the update for order ${orderNumber}:\n\n` +
             `Status: ${order.status}\n` +
             `Items: ${order.items}\n` +
             (order.shipped ? `Shipped on: ${order.shipped}\n` : "Not shipped yet.\n") +
             (order.eta ? `Estimated delivery: ${order.eta}\n` : "") +
             (order.tracking ? `Tracking link: ${order.tracking}\n` : "") +
             "\nIs there anything else I can help you with?",
      escalate: false
    };

  } catch (error) {
    // SAFETY NET: if anything unexpected goes wrong, don't crash
    return {
      reply: "Oops! Something went wrong on our end. Don't worry, your order is safe.\n\n" +
             "Please try again, or type 'agent' to speak to a human who can help.",
      escalate: true
    };
  }
}

module.exports = { getResponseSafe, isValidOrderFormat };

// ============ TESTS ============
if (require.main === module) {
  console.log("=== Testing Edge Cases ===\n");

  // Test 1: Empty input (should NOT crash)
  console.log("Test 1: Empty input");
  console.log(getResponseSafe("").reply);
  console.log("\n---\n");

  // Test 2: Null input (should NOT crash)
  console.log("Test 2: Null input");
  console.log(getResponseSafe(null).reply);
  console.log("\n---\n");

  // Test 3: Order not found
  console.log("Test 3: 'Where is my order ORD-99999?'");
  console.log(getResponseSafe("Where is my order ORD-99999?").reply);
  console.log("\n---\n");

  // Test 4: Random gibberish (should NOT crash)
  console.log("Test 4: Random gibberish");
  console.log(getResponseSafe("asjkdhaskjdh").reply);
  console.log("\n---\n");

  // Test 5: Valid order (happy path still works)
  console.log("Test 5: Valid order ORD-78432");
  console.log(getResponseSafe("Where is my order ORD-78432?").reply);
}

---

