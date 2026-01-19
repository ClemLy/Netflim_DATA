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
  },

  async update(id, data) {
    return await Category.update(data, { where: { id } });
  },

  async delete(id) {
    return await Category.destroy({ where: { id } });
  }
};