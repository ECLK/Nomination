import { inherits, inspect } from 'util';

export const errorCodes = {
  DEFAULT: 1,
  FUNCTIONAL: 2,
};

Error.extend = function (name, httpCode = 500) {
  var ErrorType = (function (message = '', code = errorCodes.DEFAULT, data = {}, httpErrorCode) {

    if (! (this instanceof ErrorType)) {
      return new ErrorType(message, code, data, httpErrorCode);
    }
    this.name = name;
    this.code = code;
    this.data = data;
    this.httpCode = httpErrorCode || httpCode;
    this.message = JSON.stringify(this);
    
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  });

  inherits(ErrorType, this);

  ErrorType.prototype.toString = function () {
    return this.name + ': ' + inspect(this.message);
  };

  ErrorType.extend = this.extend;
  return ErrorType;
};

export const ApiError = Error.extend('ApiError');
// Connected to the server, however 400,500 range error is thrown
export const ServerError = ApiError.extend('ServerError');
export const NetworkError = ApiError.extend('NetworkError');// can not connect to the server.Netwrok unreachable
export const ValidationError = ApiError.extend('ValidationError', 400);// validation error
export const DBError = ApiError.extend('DBError');//
export const InternalError = ApiError.extend('InternalError');
export const PermissionError = ApiError.extend('PermissionError');
export const MerchantError = ApiError.extend('MerchantErrror', 400);
export const AuthenticationError = ApiError.extend('AuthenticationError', 400);
export const InputParameterError = ApiError.extend('InputParameterError', 400);

