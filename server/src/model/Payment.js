
import {Record,Maybe} from 'typed-immutable';

 const Payment =  Record({
  payment_id: String(),
  depositor: String(),
  deposit_amount: Number(),
  amount: Number(),
  deposit_date: Number(),
  uploadedFilePath: String(),
  payment_status: String(),
  nomination_id: String(),
  createdBy: String(),
  createdAt: Number(),
  updatedAt: Number(),
  division_name: String(),
  candidate_payment: String(),
  team_name: String(),
  no_of_candidate: Number(),
  note: Maybe(String),
});

const NominationPayment =  Record({
  id: String(),
  depositor: String(),
  serialNo: String(),
  depositAmount: Number(),
  amount: Number(),
  depositeDate: String(),
  uploadedFilePath: String(),
  status: String(),
  nominationId: String(),
  createdBy: String(),
  createdAt: Number(),
  updatedAt: Number(),
  election: String(),
  team_id: String(),
  note: Maybe(String),
  originalName: Maybe(String),
  fileName: Maybe(String),
  paymentSdocId: Maybe(String),
});

const AllPayments =  Record({
  payment_id: String(),
  depositor: String(),
  serial: Maybe(String),
  deposit_amount: Number(),
  deposit_date: String(),
  nomination_id: String(),
  team_id: String(),
  division: String(),
  action:String()
});
export {
	Payment,
  NominationPayment,
  AllPayments
}