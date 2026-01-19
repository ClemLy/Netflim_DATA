import { Router } from 'express';
import { seriesController } from '../controllers/series/series.controller.js';
import { seasonController } from '../controllers/series/season.controller.js';
import { episodeController } from '../controllers/series/episode.controller.js';

const router = Router();

// --- Routes SÉRIES ---
router.get('/', seriesController.findAll);
router.post('/', seriesController.create);
router.get('/:id', seriesController.findOneFull); // La route qui ramène TOUT

// --- Routes SAISONS (imbriquées dans séries) ---
router.post('/:seriesId/seasons', seasonController.create);

// --- Routes ÉPISODES (imbriquées dans saisons) ---
router.post('/seasons/:seasonId/episodes', episodeController.create);

export default router;