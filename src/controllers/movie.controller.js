import { movieService } from '../services/movie.service.js';

export const movieController = {
  // POST /movies
  create: async (req, res, next) => {
    try {
      const movie = await movieService.createMovie(req.body);
      return res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  },

  // GET /movies
  findAll: async (req, res, next) => {
    try {
      const movies = await movieService.getAllMovies();
      return res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  },

  // GET /movies/:id
  findOne: async (req, res, next) => {
    try {
      const movie = await movieService.getMovieById(req.params.id);
      return res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /movies/:id
  delete: async (req, res, next) => {
    try {
      await movieService.deleteMovie(req.params.id);
      return res.status(204).send(); // 204 No Content : succès sans corps de réponse
    } catch (error) {
      next(error);
    }
  }
};