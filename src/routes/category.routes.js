import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { categorySchema } from '../validators/category.validator.js';

const router = Router();

router.get('/', categoryController.findAll);

// Routes protégées
router.post('/', authenticate, validate(categorySchema), categoryController.create);
router.put('/:id', authenticate, validate(categorySchema), categoryController.update);
router.delete('/:id', authenticate, categoryController.delete);

export default router;