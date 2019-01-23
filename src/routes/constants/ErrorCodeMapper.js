import { Map } from 'typed-immutable';
import { HTTP_CODE_500, HTTP_CODE_400 } from 'HttpCodes';
import {
  INTERNAL_ERROR,
  DIVISION_NOT_FOUND_CODE,
} from '../../errors/ErrorCodes';

const ErrorCodeMapper = new Map(Number, Number)()
  .set(INTERNAL_ERROR, HTTP_CODE_500)
  .set(DIVISION_NOT_FOUND_CODE, HTTP_CODE_400);

export default ErrorCodeMapper;

