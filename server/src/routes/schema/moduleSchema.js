import Joi from 'joi';

export const MODULE_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  id: Joi.string().max(100).min(3).required(true),
});

export const GET_MODULE_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});

export const ELECTION_TEMPLATE_DATA_EDIT_SCHEMA_FOR_PUT = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  id: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  status: Joi.string().max(100).allow('',null),
  reviewNote: Joi.string().max(100).allow('',null),
  column_name: Joi.string().max(100).allow('',null),
  lastModified: Joi.number().integer().allow('',null),
  divisionCommonName: Joi.string().max(100).required(true),
  approval_status: Joi.string().max(100).required(true),
  createdBy: Joi.string().max(100).min(3).required(true),
  divisionName: Joi.string().max(50).allow('',null),
  divisionCode: Joi.string().max(50).allow('',null),
  noOfCandidates: Joi.number().integer().allow('',null),
  candidateFormConfiguration: Joi.array().items(Joi.object({ 
                    candidateConfigId: Joi.string().max(50).required(true),
                  })).allow(null),
  divisionConfig: Joi.array().items(Joi.object({ 
                    divisionCode: Joi.string().max(50).required(true),
                    divisionName: Joi.string().max(50).required(true),
                    noOfCandidates: Joi.number().integer().required(),
                  })).allow(null),
  electionConfig: Joi.array().items(Joi.object({ 
                    electionModuleConfigId: Joi.string().max(50).required(true),
                    value: Joi.string().max(100).required(true),
                    id: Joi.string().max(100).allow('',null),
                  })).allow(null),
  eligibilityCheckList: Joi.array().items(Joi.object({ 
                    eligibilityConfigId: Joi.string().max(50).required(true),
                  })).allow(null),
  supportingDocuments: Joi.array().items(Joi.object({ 
                    supportDocConfigId: Joi.string().max(50).required(true),
                  })).allow(null),
});

export const ELECTION_TEMPLATE_DATA_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  id: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  status: Joi.string().max(100).allow('',null),
  reviewNote: Joi.string().max(100).allow('',null),
  column_name: Joi.string().max(100).allow('',null),
  divisionName: Joi.string().max(100).allow('',null),
  divisionCode: Joi.string().max(100).allow('',null),
  noOfCandidates: Joi.string().max(100).allow('',null),
  lastModified: Joi.number().integer().allow('',null),
  divisionCommonName: Joi.string().max(100).required(true),
  approval_status: Joi.string().max(100).allow('',null),
  createdBy: Joi.string().max(100).min(3).required(true),
  createdAt: Joi.number().integer().allow('',null),
  updatedAt: Joi.number().integer().allow('',null),
  candidateFormConfiguration: Joi.array().items(Joi.object({ 
                    candidateConfigId: Joi.string().max(50).required(true),
                  })).allow(null),
  divisionConfig: Joi.array().items(Joi.object({ 
                    divisionCode: Joi.string().max(50).required(true),
                    divisionName: Joi.string().max(50).required(true),
                    noOfCandidates: Joi.number().integer().required(),
                  })).allow(null),
  electionConfig: Joi.array().items(Joi.object({ 
                    electionModuleConfigId: Joi.string().max(50).required(true),
                    value: Joi.string().max(100).required(true),
                    id: Joi.string().max(100).required(true),
                  })).allow(null),
  eligibilityCheckList: Joi.array().items(Joi.object({ 
                    eligibilityConfigId: Joi.string().max(50).required(true),
                  })).allow(null),
  supportingDocuments: Joi.array().items(Joi.object({ 
                    supportDocConfigId: Joi.string().max(50).required(true),
                  })).allow(null),
  ElectionTemplateReviewData: Joi.array().allow(null),         
});

export const ELECTION_TEMPLATE_APPROVAL_SCHEMA = Joi.object().keys({
  reviewNote: Joi.string().max(200).required(true),
  status: Joi.string().max(100).required(true),
  updatedAt: Joi.number().integer(),
  moduleId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
});