import { seriesRepository } from '../../repositories/series/series.repository.js';

export const seriesService = {
  async getAllSeries() {
    return await seriesRepository.findAll();
  },

  async getSeriesFullDetails(id) {
    const series = await seriesRepository.findFullDetails(id);
    if (!series) {
      const error = new Error('Série non trouvée');
      error.status = 404;
      throw error;
    }
    return series;
  },

  async createSeries(data) {
    return await seriesRepository.create(data);
  }
};