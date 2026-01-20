import { Router } from 'express';
import { seriesController } from '../controllers/series/series.controller.js';
import { seasonController } from '../controllers/series/season.controller.js';
import { episodeController } from '../controllers/series/episode.controller.js';

// Middlewares de validation
import { validate } from '../middlewares/validate.middleware.js';
import { createSeriesSchema, createSeasonSchema, createEpisodeSchema } from '../validators/series.validator.js';
import { updateSeriesSchema, updateSeasonSchema, updateEpisodeSchema } from '../validators/series.validator.js';

// Middlewares d'authentification
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// --- Routes SÉRIES ---
router.get('/', seriesController.findAll);
router.get('/:id', seriesController.findOneFull); // La route qui ramène tout les détails d'une série
router.post('/', authenticate, validate(createSeriesSchema), seriesController.create);
router.put('/:id', authenticate, validate(updateSeriesSchema), seriesController.update);
router.delete('/:id', authenticate, seriesController.delete);

// --- Routes SAISONS (imbriquées dans séries) ---
router.post('/:seriesId/seasons', authenticate, validate(createSeasonSchema), seasonController.create);
router.put('/seasons/:seasonId', authenticate, validate(updateSeasonSchema), seasonController.update);
router.delete('/seasons/:seasonId', authenticate, seasonController.delete);

// --- Routes ÉPISODES (imbriquées dans saisons) ---
router.post('/seasons/:seasonId/episodes', authenticate, validate(createEpisodeSchema), episodeController.create);
router.put('/episodes/:episodeId', authenticate, validate(updateEpisodeSchema), episodeController.update);
router.delete('/episodes/:episodeId', authenticate, episodeController.delete);

export default router;