import { INTERNAL_ERROR } from 'ErrorCodes';

//TODO: Log error
const ErrorMiddleware = (err, req, res, next) => {
  const output = {};

  try {
    output.message = err.message;
    output.name = err.name;
    output.code = err.code;
    res.status(err.httpCode).send(output);
  } catch (e){
    output.name = 'InternalError';
    output.code = INTERNAL_ERROR;
    res.status(500).send(output);
  }
};

export default ErrorMiddleware;