require('dotenv').config();

const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  corsOrigins: (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean),
  tokenSecret: process.env.TOKEN_SECRET || 'dev-only-change-me',
  draftTtlHours: Number(process.env.DRAFT_TTL_HOURS || 72)
};

if (!env.mongoUri) {
  console.error('❌ MONGODB_URI is required');
  process.exit(1);
}

module.exports = env;
