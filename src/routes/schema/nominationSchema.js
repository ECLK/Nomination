import Joi from 'joi';

export const SAVE_PAYMENT_SCHEMA = Joi.object().keys({
  depositor: Joi.string().alphanum().max(100).required(),
  amount: Joi.number().positive().precision(2).required(),
  depositDate: Joi.number().integer(),
  filePath: Joi.string().alphanum().min(3).max(100).required(),
  status: Joi.string().valid('PENDING','APPROVED','REJECTED'),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
});

export const UPDATE_PAYMENT_SCHEMA = Joi.object().keys({
  depositor: Joi.string().alphanum().max(100).required(),
  amount: Joi.number().positive().precision(4).required(),
  depositDate: Joi.number().integer(),
  filePath: Joi.string().alphanum().min(3).max(100).required(),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),

});

 const SAVE_SUPPORT_DOC_SCHEMA = Joi.object().keys({
  supportDocConfDataId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  filePath: Joi.string(),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),

});
export let services = Joi.array().items(SAVE_SUPPORT_DOC_SCHEMA)

const UPDATE_SUPPORT_DOC_SCHEMA = Joi.object().keys({
  supportDocConfDataId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  filePath: Joi.string(),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),

});
export let services2 = Joi.array().items(UPDATE_SUPPORT_DOC_SCHEMA)

export const SAVE_CANDIDATE_SCHEMA = Joi.object().keys({
  fullName: Joi.string().alphanum().max(100).required(),
  preferredName: Joi.string().alphanum().max(100).required(),
  nic: Joi.string().max(15).required(),//TODO : yujith, write regexp for nic validation
  dateOfBirth: Joi.date().format('YYYY-MM-DD').options({ convert: true }),//TODO: yujith, should'nt be submit future date, if this canot do with joi do it with service function
  gender: Joi.string().max(5).required(),//TODO: yujith,provide specific types like Male/Female
  address: Joi.string().max(300).required(),
  occupation: Joi.string().max(20).required(),
  electoralDivisionName: Joi.string().max(50).required(),//TODO: yujith,validate with service function with particuler election module
  electoralDivisionCode: Joi.string().max(10).required(),//TODO: yujith,validate with service function with particuler election module
  counsilName: Joi.string().max(20).required(),//TODO: yujith, get to know the purpase 
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
});

export const SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA = Joi.object().keys({
  supportDocConfDataId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  filePath: Joi.string().max(100).required(),
  candidateId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),

});