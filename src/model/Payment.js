
import {Record} from 'typed-immutable';

export const Payment =  Record({
  id: String(),
  depositor: String(),
  deposit_amount: Number(),
  deposite_date: Date(),
  uploaded_file_name: String(),
  nomination_id: String(),
  status: String(),
});