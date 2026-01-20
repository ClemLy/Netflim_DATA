import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

// Middlewares de validation
import { validate } from '../middlewares/validate.middleware.js';
import { createMovieSchema, updateMovieSchema } from '../validators/movie.validator.js';

// Middlewares d'authentification
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Public : Tout le monde peut voir
router.get('/', movieController.findAll);
router.get('/:id', movieController.findOne);

// Privé : Il faut un token pour créer
router.post('/', authenticate, validate(createMovieSchema), movieController.create);
router.put('/:id', authenticate, validate(updateMovieSchema), movieController.update);
router.delete('/:id', authenticate, movieController.delete);

export default router;