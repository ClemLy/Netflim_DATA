import { seriesService } from '../../services/series/series.service.js';

export const seriesController = {
  create: async (req, res, next) => {
    try {
      const series = await seriesService.createSeries(req.body);
      res.status(201).json(series);
    } catch (e) { next(e); }
  },

  findAll: async (req, res, next) => {
    try {
      const allSeries = await seriesService.getAllSeries();
      res.status(200).json(allSeries);
    } catch (e) { next(e); }
  },

  findOneFull: async (req, res, next) => {
    try {
      const series = await seriesService.getSeriesFullDetails(req.params.id);
      res.status(200).json(series);
    } catch (e) { next(e); }
  }
};