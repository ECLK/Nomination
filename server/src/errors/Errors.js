import { inherits, inspect } from 'util';
import { HTTP_CODE_400, HTTP_CODE_404, HTTP_CODE_500 } from 'HttpCodes';

Error.extend = function (name, httpCode = HTTP_CODE_500) {

  const ErrorType = (function (message = '', code, additionalInfo, httpErrorCode) {
    if (!(this instanceof ErrorType)) {
      return new ErrorType(message, code, additionalInfo, httpErrorCode);
    }
    this.name = name;
    this.code = code;
    this.httpCode = httpErrorCode || httpCode;
    this.message = message;
    this.additionalInfo = additionalInfo;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    return this;
  });

  inherits(ErrorType, this);

  ErrorType.prototype.toString = function () {
    return `${this.name}: ${inspect(this.message)}`;
  };

  ErrorType.extend = this.extend;
  return ErrorType;
};

export const ApiError = Error.extend('ApiError', HTTP_CODE_404);
// Connected to the server, however 400,500 range error is thrown
export const ServerError = Error.extend('ServerError');
export const NetworkError = Error.extend('NetworkError');// can not connect to the server.Netwrok unreachable
export const ValidationError = ApiError.extend('ValidationError', HTTP_CODE_400);// validation error
export const DBError = Error.extend('DBError', HTTP_CODE_500);//
export const InternalError = Error.extend('InternalError');
export const PermissionError = Error.extend('PermissionError');
export const AuthenticationError = Error.extend('AuthenticationError', HTTP_CODE_400);
export const InputParameterError = Error.extend('InputParameterError', HTTP_CODE_400);

