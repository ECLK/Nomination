import { getLogger } from 'log4js';
import { INTERNAL_ERROR } from 'ErrorCodes';
import { INTERNAL_ERROR_MSG } from 'ErrorMessages';
import { ApiError } from 'Errors';
import ErrorCodeMapper from '../routes/constants/ErrorCodeMapper';

const logger = getLogger('app');


export const initErrorMiddleware = (app) => {
  const ErrorMiddleware = (err, req, res, next) => {
    const output = {};
    logger.error(err);
    try {
      if (err instanceof ApiError) {
        output.code = err.code;
        output.message = err.message;
      } else {
        output.code = INTERNAL_ERROR;
        output.message = INTERNAL_ERROR_MSG;
      }

      output.additionalInfo = err.additionalInfo || null;
      res.status(ErrorCodeMapper.get(err.code) || ErrorCodeMapper.get(INTERNAL_ERROR)).send(output);
    } catch (e) {
      output.message = 'Internal Error';
      output.code = INTERNAL_ERROR;
      res.status(ErrorCodeMapper.get(INTERNAL_ERROR)).send(output);
    }
  };
  app.use(ErrorMiddleware);
};


