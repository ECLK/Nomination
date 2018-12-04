
import {Record} from 'typed-immutable';

export const Candidate =  Record({
  ID: String(),
  FULL_NAME: String(),
  OCCUPATION: String(),
  ELECTORAL_DIVISION_NAME: String(),
  ELECTORAL_DIVISION_CODE: String(),
  NOMINATION_ID: String()
});