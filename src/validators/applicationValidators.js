const { body } = require('express-validator');
const { TRACK_SLUGS, DURATION_VALUES } = require('../constants/tracks');

const trackCreateRules = [
  body('track')
    .isString().withMessage('track is required')
    .isIn(TRACK_SLUGS).withMessage('Invalid track selected')
];

const personalRules = [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 7 }).withMessage('Phone number is required'),
  body('venue').optional().isIn(['online', 'onsite']).withMessage('Invalid venue'),
  body('github').optional().isURL().withMessage('GitHub profile must be a valid URL'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('gender').isIn(['male', 'female']).withMessage('Gender is required')
];

const finalRules = [
  body('duration').isIn(DURATION_VALUES).withMessage('Invalid duration'),
  body('motivation').isString().isLength({ min: 10 }).withMessage('Motivation must be at least 10 characters'),
  body('walletAddress')
    .custom(v => /^0x[a-fA-F0-9]{40}$/.test(v))
    .withMessage('walletAddress must be an 0x-prefixed 42-char hex string')
];

function handleValidationErrors(req, res, next) {
  const { validationResult } = require('express-validator');
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const details = result.array().map(e => ({ field: e.path, msg: e.msg }));
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid payload', details } });
  }
  next();
}

module.exports = {
  trackCreateRules,
  personalRules,
  finalRules,
  handleValidationErrors
};
