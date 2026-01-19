import { Router } from 'express';
import { seriesController } from '../controllers/series/series.controller.js';
import { seasonController } from '../controllers/series/season.controller.js';
import { episodeController } from '../controllers/series/episode.controller.js';

// Middlewares de validation
import { validate } from '../middlewares/validate.middleware.js';
import { createSeriesSchema, createSeasonSchema, createEpisodeSchema } from '../validators/series.validator.js';

const router = Router();

// --- Routes SÉRIES ---
router.get('/', seriesController.findAll);
router.post('/', validate(createSeriesSchema), seriesController.create);
router.get('/:id', seriesController.findOneFull); // La route qui ramène TOUT

// --- Routes SAISONS (imbriquées dans séries) ---
router.post('/:seriesId/seasons', validate(createSeasonSchema), seasonController.create);

// --- Routes ÉPISODES (imbriquées dans saisons) ---
router.post('/seasons/:seasonId/episodes', validate(createEpisodeSchema), episodeController.create);

export default router;