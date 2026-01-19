import Joi from 'joi';

export const createSeriesSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('', null),
  category_id: Joi.number().integer().positive().required(),
  poster_id: Joi.string().uuid().allow(null)
});

export const createSeasonSchema = Joi.object({
  number: Joi.number().integer().positive().required(),
  description: Joi.string().allow('', null)
});

export const createEpisodeSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  number: Joi.number().integer().positive().required(),
  duration: Joi.number().integer().positive(),
  video_id: Joi.string().uuid().required()
});