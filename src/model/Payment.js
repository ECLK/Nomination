
import {Record} from 'typed-immutable';

export const Payment =  Record({
  id: String(),
  depositor: String(),
  depositAmount: Number(),
  depositeDate: Number(),
  uploadedFilePath: String(),
  paymentStatus: String(),
  nominationId: String(),
});



