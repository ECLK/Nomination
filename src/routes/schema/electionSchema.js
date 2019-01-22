import Joi from 'joi';

export const GET_ELECTION_BY_ID_SCHEME = Joi.object().keys({
    max: Joi.string().max(36),
});
