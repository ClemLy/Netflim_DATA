import { seriesService } from '../../services/series/series.service.js';

export const seriesController = {
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
  },

  create: async (req, res, next) => {
    try {
      const series = await seriesService.createSeries(req.body);
      res.status(201).json(series);
    } catch (e) { next(e); }
  },

  update: async (req, res, next) => {
    try {
      await seriesService.updateSeries(req.params.id, req.body);
      res.status(200).json({ message: "Série mise à jour" });
    } catch (e) { next(e); }
  },

  delete: async (req, res, next) => {
    try {
      await seriesService.deleteSeries(req.params.id);
      res.status(204).send();
    } catch (e) { next(e); }
  }
};