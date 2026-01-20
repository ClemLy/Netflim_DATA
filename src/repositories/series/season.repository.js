import { Season } from '../../models/index.js';

export const seasonRepository = {
  async findBySeries(seriesId) {
    return await Season.findAll({ where: { series_id: seriesId }, order: [['number', 'ASC']] });
  },
  async findById(id) {
    return await Season.findByPk(id);
  },
  async create(data) {
    return await Season.create(data);
  },
  async update(id, data) {
    return await Season.update(data, { where: { id } });
  },
  async delete(id) {
    return await Season.destroy({ where: { id } });
  }
};