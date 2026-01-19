import { episodeRepository } from '../../repositories/series/episode.repository.js';
import { seasonRepository } from '../../repositories/series/season.repository.js';

export const episodeService = {
  async addEpisode(seasonId, episodeData) {
    const season = await seasonRepository.create;
    
    return await episodeRepository.create({ ...episodeData, season_id: seasonId });
  }
};