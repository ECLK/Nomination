
import {Record} from 'typed-immutable';

export const Candidate =  Record({
  id: String(),
  nic: String(),
  fullName: String(),
  preferredName: String(),
  dateOfBirth: String(),
  gender: String(),
  occupation: String(),
  address: String(),
  electoralDivisionName: String(),
  electoralDivisionCode: String(),
  action: String(),
  // counsilName: String(),
  // nominationId: String()
});