import Joi from 'joi';

export const URL_SCHEMA = Joi.object().keys({
  userId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  teamId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  paymentId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  candidateId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  electionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  divisionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  moduleId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  fieldName: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  objectionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  activeElectionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  electionNominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  status: Joi.string().max(10).regex(/^[A-Za-z-]+$/),
  category: Joi.string().max(20),
  electionName: Joi.string(),
  templateName: Joi.string(),
  keyName: Joi.string(),
  sid: Joi.string(),
  teamType: Joi.string()
});
