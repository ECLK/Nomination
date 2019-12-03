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
  fullName: Joi.string().max(300).regex(/^[\w\s]+$/).required(),
  preferredName: Joi.string().max(100).regex(/^[\w\s]+$/).required(),
  nic: Joi.string().max(15).required(),
  dateOfBirth: Joi.number().integer().positive(),
  gender: Joi.string().max(6).valid('MALE','FEMALE').required(),
  address: Joi.string().max(300),
  occupation: Joi.string().max(50),
  electoralDivisionName: Joi.string().max(50).required(),
  electoralDivisionCode: Joi.string().max(10).required(),
  counsilName: Joi.string().max(20).required(),
  nominationId: Joi.string().min(36).max(36).regex(/^[\w\s-]+$/),
});

export const SAVE_CANDIDATE_SUPPORT_DOCS_SCHEMA = Joi.object().keys({
  supportDocConfDataId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  filePath: Joi.string().max(100).required(),
  candidateId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),

});

export const SAVE_NOMINATION_APPROVE_SCHEMA = Joi.object().keys({
  createdBy: Joi.string(),
  createdAt: Joi.number().integer(),
  updatedAt: Joi.number().integer(),
  reviewNote: Joi.string(),
  status: Joi.string().valid('1ST-APPROVE','2ND-APPROVE','REJECT'),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),

});
