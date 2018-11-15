
import {Record} from 'typed-immutable';

export const Payment =  Record({
  payment_id: String(),
  depositor: String(),
  deposit_amount: Number(),
  deposite_date: Date(),
  uploaded_file_name: String(),
  nomination_id: Number()
});