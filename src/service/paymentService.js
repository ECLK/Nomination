import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import Payment from '../repository/payment';
import PaymentRepo from '../repository/payment';
import {PaymentManager}  from 'Managers';
import {NominationService} from 'Service';
import {HTTP_CODE_404,HTTP_CODE_204} from '../routes/constants/HttpCodes';
const uuidv4 = require('uuid/v4');


//******************* Party Secratary End points ****************************


//Get payment details for a particular nomination
const getPaymentByNominationId = async (req) => {
  try {
    const nominationId = req.params.nominationId;
    await NominationService.validateNominationId( nominationId );
    const payments = await PaymentRepo.fetchPaymentsByNominationId( nominationId );
    if(!_.isEmpty(payments)){
      return PaymentManager.mapToPaymentModel(payments)
    }else {
      throw new ApiError("Payment not found",HTTP_CODE_404);
    }
  }catch (e){
    throw new ServerError("server error");
  }

};


const updatePaymentStatusByNominationId = async (req) => {
	var nomination_id = req.body.nomination_id;
	var status = req.body.status;
	return Payment.updateStatusByNominationId(nomination_id, status);
};

//Save payment details for a particular nomination
const createPaymentByNominationId = async (req) => {
  console.log("---------",req.body);
  try {
    const id = uuidv4();
    const depositor = req.body.depositor;
    const depositDate = req.body.depositDate;
    const amount = req.body.amount;
    const filePath = req.body.filePath;
    const status = req.body.status;
    const nominationId = req.body.nominationId;
    await NominationService.validateNominationId( nominationId );//TODO: yujith,re check this function
    const paymentData = {'id':id, 'depositor':depositor,'depositDate':depositDate, 'amount':amount, 'filePath':filePath, 'nominationId':nominationId, 'status':status};
    return await PaymentRepo.createPayment( paymentData );
  }catch (e){
    console.log(e);
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
    return await Payment.updatePaymentCommons(paymentData);
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