
import {Record} from 'typed-immutable';

export const Team =  Record({
  id: String(),
  name: String(),
  symbol: String(),
  telephone: String(),
  fax: String(),
  nameOfAuthorozedMember: String(),
  addressOfAuthorozedMember: String(),
});