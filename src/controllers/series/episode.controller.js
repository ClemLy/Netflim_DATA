import { episodeService } from '../../services/series/episode.service.js';

export const episodeController = {
  create: async (req, res, next) => {
    try {
      // On récupère l'ID de la saison dans l'URL
      const { seasonId } = req.params;
      const episode = await episodeService.addEpisode(seasonId, req.body);
      res.status(201).json(episode);
    } catch (e) { next(e); }
  },

  update: async (req, res, next) => {
    try {
      await episodeService.updateEpisode(req.params.episodeId, req.body);
      res.status(200).json({ message: "Épisode mis à jour" });
    } catch (e) { next(e); }
  },

  delete: async (req, res, next) => {
    try {
      await episodeService.deleteEpisode(req.params.episodeId);
      res.status(204).send();
    } catch (e) { next(e); }
  }
};