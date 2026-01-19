// Fichier qui sert à importer tous les modèles et à déclarer les liens entre eux.
import { Category } from './category.model.js';
import { Movie } from './movie.model.js';
import { Series } from './series/series.model.js';
import { Season } from './series/season.model.js';
import { Episode } from './series/episode.model.js';

// --- Relations FILMS ---
// 1. Catégorie <-> Films
Movie.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// 2. Films <-> Catégorie
Category.hasMany(Movie, { foreignKey: 'category_id', as: 'movies' });

// --- Relations SÉRIES ---
// 1. Catégorie <-> Séries
Series.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Series, { foreignKey: 'category_id', as: 'series' });

// 2. Séries <-> Saisons
Series.hasMany(Season, { foreignKey: 'series_id', as: 'seasons', onDelete: 'CASCADE' });
Season.belongsTo(Series, { foreignKey: 'series_id' });

// 3. Saisons <-> Épisodes
Season.hasMany(Episode, { foreignKey: 'season_id', as: 'episodes', onDelete: 'CASCADE' });
Episode.belongsTo(Season, { foreignKey: 'season_id' });

export { Category, Movie, Series, Season, Episode };