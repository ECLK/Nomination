
import {Record} from 'typed-immutable';

const SupportDoc =  Record({
  id: String(),
  supportDocConfId: String(),
  originalName: String(),
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

const CandidateSupportDocData =  Record({
  id: String(),
  originalname: String(),
  filename: String(),
});

export {
  SupportDoc,
  CandidateSupportDoc,
  CandidateSupportDocData
}