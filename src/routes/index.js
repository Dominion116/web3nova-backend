
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
router.get('/health', (req, res) => res.json({ ok: true }));

router.use('/tracks', require('./tracks'));
router.use('/applications', require('./applications'));

module.exports = router;
