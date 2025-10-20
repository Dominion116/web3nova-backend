const Application = require('../models/Application');

/**
 * Very lightweight "auth" that ties an application to a client token.
 * Frontend must send header: `x-app-token: <clientToken>`
 */
async function appTokenGuard(req, res, next) {
  const token = req.header('x-app-token');
  const { id } = req.params;

  if (!token) {
    return res.status(401).json({ error: { code: 'NO_TOKEN', message: 'x-app-token header is required' } });
  }

  const app = await Application.findById(id);
  if (!app) {
    return res.status(404).json({ error: { code: 'APP_NOT_FOUND', message: 'Application not found' } });
  }
  if (app.clientToken !== token) {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Invalid application token' } });
  }

  // Optional: check if expired
  if (app.expiresAt && new Date() > app.expiresAt && app.status !== 'complete') {
    return res.status(410).json({ error: { code: 'EXPIRED', message: 'This draft has expired' } });
  }

  req.appDoc = app;
  next();
}

module.exports = { appTokenGuard };
