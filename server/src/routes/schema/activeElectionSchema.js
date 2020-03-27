import Joi from 'joi';

export const ACTIVE_ELECTION_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  module_id: Joi.string().max(100).min(3).required(true),
  created_by: Joi.string().max(100).min(3).required(true),//TODO: validate later
  created_at: Joi.string().max(100).min(3).required(true),
  updated_at: Joi.string().max(100).min(3).required(true),

});

export const ACTIVE_ELECTION_DATA_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  module_id: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  status: Joi.string().max(100).required(true),
  created_by: Joi.string().max(100).min(3).required(true),
  created_at: Joi.number().integer(),
  updated_at: Joi.number().integer(),
  timeLineData: Joi.object({ 
                    nominationStart: Joi.number().integer().required(), 
                    nominationEnd: Joi.number().integer().required(),
                    objectionStart: Joi.number().integer().required(),
                    objectionEnd: Joi.number().integer().required(),
                    paymentStart: Joi.number().integer().required(), 
                    paymentEnd: Joi.number().integer().required(),
                    approvalStart: Joi.number().integer().required(),
                    approvalEnd: Joi.number().integer().required(),
                    // electionId: Joi.string().allow(null)
                  }),
  nominationAllowData: Joi.array()
});

export const ACTIVE_ELECTION_DATA_EDIT_SCHEMA_FOR_PUT = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  module_id: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
  status: Joi.string().max(100).required(true),
  created_by: Joi.string().max(100).min(3).required(true),
  created_at: Joi.number().integer(),
  updated_at: Joi.number().integer(),
  timeLineData: Joi.object({ 
                    nominationStart: Joi.number().integer().required(), 
                    nominationEnd: Joi.number().integer().required(),
                    objectionStart: Joi.number().integer().required(),
                    objectionEnd: Joi.number().integer().required(),
                    paymentStart: Joi.number().integer().required(), 
                    paymentEnd: Joi.number().integer().required(),
                    approvalStart: Joi.number().integer().required(),
                    approvalEnd: Joi.number().integer().required(),
                    electionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/)
                  }),
  nominationAllowData: Joi.array()
});

export const ACTIVE_ELECTION_APPROVAL_SCHEMA = Joi.object().keys({
  reviewNote: Joi.string().max(200).required(true),
  status: Joi.string().max(100).required(true),
  updatedAt: Joi.number().integer(),
  electionId: Joi.string().max(36).regex(/^[A-Za-z0-9-]+$/),
});

export const GET_ACTIVE_ELECTION_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});
