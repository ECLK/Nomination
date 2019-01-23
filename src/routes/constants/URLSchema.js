import Joi from 'joi';

export const URL_SCHEMA = Joi.object().keys({
  userId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  teamId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  candidateId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  electionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  status: Joi.string().max(10).regex(/^[A-Za-z-]+$/),
  election_module_id: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
});
