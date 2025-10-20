const env = require('./config/env');
const connectDB = require('./config/db');
const app = require('./app');

async function bootstrap() {
  await connectDB(env.mongoUri);

  app.listen(env.port, () => {
    console.log(`🚀 API listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
