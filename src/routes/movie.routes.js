import { Router } from 'express';
import { movieController } from '../controllers/movie.controller.js';

const router = Router();

router.post('/', movieController.create);
router.get('/', movieController.findAll);
router.get('/:id', movieController.findOne);

export default router;