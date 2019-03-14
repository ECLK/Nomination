
import {Record} from 'typed-immutable';

export const ActiveElection =  Record({
  id: String(),
  name: String(),
  module_id: String(),
});
