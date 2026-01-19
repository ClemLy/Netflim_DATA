import { categoryService } from '../services/category.service.js';

export const categoryController = {
  findAll: async (req, res, next) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
};