import Joi from 'joi';

export const USER_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(255).required(true),
  id: Joi.number(),
});

export const GET_USER_BY_ID_SCHEMA = Joi.object().keys({
});
