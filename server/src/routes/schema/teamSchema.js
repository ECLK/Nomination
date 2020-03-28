import Joi from 'joi';

export const SAVE_TEAM_SCHEMA = Joi.object().keys({
  partyName: Joi.string().max(200).required(),
  partyType: Joi.string().max(100).required(),
  title: Joi.string().max(50).required(),
  abbreviation: Joi.string().max(50).required(),
  address: Joi.string().max(300),
  approvedSymbol: Joi.string().max(50),
  filePath: Joi.string().max(50).required(),
  createdBy: Joi.string().max(50).required(), 
  createdAt: Joi.number().integer(),
  updatedAt: Joi.number().integer(),
  secretaryName: Joi.string().max(100).required(),
  phoneList: Joi.array().allow(null),         
  faxList: Joi.array().allow(null),   
  fileName: Joi.string().max(100).allow('',null), 
  originalname: Joi.string().max(100).allow('',null), 
});

export const UPDATE_TEAM_SCHEMA = Joi.object().keys({
  partyName: Joi.string().max(200).required(),
  partyType: Joi.string().max(100).required(),
  title: Joi.string().max(50).required(),
  abbreviation: Joi.string().max(50).required(),
  address: Joi.string().max(300),
  approvedSymbol: Joi.string().max(50),
  filePath: Joi.string().max(50).required(),
  createdAt: Joi.number().integer(),
  updatedAt: Joi.number().integer(),
  secretaryName: Joi.string().max(100).required(),
  phoneList: Joi.array().allow(null),         
  faxList: Joi.array().allow(null),   
  fileName: Joi.string().max(100).allow('',null), 
  originalname: Joi.string().max(100).allow('',null), 
});