const rateLimit = require('express-rate-limit');

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { publicLimiter };
