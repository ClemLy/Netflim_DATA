import Joi from 'joi';

/* --- SÉRIES --- */
export const createSeriesSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('', null),
  category_id: Joi.number().integer().positive().required(),
  poster_id: Joi.string().uuid().allow(null)
});

export const updateSeriesSchema = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string(),
  category_id: Joi.number().integer(),
  poster_id: Joi.string().uuid()
}).min(1);


/* --- SAISONS --- */
export const createSeasonSchema = Joi.object({
  number: Joi.number().integer().positive().required(),
  description: Joi.string().allow('', null)
});

export const updateSeasonSchema = Joi.object({
  number: Joi.number().integer(),
  description: Joi.string()
}).min(1);


/* --- ÉPISODES --- */
export const createEpisodeSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  number: Joi.number().integer().positive().required(),
  duration: Joi.number().integer().positive(),
  video_id: Joi.string().uuid().required()
});

export const updateEpisodeSchema = Joi.object({
  title: Joi.string(),
  number: Joi.number().integer(),
  duration: Joi.number().integer(),
  video_id: Joi.string().uuid()
}).min(1);