import { categoryService } from '../services/category.service.js';

export const categoryController = {
  findAll: async (req, res, next) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (e) { next(e); }
  },

  create: async (req, res, next) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (e) { next(e); }
  },

  update: async (req, res, next) => {
    try {
      await categoryService.updateCategory(req.params.id, req.body);
      res.status(200).json({ message: "Catégorie mise à jour" });
    } catch (e) { next(e); }
  },

  delete: async (req, res, next) => {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (e) { next(e); }
  }
};