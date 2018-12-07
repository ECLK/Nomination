import _ from 'lodash';
import Payment from '../repository/payment';
import PaymentRepo from '../repository/payment';
import {PaymentManager}  from 'Managers';
const uuidv4 = require('uuid/v4');

//******************* Party Secratary End points ****************************

//Get payment details for a particular nomination
const getPaymentByNominationId = async (req) => {
  try {
    const nominationId = req.params.nominationId;
    const payments = await PaymentRepo.getByNominationId( nominationId );
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

//Save payment details for a particular nomination
const createPaymentByNominationId = async (req) => {
  try {
    const id = uuidv4();
    const depositor = req.body.depositor;
    const depositDate = req.body.depositDate;
    const amount = req.body.amount;
    const filePath = req.body.filePath;
    const status = req.body.status;
    const nominationId = req.body.nominationId;
    const paymentData = {'id':id, 'depositor':depositor,'depositDate':depositDate, 'amount':amount, 'filePath':filePath, 'nominationId':nominationId, 'status':status};
    payments = await PaymentRepo.createPayment( paymentData );
    // if(!_.isEmpty(payments)){
    //   return "Payment Succesfull!"
    // }else {
    //   throw new ApiError("Payment Unsuccesfull!");
    // }
  }catch (e){
    throw new ServerError("server error");
  }

};

//Update payment details for a particular nomination
const updatePaymentByNominationId = async (req) => {
  try {
    const depositor = req.body.depositor;
    const depositDate = req.body.depositDate;
    const amount = req.body.amount;
    const filePath = req.body.filePath;
    const nominationId = req.params.nominationId;
    const paymentData = {'depositor':depositor,'depositDate':depositDate, 'amount':amount, 'filePath':filePath, 'nominationId':nominationId};
    const payment = Payment.updatePaymentCommons(paymentData);
    if(!_.isEmpty(payment)){
      return "Update Succesfull!"
    }else {
      throw new ApiError("Update Unsuccesfull!");
    }
  }catch (e){
    throw new ServerError("server error");
  }

};


//******************* Ec Admin End points ****************************


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







export default {
  getAllPayments,
  getPaymentByNominationId,
  updatePaymentStatusByNominationId,
  createPaymentByNominationId,
  updatePaymentByNominationId,
  getAllPendingPayments,
  getAllPaidPayments,
}