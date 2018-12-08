
import {Record} from 'typed-immutable';

export const Candidate =  Record({
  id: String(),
  fullName: String(),
  occupation: String(),
  electoralDivisionName: String(),
  electoralDivisionCode: String(),
  nic: String(),
  dateOfBirth: Number(),
  gender: String(),
  address: String(),
  nominationId: String()
});