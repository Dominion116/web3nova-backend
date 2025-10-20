const crypto = require('crypto');

// Simple, strong random token for "client token"
function generateClientToken() {
  return crypto.randomBytes(24).toString('hex'); // 48 chars
}

module.exports = { generateClientToken };
