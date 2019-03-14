
import {Record} from 'typed-immutable';

export const Payment =  Record({
  id: String(),
  depositor: String(),
  depositAmount: Number(),
  depositeDate: Number(),
  uploadedFilePath: String(),
  status: String(),
  nominationId: String(),
  createdBy: String(),
  createdAt: Number(),
  updatedAt: Number()
});


