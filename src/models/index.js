// Fichier qui sert à importer tous les modèles et à déclarer les liens entre eux.
import { Category } from './category.model.js';
import { Movie } from './movie.model.js';

// Un Film appartient à une Catégorie
Movie.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
// Une Catégorie peut avoir plusieurs Films
Category.hasMany(Movie, { foreignKey: 'category_id', as: 'movies' });

export { Category, Movie };