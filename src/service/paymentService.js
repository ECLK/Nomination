import _ from 'lodash';
import Payment from '../repository/payment';
import PaymentRepo from '../repository/payment';
import {PaymentManager}  from 'Managers';
const uuidv4 = require('uuid/v4');


const getAllPayments = async () => {
  return Payment.getAll();
};


const getAllPendingPayments = async (req) => {
  const election_id = req.params.election_id;
  return Payment.getPendingAll(election_id);
}

const getAllPaidPayments = async (req) => {
  const election_id = req.params.election_id;
  return Payment.getPaidAll(election_id);
}


//NEW
const getPaymentByNominationId = async (req) => {
  try {
    const nominationId = req.params.nominationId;
    const payments = await PaymentRepo.getByNominationId( nominationId );
    console.log("------------>>",payments);
    if(!_.isEmpty(payments)){
      return PaymentManager.mapToPaymentModel(payments)
    }else {
      throw new ApiError("Payment not found");
    }
  }catch (e){
    throw new ServerError("server error");
  }

};

const updatePaymentStatusByNominationId = async (nomination_id, status) => {
  return Payment.updateStatusByNominationId(nomination_id, status);
};

const createPaymentByNominationId = async(req) => {
  const id = uuidv4();
  const depositor = req.body.depositor;
  const deposit_amount = req.body.deposit_amount;
  const deposite_date = req.body.deposite_date;
  const uploaded_file_name = req.body.uploaded_file_name;
  const nomination_id = req.body.nomination_id;
  const status = req.body.status;
  return Payment.createPayment( id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, status);
}

const updatePaymentByNominationId = async (req) => {
  const depositor = req.body.depositor;
  const deposit_amount = req.body.deposit_amount;
  const deposite_date = req.body.deposite_date;
  const uploaded_file_name = req.body.uploaded_file_name;
  const nomination_id = req.body.nomination_id;
  return Payment.updatePaymentCommons(depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id);
}


// const updatePaymentByPaymentId = async (req) => {
//   const payment_id = req.body.payment_id;
//   const depositor = req.body.depositor;
//   const deposit_amount = req.body.deposit_amount;
//   const deposite_date = req.body.deposite_date;
//   const uploaded_file_name = req.body.deposite_date;
//   const nomination_id = req.body.nomination_id;
//   const payment_status = req.body.payment_status;
//   return Payment.createPayment( payment_id, depositor, deposit_amount, deposite_date, uploaded_file_name, nomination_id, payment_status);
// };

// const getPaymentByPaymentId = async (req) => {
//   const payment_id = req.params.payment_id;
//   return Payment.fetchPaymentById( payment_id );
// };





export default {
  getAllPayments,
  getPaymentByNominationId,
  updatePaymentStatusByNominationId,
  createPaymentByNominationId,
  updatePaymentByNominationId,
  getAllPendingPayments,
  getAllPaidPayments,
  // getPaymentByPaymentId,
  // updatePaymentByPaymentId,
}