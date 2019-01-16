
import {Record} from 'typed-immutable';

export const Division =  Record({
  id: String(),
  name: String(),
  code: String(),
  no_of_candidates: Number(),
  module_id: String(),
});
