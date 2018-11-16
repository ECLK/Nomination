
import {Record} from 'typed-immutable';

export const Candidate =  Record({
  candidate_id: String(),
  full_name: String(),
  occupation: String(),
  candidate_electoral: String(),
  administrative_district: String(),
  nomination_id: String()
});