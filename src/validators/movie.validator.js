import Joi from 'joi';

export const createMovieSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('', null),
  releaseDate: Joi.date().iso().allow(null),
  duration: Joi.number().integer().positive().required(),
  category_id: Joi.number().integer().positive().required(),
  poster_id: Joi.string().uuid().allow(null),
  video_id: Joi.string().uuid().allow(null)
});

export const updateMovieSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  description: Joi.string().allow('', null),
  releaseDate: Joi.date().iso().allow(null),
  duration: Joi.number().integer().positive(),
  category_id: Joi.number().integer(),
  poster_id: Joi.string().uuid().allow(null),
  video_id: Joi.string().uuid().allow(null)
}).min(1);