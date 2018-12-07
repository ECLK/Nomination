
import {Record} from 'typed-immutable';

export const SupportDoc =  Record({
  id: String(),
  supportDocConfDataId: String(),
  filePath: String(),
  nominationId: String()
});