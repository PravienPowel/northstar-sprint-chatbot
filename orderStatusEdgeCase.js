/**
 * Order Status — "No Order Found" Edge Case Handler
 * 
 * Task #6: Handle "no order found" edge case — Order status
 * Definition of Done: Bot returns a graceful fallback, not a crash
 */

const { detectIntent, extractOrderNumber } = require('./orderstatus');

const orders = {
  "ORD-78432": { customer: "John Mwangi", status: "In Transit", shipped: "August 10, 2026", eta: "August 14, 2026", tracking: "https://track.northstar.co/ORD-78432", items: "Nike Air Max (Size 42), White T-shirt (L)" },
  "ORD-78501": { customer: "Jane Achieng", status: "Delivered", shipped: "August 7, 2026", eta: "August 9, 2026", tracking: "https://track.northstar.co/ORD-78501", items: "Samsung Galaxy Buds, Phone Case" },
  "ORD-78599": { customer: "Peter Omondi", status: "Processing", shipped: null, eta: "August 16, 2026", tracking: null, items: "Laptop Stand, USB Cable, Mouse" }
};

function isValidOrderFormat(input) {
  return /^ORD-\d{5}$/i.test(input);
}

function getResponseSafe(userInput) {
  try {
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
    return {
      reply: "Oops! Something went wrong on our end. Don't worry, your order is safe.\n\n" +
             "Please try again, or type 'agent' to speak to a human who can help.",
      escalate: true
    };
  }
}

module.exports = { getResponseSafe, isValidOrderFormat };

