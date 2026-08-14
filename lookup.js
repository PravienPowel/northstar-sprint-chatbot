// Shared order lookup, used by both orderStatus.js and returns.js.

const { ORDERS } = require("./data");

function findOrder(idOrEmail) {
  const key = idOrEmail.trim().toUpperCase();
  if (ORDERS[key]) return ORDERS[key];
  const byEmail = Object.values(ORDERS).find(
    o => o.email.toLowerCase() === idOrEmail.trim().toLowerCase()
  );
  return byEmail || null;
}

module.exports = { findOrder };
