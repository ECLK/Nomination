import Joi from 'joi';

export const ELECTION_NOMINATION_EDIT_SCHEMA = Joi.object().keys({
  state: Joi.string().max(100).required(true),
  id: Joi.string().max(100).min(3).required(true),
});

export const GET_ELECTION_NOMINATION_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});
