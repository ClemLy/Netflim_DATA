import { Episode } from '../../models/index.js';

export const episodeRepository = {
  async findBySeason(seasonId) {
    return await Episode.findAll({ where: { season_id: seasonId }, order: [['number', 'ASC']] });
  },
  async findById(id) {
    return await Episode.findByPk(id);
  },
  async create(data) {
    return await Episode.create(data);
  },
  async update(id, data) {
    return await Episode.update(data, { where: { id } });
  },
  async delete(id) {
    return await Episode.destroy({ where: { id } });
  }
};