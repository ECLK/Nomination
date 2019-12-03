
import {Record,Maybe} from 'typed-immutable';

export const User =  Record({
  id: String(),
  name: String(),
  email: Maybe(String),
  party:String(),
  action:String()
});
