import { Movie, Category, File } from '../models/index.js';

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
      include: [
        { model: Category, as: 'category' },
        { model: File, as: 'poster' },
        { model: File, as: 'video' }
      ]
    });
  },

  async update(id, data) {
    return await Movie.update(data, { where: { id } });
  },

  async delete(id) {
    return await Movie.destroy({ where: { id } });
  }
};