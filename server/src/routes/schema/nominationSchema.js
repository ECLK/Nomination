import Joi from 'joi';

export const SAVE_PAYMENT_SCHEMA = Joi.object().keys({
  depositor: Joi.string().max(100).required(),
  amount: Joi.number().positive().precision(4).required(),
  depositDate: Joi.number().integer().required(),
  serialNo: Joi.number().integer().required(),
  filePath: Joi.string().max(100).required(),
  status: Joi.string().max(100).required(),
  createdBy: Joi.string().max(100).required(),
  updatedAt: Joi.number().integer().required(),
  createdAt: Joi.number().integer().required(),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  fileName: Joi.string().max(100).allow('',null), 
  originalname: Joi.string().max(100).allow('',null), 
});

export const UPDATE_PAYMENT_SCHEMA = Joi.object().keys({
  depositor: Joi.string().max(100).required(),
  amount: Joi.number().positive().precision(4).required(),
  depositDate: Joi.number().integer().required(),
  serialNo: Joi.number().integer().required(),
  filePath: Joi.string().max(100).required(),
  status: Joi.string().max(100).required(),
  updatedAt: Joi.number().integer().required(),
  note: Joi.string().max(300).required().allow('',null), 
  paymentSdocId: Joi.string().max(100).required(),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  fileName: Joi.string().max(100).allow('',null), 
  originalname: Joi.string().max(100).allow('',null), 
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
  candidateData: Joi.array().items(Joi.object({ 
    candidateConfigId: Joi.number().integer().required(),
    value: Joi.string().max(300).required(true)
  })).allow(null),
  nominationId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
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
