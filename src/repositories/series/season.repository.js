import { Season } from '../../models/index.js';

export const seasonRepository = {
  async create(data) {
    return await Season.create(data);
  },
  async findBySeries(seriesId) {
    return await Season.findAll({ where: { series_id: seriesId }, order: [['number', 'ASC']] });
  }
};