import { Category } from '../models/index.js';

export const categoryRepository = {
  async findAll() {
    return await Category.findAll();
  },

  async findById(id) {
    return await Category.findByPk(id);
  },

  async create(data) {
    return await Category.create(data);
  }
};