import Joi from 'joi';

export const GET_CANDIDATE_BY_NOMINATION_ID_SCHEMA = Joi.object().keys({
  nominationId: Joi.string(),
  
});

export const GET_PAYMENT_BY_NOMINATION_ID_SCHEMA = Joi.object().keys({
  nominationId: Joi.string(),

});
