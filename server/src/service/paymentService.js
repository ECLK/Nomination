import _ from 'lodash';
import { ServerError, ApiError } from 'Errors';
import Payment from '../repository/payment';
import PaymentRepo from '../repository/payment';
import { PaymentManager } from 'Managers';
import { NominationService,SupportDocService } from 'Service';
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
import { executeTransaction } from '../repository/TransactionExecutor';
const uuidv4 = require('uuid/v4');


//******************* Party Secratary End points ****************************


//Get payment details for a particular nomination
const getPaymentByNominationId = async (req) => {
  try {
    const nominationId = req.params.nominationId;
    await NominationService.validateNominationId( nominationId );
    const payments = await PaymentRepo.fetchPaymentsByNominationId( nominationId );
    if(!_.isEmpty(payments)){
      return PaymentManager.mapToNominationPaymentModel(payments)
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
		return executeTransaction(async (transaction) => {
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
		const serialNo = req.body.serialNo;
		const filePath = req.body.filePath;
		const status = req.body.status
		const nominationId = req.body.nominationId;
		const filename = req.body.fileName;
    	const originalname = req.body.originalname;
		const realSerial = await getRealSerialNumber();
		await NominationService.validateNominationId(nominationId);//TODO: yujith,re check this function
		const paymentData = { 'id': id, 'depositor': depositor, 'depositDate': depositDateInt,'serialNo': realSerial, 'amount': amount, 'updatedAt': updatedAt, 'createdAt': createdAt, 'createdBy': createdBy, 'filePath': filePath, 'nominationId': nominationId, 'status': status };
		const supportDocData = {'filePath': filename, 'nominationId': nominationId,'originalName':originalname,'id':id  };
		await PaymentRepo.createPayment(paymentData,transaction);
		await SupportDocService.saveSupportDocsByPaymentId(supportDocData,transaction);
		return paymentData;
	});
	} catch (e) {
		throw new ServerError("server error");
	}
};

//Update payment details for a particular nomination
const updatePaymentByNominationId = async (req) => {
  try {
	return executeTransaction(async (transaction) => {
    const depositor = req.body.depositor;
    const depositDate = req.body.depositDate;
    const amount = req.body.amount;
    const filePath = req.body.filePath;
		const paymentId = req.params.paymentId;
		const updatedAt = req.body.updatedAt;
		const nominationId = req.body.nominationId;
		const note = req.body.note;
		const filename = req.body.fileName;
		const originalname = req.body.originalname;
		const paymentSdocId = req.body.paymentSdocId;
		const paymentData = {'paymentId':paymentId,'depositor':depositor,'depositDate':depositDate, 'amount':amount, 'filePath':filePath, 'updatedAt':updatedAt, 'nominationId':nominationId, 'note':note};
		const supportDocData = {'filePath': filename, 'nominationId': nominationId,'originalName':originalname,'id':paymentId ,'paymentSdocId':paymentSdocId };
	await Payment.updatePaymentCommons(paymentData,transaction);
	const sdocdata = await SupportDocService.updateSupportDocsByPaymentId(supportDocData,transaction);
	return paymentData;
	});
  }catch (e){
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
			return [];
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

const putPaymentsBypaymentId = async (req) => {
	try{
			return await PaymentRepo.updatePaymentStatus(req.params.paymentId, req.body.status);
	} catch (e) {
			throw new ServerError("server error");
	}
};

const savePaymentNoteBypaymentId = async (req) => {
	try{
			return await PaymentRepo.updatePaymentNote(req.params.paymentId, req.body.note);
	} catch (e) {
		console.log(e);
			throw new ServerError("server error");
	}
};

const getAllPayments = async (req) => {
	try {
		const divisionId = req.params.divisionId;
		const payments = await PaymentRepo.fetchAllPayments(divisionId);
		if (!_.isEmpty(payments)){
			return PaymentManager.mapToAllPaymentModel(payments);
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		throw new ServerError("Server error", HTTP_CODE_404);
	}
};

//-------------Start of get payment serial-------------
const getRealSerialNumber = async (req) => {
	try {
		return executeTransaction(async (transaction) => {
		let form =  'nomination_payment';
		const serialNo = await PaymentRepo.getSerialNumber(form,transaction);
		const realSerial = await validateSerial(serialNo[0].START+serialNo[0].NUM,form,transaction);

		if (!_.isEmpty(realSerial)){
			return realSerial;
		} else {
			return '';
		}
	});
	} catch (error) {
		throw new ServerError("Server error", HTTP_CODE_404);
	}
};

const validateSerial = async (serialNo,form,transaction) => {
	try {
		while(await checkSerial(serialNo,transaction)==false){
			await PaymentRepo.updateSerial(form,transaction);
			var res   =   await PaymentRepo.getSerialNumber(form,transaction);
			var serialNo   = res[0].START+res[0].NUM;  
		}

		if (!_.isEmpty(serialNo)){
			return serialNo;
		} else {
			return '';
		}
	} catch (error) {
		throw new ServerError("Server error", HTTP_CODE_404);
	}
};

const checkSerial = async (serialNo,transaction) => {
	try {
		const res    =  await PaymentRepo.getPaymentSerial(serialNo,transaction);

	if(res.length >0){
			return false;
	}else{
			return true;
	}
	} catch (error) {
		throw new ServerError("Server error", HTTP_CODE_404);
	}
};



//-------------End of get payment serial-------------

//validate payment by nomination id
const validatePaymentId = async (req) => {  
    try {
      const nominationId = req.params.nominationId;
	  const payment = await PaymentRepo.fetchPaymentByPaymentId( nominationId );
	  console.log("ssssssssssssssssss",payment);
      return payment;
    }catch (e){
		console.log(e);
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  
  };

export default {
	getPaymentByNominationId,
	updatePaymentStatusByNominationId,
	createPaymentByNominationId,
	updatePaymentByNominationId,
	getAllPendingPayments,
	getAllPaidPayments,
	getPaymentsByElectionId,
	putPaymentsBypaymentId,
	savePaymentNoteBypaymentId,
	getAllPayments,
	getRealSerialNumber,
	validatePaymentId
}
