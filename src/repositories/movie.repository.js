import { Movie, Category } from '../models/index.js';

export const movieRepository = {
  async findAll() {
    return await Movie.findAll({
      include: [{ model: Category, as: 'category' }]
    });
  },

  async create(data) {
    return await Movie.create(data);
  },

  async findById(id) {
    return await Movie.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });
  },

  async delete(id) {
    return await Movie.destroy({ where: { id } });
  }
};