
import {Record} from 'typed-immutable';

export const Candidate =  Record({
  id: String(),
  nic: String(),
  fullName: String(),
  preferredName: String(),
  dateOfBirth: Number(),
  gender: String(),
  occupation: String(),
  address: String(),
  electoralDivisionName: String(),
  electoralDivisionCode: String(),
  // counsilName: String(),
  // nominationId: String()
});