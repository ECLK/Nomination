import Joi from 'joi';

export const USER_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  id: Joi.string().max(36).min(3).required(true),
});

export const GET_USER_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});
