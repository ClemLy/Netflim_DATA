import { categoryRepository } from '../repositories/category.repository.js';

export const categoryService = {
  async getAllCategories() {
    return await categoryRepository.findAll();
  },

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) throw Object.assign(new Error('Catégorie non trouvée'), { status: 404 });
    return category;
  },

  async createCategory(data) {
    return await categoryRepository.create(data);
  },

  async updateCategory(id, data) {
    await this.getCategoryById(id); // Vérifie l'existence
    return await categoryRepository.update(id, data);
  },

  async deleteCategory(id) {
    await this.getCategoryById(id); // Vérifie l'existence
    return await categoryRepository.delete(id);
  }
};