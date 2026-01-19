import { categoryRepository } from '../repositories/category.repository.js';

export const categoryService = {
  async getAllCategories() {
    return await categoryRepository.findAll();
  },

  async createCategory(data) {
    return await categoryRepository.create(data);
  }
};