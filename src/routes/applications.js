const router = require('express').Router();
const { createApplication, savePersonal, saveFinal, getApplication } = require('../controllers/applicationController');
const { appTokenGuard } = require('../middleware/auth');
const { trackCreateRules, personalRules, finalRules, handleValidationErrors } = require('../validators/applicationValidators');

// Step 1: create draft with selected track
router.post('/', trackCreateRules, handleValidationErrors, createApplication);

// Step 2: save personal info (token required)
router.patch('/:id/personal', appTokenGuard, personalRules, handleValidationErrors, savePersonal);

// Step 3: save final details (token required)
router.patch('/:id/final', appTokenGuard, finalRules, handleValidationErrors, saveFinal);

// Resume (token required)
router.get('/:id', appTokenGuard, getApplication);

module.exports = router;
