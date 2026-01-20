import { movieRepository } from '../repositories/movie.repository.js';

export const movieService = {
  // Créer un film
  async createMovie(movieData) {
    return await movieRepository.create(movieData);
  },

  // Récupérer tous les films
  async getAllMovies() {
    return await movieRepository.findAll();
  },

  // Récupérer un film par son ID
  async getMovieById(id) {
    const movie = await movieRepository.findById(id);
    if (!movie) {
      const error = new Error('Film non trouvé');
      error.status = 404;
      throw error;
    }
    return movie;
  },

  async updateMovie(id, data) {
    const movie = await movieRepository.findById(id);
    if (!movie) {
      const error = new Error('Film non trouvé');
      error.status = 404;
      throw error;
    }
    return await movieRepository.update(id, data);
  },

  async deleteMovie(id) {
    const deletedCount = await movieRepository.delete(id);
    if (deletedCount === 0) {
      const error = new Error('Film non trouvé');
      error.status = 404;
      throw error;
    }
    return true;
  }
};