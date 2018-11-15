
import {Record} from 'typed-immutable';

export const User =  Record({
  id: Number(),
  name: String(),
});