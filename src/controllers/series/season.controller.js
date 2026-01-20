import { seasonService } from '../../services/series/season.service.js';

export const seasonController = {
  create: async (req, res, next) => {
    try {
      // On récupère l'ID de la série dans l'URL et les données dans le body
      const { seriesId } = req.params;
      const season = await seasonService.addSeason(seriesId, req.body);
      res.status(201).json(season);
    } catch (e) { next(e); }
  },

  update: async (req, res, next) => {
    try {
      await seasonService.updateSeason(req.params.seasonId, req.body);
      res.status(200).json({ message: "Saison mise à jour" });
    } catch (e) { next(e); }
  },

  delete: async (req, res, next) => {
    try {
      await seasonService.deleteSeason(req.params.seasonId);
      res.status(204).send();
    } catch (e) { next(e); }
  }
};