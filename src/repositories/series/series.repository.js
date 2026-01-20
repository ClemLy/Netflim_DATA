import { Series, Season, Episode, Category, File } from '../../models/index.js';

export const seriesRepository = {
  // Récupérer toutes les séries avec leur catégorie
  async findAll() {
    return await Series.findAll({
      include: [{ model: Category, as: 'category' }]
    });
  },

  async findById(id) {
    return await Series.findByPk(id);
  },

  // Récupérer UNE série avec TOUTES les saisons et TOUS les épisodes
  async findFullDetails(id) {
    return await Series.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: File, as: 'poster' },
        { 
          model: Season, 
          as: 'seasons',
          include: [
            {
              model: Episode,
              as: 'episodes',
              include: [{ model: File, as: 'video' }]
            }
          ] // On imbrique les épisodes dans les saisons
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
  },
  async update(id, data) {
    return await Series.update(data, { where: { id } });
  },
  async delete(id) {
    return await Series.destroy({ where: { id } });
  }
};