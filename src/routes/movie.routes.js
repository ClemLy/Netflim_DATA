import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

// Middlewares de validation
import { validate } from '../middlewares/validate.middleware.js';
import { createMovieSchema } from '../validators/movie.validator.js';

const router = Router();

router.post('/', validate(createMovieSchema), movieController.create);
router.get('/', movieController.findAll);
router.get('/:id', movieController.findOne);

export default router;