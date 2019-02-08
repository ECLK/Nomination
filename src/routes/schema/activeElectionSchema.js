import Joi from 'joi';

export const ACTIVE_ELECTION_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  module_id: Joi.string().max(100).min(3).required(true),
  created_by: Joi.string().max(100).min(3).required(true),//TODO: validate later
  created_at: Joi.string().max(100).min(3).required(true),
  updated_at: Joi.string().max(100).min(3).required(true),

});

export const GET_ACTIVE_ELECTION_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});
