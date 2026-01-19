import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.js';

const router = Router();

router.get('/', categoryController.findAll);
router.post('/', categoryController.create);

export default router;