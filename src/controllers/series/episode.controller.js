import { episodeService } from '../../services/series/episode.service.js';

export const episodeController = {
  create: async (req, res, next) => {
    try {
      // On récupère l'ID de la saison dans l'URL
      const { seasonId } = req.params;
      const episode = await episodeService.addEpisode(seasonId, req.body);
      res.status(201).json(episode);
    } catch (e) { next(e); }
  }
};