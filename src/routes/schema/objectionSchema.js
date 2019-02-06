import Joi from 'joi';

export const OBJECTION_EDIT_SCHEMA = Joi.object().keys({
  descripion: Joi.string().max(1020*8).required(true),
  id: Joi.string().max(100).min(3).required(true),
});

export const GET_OBJECTION_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});
