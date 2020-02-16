
import {Record,Maybe} from 'typed-immutable';

export const Candidate =  Record({
  id: String(),
  configId: String(),
  keyName: String(),
  value: Maybe(String())
});