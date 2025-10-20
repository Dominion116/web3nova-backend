const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const routes = require('./routes');
const { publicLimiter } = require('./middleware/rateLimiter');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security & parsing
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

// CORS
if (env.corsOrigins.length) {
  app.use(cors({ origin: env.corsOrigins, credentials: true }));
} else {
  app.use(cors());
}

app.use(morgan('dev'));
app.use(publicLimiter);

// Routes
app.use('/api', routes);

// 404 + error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
