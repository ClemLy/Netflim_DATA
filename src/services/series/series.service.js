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
  },
  
  async updateSeries(id, data) {
    const series = await seriesRepository.findById(id);
    if (!series) throw Object.assign(new Error('Série non trouvée'), { status: 404 });
    return await seriesRepository.update(id, data);
  },

  async deleteSeries(id) {
    const series = await seriesRepository.findById(id);
    if (!series) throw Object.assign(new Error('Série non trouvée'), { status: 404 });
    return await seriesRepository.delete(id);
  }
};