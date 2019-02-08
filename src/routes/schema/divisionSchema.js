import Joi from 'joi';

// division list for insert
const division = Joi.object().keys({
    divisionCommonName: Joi.string().max(100).required(true),
    divisionName: Joi.string().max(100).min(3).required(true),
    divisionCode: Joi.string().max(10).min(1).required(true),
    noOfCandidates: Joi.number().positive().integer().required(true),
});
export const ADD_DIVISIONS_BY_MODULE_ID_SCHEMA = Joi.array().items(division);


export const DIVISION_EDIT_SCHEMA = Joi.object().keys({
  name: Joi.string().max(100).required(true),
  id: Joi.string().max(100).min(3).required(true),
});

export const GET_DIVISION_BY_ID_SCHEMA = Joi.object().keys({
  max: Joi.number().max(255),
});
