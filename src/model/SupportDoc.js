
import {Record} from 'typed-immutable';

const SupportDoc =  Record({
  id: String(),
  supportDocConfDataId: String(),
  filePath: String(),
  keyName: String(),
  nominationId: String(),
  status: String(),
});

const CandidateSupportDoc =  Record({
  id: String(),
  keyName: String(),
  description: String(),
  docCategory: String(),
});

export {
  SupportDoc,
  CandidateSupportDoc,
}