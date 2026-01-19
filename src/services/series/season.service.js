import { seasonRepository } from '../../repositories/series/season.repository.js';
import { seriesRepository } from '../../repositories/series/series.repository.js';

export const seasonService = {
  async addSeason(seriesId, seasonData) {
    const series = await seriesRepository.findFullDetails(seriesId);
    if (!series) throw Object.assign(new Error('Série parente introuvable'), { status: 404 });

    // On injecte le series_id dans les données de la saison
    return await seasonRepository.create({ ...seasonData, series_id: seriesId });
  }
};