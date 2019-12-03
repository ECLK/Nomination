import Joi from 'joi';
import { ValidationError } from 'Errors';
import { INVALID_REQUEST_QUERY_PARAMETER, INVALID_REQUEST_BODY_PARAMETER } from 'ErrorCodes';
import { INVALID_PARAMETERS_MSG } from 'ErrorMessages';
import { GET, POST, PUT } from 'HttpMethods';
import { URL_SCHEMA } from '../routes/constants/URLSchema';

export const ValidatorMiddleware = (schema, method) => {
  return (req, res, next) => {
    validateURLParams(req.params);

    if (schema) validateBodyOrQueryParams(req, method, schema, next);
    else next();
  };
};

const validateURLParams = (params) => {
  Joi.validate(params, URL_SCHEMA, (err) => {
    if (err) {
      const details = err.details[0];
      throw new ValidationError(`${INVALID_PARAMETERS_MSG}. ${details.message}`, INVALID_REQUEST_QUERY_PARAMETER);
    }
  });
};

const validateBodyOrQueryParams = (req, method, schema, next) => {
  let params = req.query;
  if (method.toLowerCase() === GET) {
    params = req.query;
  } else if (method.toLowerCase() === POST || method.toLowerCase() === PUT) {
    params = req.body;
  }

  Joi.validate(params, schema, (err) => {
    if (err) {
      const details = err.details[0];
      const errorCode = method.toLowerCase() === GET
        ? INVALID_REQUEST_QUERY_PARAMETER : INVALID_REQUEST_BODY_PARAMETER;
      throw new ValidationError(`${INVALID_PARAMETERS_MSG}. ${details.message}`, errorCode);
    }
    next();
  });
};
