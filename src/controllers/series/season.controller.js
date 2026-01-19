import { seasonService } from '../../services/series/season.service.js';

export const seasonController = {
  create: async (req, res, next) => {
    try {
      // On récupère l'ID de la série dans l'URL et les données dans le body
      const { seriesId } = req.params;
      const season = await seasonService.addSeason(seriesId, req.body);
      res.status(201).json(season);
    } catch (e) { next(e); }
  }
};