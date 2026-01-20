import { episodeRepository } from '../../repositories/series/episode.repository.js';
import { seasonRepository } from '../../repositories/series/season.repository.js';

export const episodeService = {
  async addEpisode(seasonId, episodeData) {
    const season = await seasonRepository.create;
    
    return await episodeRepository.create({ ...episodeData, season_id: seasonId });
  },
  
  async updateEpisode(id, data) {
    const episode = await episodeRepository.findById(id);
    if (!episode) throw Object.assign(new Error('Épisode non trouvé'), { status: 404 });
    return await episodeRepository.update(id, data);
  },

  async deleteEpisode(id) {
    const episode = await episodeRepository.findById(id);
    if (!episode) throw Object.assign(new Error('Épisode non trouvé'), { status: 404 });
    return await episodeRepository.delete(id);
  }
};