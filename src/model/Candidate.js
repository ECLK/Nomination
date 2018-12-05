
import {Record} from 'typed-immutable';

export const Candidate =  Record({
  id: String(),
  fullName: String(),
  occupation: String(),
  electoralDivisionName: String(),
  electoralDivisionCode: String(),
  nominationId: String()
});