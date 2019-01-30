import Joi from 'joi';

export const GET_ELECTION_BY_ID_SCHEME = Joi.object().keys({
    max: Joi.number().max(255),
    meta: Joi.string().max(10),
});
