
const router = require('express').Router();
const { createApplication, savePersonal, saveFinal, getApplication } = require('../controllers/applicationController');
const { appTokenGuard } = require('../middleware/auth');
const { trackCreateRules, personalRules, finalRules, handleValidationErrors } = require('../validators/applicationValidators');

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Application process management
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new draft application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               track:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', trackCreateRules, handleValidationErrors, createApplication);

/**
 * @swagger
 * /applications/{id}/personal:
 *   patch:
 *     summary: Save personal information for an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application ID
 *       - in: header
 *         name: x-app-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The application token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               venue:
 *                 type: string
 *               github:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Personal information saved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Unprocessable entity
 */
router.patch('/:id/personal', appTokenGuard, personalRules, handleValidationErrors, savePersonal);

/**
 * @swagger
 * /applications/{id}/final:
 *   patch:
 *     summary: Save final details for an application
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application ID
 *       - in: header
 *         name: x-app-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The application token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: string
 *               motivation:
 *                 type: string
 *               walletAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Final details saved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Unprocessable entity
 */
router.patch('/:id/final', appTokenGuard, finalRules, handleValidationErrors, saveFinal);

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Get an application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application ID
 *       - in: header
 *         name: x-app-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The application token
 *     responses:
 *       200:
 *         description: The application details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.get('/:id', appTokenGuard, getApplication);

module.exports = router;
