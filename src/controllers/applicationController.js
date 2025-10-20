const env = require('../config/env');
const Application = require('../models/Application');
const STATUS = require('../constants/statuses');
const { generateClientToken } = require('../services/id');

// progress helper
function progressFor(status) {
  const map = {
    [STATUS.DRAFT_STEP1]: 1,
    [STATUS.DRAFT_STEP2]: 2,
    [STATUS.COMPLETE]:    3
  };
  return { step: map[status] || 1, total: 3 };
}

function draftExpiryDate() {
  const d = new Date();
  d.setHours(d.getHours() + env.draftTtlHours);
  return d;
}

// POST /applications  (Step 1)
async function createApplication(req, res) {
  const { track } = req.body;

  const app = await Application.create({
    track,
    status: STATUS.DRAFT_STEP1,
    clientToken: generateClientToken(),
    expiresAt: draftExpiryDate()
  });

  res.status(201).json({
    id: app._id.toString(),
    token: app.clientToken,
    status: app.status,
    progress: progressFor(app.status),
    message: 'Track saved. Proceed to personal information.'
  });
}

// PATCH /applications/:id/personal  (Step 2)
async function savePersonal(req, res) {
  const app = req.appDoc;
  if (app.status !== STATUS.DRAFT_STEP1 && app.status !== STATUS.DRAFT_STEP2) {
    return res.status(422).json({ error: { code: 'BAD_STEP', message: 'Cannot update personal information at this stage' } });
  }

  const {
    fullName, email, phone,
    venue = 'online', github, country, state, city, gender
  } = req.body;

  app.personal = { fullName, email, phone, venue, github, country, state, city, gender };
  app.status = STATUS.DRAFT_STEP2;
  app.expiresAt = draftExpiryDate(); // extend TTL while user is active
  await app.save();

  res.json({
    id: app._id.toString(),
    status: app.status,
    progress: progressFor(app.status),
    message: 'Personal information saved. Proceed to final details.'
  });
}

// PATCH /applications/:id/final  (Step 3)
async function saveFinal(req, res) {
  const app = req.appDoc;
  if (app.status !== STATUS.DRAFT_STEP2) {
    return res.status(422).json({ error: { code: 'BAD_STEP', message: 'Please complete personal information first' } });
  }

  const { duration, motivation, walletAddress } = req.body;

  app.finalDetails = { duration, motivation, walletAddress };
  app.status = STATUS.COMPLETE;

  // Completed apps should not expire
  app.expiresAt = null;
  await app.save();

  res.json({
    id: app._id.toString(),
    status: app.status,
    progress: progressFor(app.status),
    message: 'Application submitted successfully. (Payment step will be added later.)'
  });
}

// GET /applications/:id  (resume)
async function getApplication(req, res) {
  const app = req.appDoc;
  res.json({
    id: app._id.toString(),
    track: app.track,
    personal: app.personal || null,
    finalDetails: app.finalDetails || null,
    status: app.status,
    progress: progressFor(app.status),
    createdAt: app.createdAt,
    updatedAt: app.updatedAt
  });
}

module.exports = {
  createApplication,
  savePersonal,
  saveFinal,
  getApplication
};
