import { Episode } from '../../models/index.js';

export const episodeRepository = {
  async create(data) {
    return await Episode.create(data);
  },
  async findBySeason(seasonId) {
    return await Episode.findAll({ where: { season_id: seasonId }, order: [['number', 'ASC']] });
  }
};