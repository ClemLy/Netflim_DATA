import { Series, Season, Episode, Category } from '../../models/index.js';

export const seriesRepository = {
  // Récupérer toutes les séries avec leur catégorie
  async findAll() {
    return await Series.findAll({
      include: [{ model: Category, as: 'category' }]
    });
  },

  // Récupérer UNE série avec TOUTES les saisons et TOUS les épisodes
  async findFullDetails(id) {
    return await Series.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { 
          model: Season, 
          as: 'seasons',
          include: [{ model: Episode, as: 'episodes' }] // On imbrique les épisodes dans les saisons
        }
      ],
      order: [
        [{ model: Season, as: 'seasons' }, 'number', 'ASC'],
        [{ model: Season, as: 'seasons' }, { model: Episode, as: 'episodes' }, 'number', 'ASC']
      ]
    });
  },

  async create(data) {
    return await Series.create(data);
  }
};