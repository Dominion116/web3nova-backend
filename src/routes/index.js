const router = require('express').Router();

router.get('/health', (req, res) => res.json({ ok: true }));

router.use('/tracks', require('./tracks'));
router.use('/applications', require('./applications'));

module.exports = router;
