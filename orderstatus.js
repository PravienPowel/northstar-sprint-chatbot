/**
 * Order Status — Happy-Path Response Logic
 * 
 * This module handles customer questions about order status.
 * It takes the customer's message, figures out what they're asking,
 * and returns the correct response.
 * 
 * Task #5: Build happy-path response logic — Order status
 * Definition of Done: Bot returns correct answer for one test question
 */

// ============ MOCK DATA (fake orders for demo) ============
const orders = {
  "ORD-78432": {
    customer: "John Mwangi",
    status: "In Transit",
    shipped: "August 10, 2026",
    eta: "August 14, 2026",
    tracking: "https://track.northstar.co/ORD-78432",
    items: "Nike Air Max (Size 42), White T-shirt (L)"
  },
  "ORD-78501": {
    customer: "Jane Achieng",
    status: "Delivered",
    shipped: "August 7, 2026",
    eta: "August 9, 2026",
    tracking: "https://track.northstar.co/ORD-78501",
    items: "Samsung Galaxy Buds, Phone Case"
  },
  "ORD-78599": {
    customer: "Peter Omondi",
    status: "Processing",
    shipped: null,
    eta: "August 16, 2026",
    tracking: null,
    items: "Laptop Stand, USB Cable, Mouse"
  }
};

// ============ INTENT MATCHING ============
/**
 * Figures out what the customer is asking about.
 * Returns the intent name or "unknown" if it can't tell.
 * 
 * Note: "Order status" and "Show me my order status" are handled
 * under the same intent (track_order) to avoid confusion — 
 * as flagged in Task #4 review.
 */
function detectIntent(message) {
  // Convert to lowercase so matching works regardless of caps
  const msg = message.toLowerCase();

  // Track order / general status (combined to avoid overlap — reviewer feedback)
  if (msg.includes("where is my order") || 
      msg.includes("track my order") || 
      msg.includes("track my package") || 
      msg.includes("order status") ||
      msg.includes("show me my order") ||
      msg.includes("check my order") ||
      msg.includes("order update")) {
    return "track_order";
  }

  // Shipping status
  if (msg.includes("has my order shipped") || 
      msg.includes("has it been dispatched") || 
      msg.includes("when will it ship") ||
      msg.includes("is my order on the way")) {
    return "shipping_status";
  }

  // Delivery time
  if (msg.includes("when will my order arrive") || 
      msg.includes("delivery date") || 
      msg.includes("how long until") ||
      msg.includes("expected delivery")) {
    return "delivery_time";
  }

  // Tracking number
  if (msg.includes("tracking number") || 
      msg.includes("tracking link") || 
      msg.includes("tracking info")) {
    return "tracking_number";
  }

  // Order late
  if (msg.includes("order is late") || 
      msg.includes("hasn't arrived") || 
      msg.includes("overdue") ||
      msg.includes("delayed") ||
      msg.includes("taking too long")) {
    return "order_late";
  }

  // Not received
  if (msg.includes("haven't received") || 
      msg.includes("never came") || 
      msg.includes("says delivered but") ||
      msg.includes("never got my order")) {
    return "not_received";
  }

  return "unknown";
}

// ============ EXTRACT ORDER NUMBER ============
/**
 * Looks for an order number (like ORD-12345) in the message.
 * Returns the order number or null if not found.
 */
function extractOrderNumber(message) {
  const match = message.match(/ORD-\d{5}/i);
  return match ? match[0].toUpperCase() : null;
}

// ============ MAIN RESPONSE FUNCTION ============
/**
 * This is the main function that the CLI (Task #12) will call.
 * 
 * Takes: user's message (string)
 * Returns: { reply: string, escalate: boolean, needsOrderNumber: boolean }
 */
function getResponse(userInput) {
  const intent = detectIntent(userInput);
  const orderNumber = extractOrderNumber(userInput);

  // If we don't understand the question
  if (intent === "unknown") {
    return {
      reply: "I'm sorry, I didn't quite understand that. I can help you with:\n" +
             "• Order tracking and status\n" +
             "• Shipping updates\n" +
             "• Delivery time estimates\n\n" +
             "Try asking something like: \"Where is my order ORD-78432?\"",
      escalate: false,
      needsOrderNumber: false
    };
  }

  // If we understand the intent but don't have an order number yet
  if (!orderNumber) {
    return {
      reply: "I'd be happy to help with your order! " +
             "Please provide your order number (e.g., ORD-78432). " +
             "You can find it in your confirmation email.",
      escalate: false,
      needsOrderNumber: true
    };
  }

  // Look up the order in our database
  const order = orders[orderNumber];

  // If order not found — this will be handled better in Task #6
  if (!order) {
    return {
      reply: `I couldn't find order ${orderNumber} in our system. ` +
             "Please double-check the number and try again.",
      escalate: false,
      needsOrderNumber: true
    };
  }

  // ============ HAPPY PATH RESPONSES ============
  // Order found — respond based on intent

  if (intent === "track_order" || intent === "shipping_status") {
    return {
      reply: `Here's the update for order ${orderNumber}:\n\n` +
             `Status: ${order.status}\n` +
             `Items: ${order.items}\n` +
             (order.shipped ? `Shipped on: ${order.shipped}\n` : "Not shipped yet.\n") +
             (order.eta ? `Estimated delivery: ${order.eta}\n` : "") +
             (order.tracking ? `Tracking link: ${order.tracking}\n` : "") +
             `\nIs there anything else I can help you with?`,
      escalate: false,
      needsOrderNumber: false
    };
  }

  if (intent === "delivery_time") {
    return {
      reply: order.eta 
        ? `Order ${orderNumber} is expected to arrive by ${order.eta}.\n` +
          (order.tracking ? `Track it here: ${order.tracking}` : "Tracking will be available once shipped.")
        : `Order ${orderNumber} is still being processed. We'll update you once it ships.`,
      escalate: false,
      needsOrderNumber: false
    };
  }

  if (intent === "tracking_number") {
    return {
      reply: order.tracking
        ? `Here's your tracking link for ${orderNumber}: ${order.tracking}`
        : `Order ${orderNumber} hasn't shipped yet, so tracking isn't available. ` +
          `Estimated ship date coming soon!`,
      escalate: false,
      needsOrderNumber: false
    };
  }

  if (intent === "order_late") {
    return {
      reply: `I'm sorry your order ${orderNumber} seems delayed.\n\n` +
             `Current status: ${order.status}\n` +
             (order.eta ? `Original ETA: ${order.eta}\n` : "") +
             `\nI've flagged this for our logistics team. Would you like to:\n` +
             `1. Get an email update when it moves\n` +
             `2. Speak to a support agent`,
      escalate: false,
      needsOrderNumber: false
    };
  }

  if (intent === "not_received") {
    return {
      reply: `I'm sorry to hear that! Our records show order ${orderNumber} ` +
             `status is: ${order.status}.\n\n` +
             `Please check:\n` +
             `• Your doorstep, porch, or mailbox\n` +
             `• With neighbours or building reception\n\n` +
             `Still can't find it? I'll connect you to our support team to investigate.`,
      escalate: true,
      needsOrderNumber: false
    };
  }

  // Fallback
  return {
    reply: "I'm not sure how to help with that. Let me connect you to a support agent.",
    escalate: true,
    needsOrderNumber: false
  };
}

// ============ EXPORT FOR USE BY CLI (Task #12) ============
module.exports = { getResponse, detectIntent, extractOrderNumber };

// ============ QUICK TEST ============
// Run this file directly to test: node orderStatus.js
if (require.main === module) {
  console.log("=== Testing Order Status Bot ===\n");

  // Test 1: Happy path — track order with valid order number
  const test1 = getResponse("Where is my order ORD-78432?");
  console.log("Test 1: 'Where is my order ORD-78432?'");
  console.log("Reply:", test1.reply);
  console.log("Escalate:", test1.escalate);
  console.log("\n---\n");

  // Test 2: No order number provided
  const test2 = getResponse("Where is my order?");
  console.log("Test 2: 'Where is my order?' (no order number)");
  console.log("Reply:", test2.reply);
  console.log("\n---\n");

  // Test 3: Unknown intent
  const test3 = getResponse("What's the weather today?");
  console.log("Test 3: 'What's the weather today?' (unknown)");
  console.log("Reply:", test3.reply);
  console.log("\n---\n");

  // Test 4: Delivery time
  const test4 = getResponse("When will my order arrive? ORD-78599");
  console.log("Test 4: 'When will my order arrive? ORD-78599'");
  console.log("Reply:", test4.reply);
  console.log("");
}