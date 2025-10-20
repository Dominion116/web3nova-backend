
const router = require('express').Router();
const { getTracks } = require('../controllers/trackController');

/**
 * @swagger
 * tags:
 *   name: Tracks
 *   description: Track and duration information
 */

/**
 * @swagger
 * /tracks:
 *   get:
 *     summary: Get all available tracks and durations
 *     tags: [Tracks]
 *     responses:
 *       200:
 *         description: The list of tracks and durations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tracks:
 *                   type: array
 *                   items:
 *                     type: string
 *                 durations:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/', getTracks);

module.exports = router;
