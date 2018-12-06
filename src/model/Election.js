
import {Record} from 'typed-immutable';

export const Election =  Record({
  id: String(),
  name: String(),
  module_id: String(),
});
