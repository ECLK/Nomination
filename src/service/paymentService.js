import _ from 'lodash';
import { ServerError, ApiError } from 'Errors';
import Payment from '../repository/payment';
import PaymentRepo from '../repository/payment';
import { PaymentManager } from 'Managers';
import { NominationService } from 'Service';
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
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
      var payments = [];
      return PaymentManager.mapToPaymentModel(payments)
      // throw new ApiError("Payment not found",HTTP_CODE_404);
    }
  }catch (e){
		console.log(e);
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
	try {
		const id = uuidv4();
		const depositor = req.body.depositor;
		var depositDate = req.body.depositDate;
		// var depositDateInt = Date.parse(depositDate);
		var myDate = new Date(depositDate);
		var depositDateInt = myDate.getTime();
		const updatedAt = req.body.updatedAt;
		const createdAt = req.body.createdAt;
		const createdBy = req.body.createdBy;
		const amount = req.body.amount;
		const filePath = req.body.filePath;
		const status = req.body.status;
		const nominationId = req.body.nominationId;
		await NominationService.validateNominationId(nominationId);//TODO: yujith,re check this function
		const paymentData = { 'id': id, 'depositor': depositor, 'depositDate': depositDateInt, 'amount': amount, 'updatedAt': updatedAt, 'createdAt': createdAt, 'createdBy': createdBy, 'filePath': filePath, 'nominationId': nominationId, 'status': status };
		return await PaymentRepo.createPayment(paymentData);
	} catch (e) {
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
		const paymentId = req.params.paymentId;
		const updatedAt = req.body.updatedAt;
    const nominationId = req.params.nominationId;
    const paymentData = {'paymentId':paymentId,'depositor':depositor,'depositDate':depositDate, 'amount':amount, 'filePath':filePath, 'updatedAt':updatedAt, 'nominationId':nominationId};
    return await Payment.updatePaymentCommons(paymentData);
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }

};


//******************* Ec Admin End points ****************************


const getPaymentsByElectionId = async (req) => {
	try {
		const election_id = req.params.electionId;
		const payments = await PaymentRepo.fetchPaymentsByElectionId(election_id);
		if (!_.isEmpty(payments)){
			return PaymentManager.mapToPaymentModel(payments);
		} else {
			throw new ApiError("Payments not found");
		}
	} catch (error) {
		throw new ServerError("Server error", HTTP_CODE_404);
	}
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
	getPaymentByNominationId,
	updatePaymentStatusByNominationId,
	createPaymentByNominationId,
	updatePaymentByNominationId,
	getAllPendingPayments,
	getAllPaidPayments,
	getPaymentsByElectionId
}
