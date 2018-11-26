import { Map } from 'typed-immutable';
import { HTTP_CODE_500 } from 'HttpCodes';
import {
  INTERNAL_ERROR,
} from '../../errors/ErrorCodes';

const ErrorCodeMapper = new Map(Number, Number)()
  .set(INTERNAL_ERROR, HTTP_CODE_500);

export default ErrorCodeMapper;

