const router = require('express').Router();
const { getTracks } = require('../controllers/trackController');

router.get('/', getTracks);

module.exports = router;
