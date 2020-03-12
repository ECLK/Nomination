import { ServerError, ApiError } from 'Errors';
import validationRepo from '../repository/validation';
import {HTTP_CODE_404,HTTP_CODE_204} from '../routes/constants/HttpCodes';
import { ModuleManager } from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');





const validateElectionsByElectionName = async (req) => {
	let exist = '';

	if(req.params.electionName){
		exist = await validationRepo.fetchElectionCount(req.params.electionName);
	}
	if (!_.isEmpty(exist)) {
		if(exist[0].COUNT>0){
			return true;
		}else{
			return false;
		}
	} else {
		throw new ApiError("election name is not found");
	}
};

const validatePartyByPartyName = async (req) => {
	let exist = '';

	if(req.params.partyName){
		exist = await validationRepo.fetchPartyCount(req.params.partyName);
	}
	if (!_.isEmpty(exist)) {
		if(exist[0].COUNT>0){
			return true;
		}else{
			return false;
		}
	} else {
		throw new ApiError("party name is not found");
	}
};

const validateTemplateByTemplateName = async (req) => {

	let exist = '';
	if(req.params.templateName){
		exist = await validationRepo.fetchTemplateCount(req.params.templateName);
	}
	if (!_.isEmpty(exist)) {
		if(exist[0].COUNT>0){
			return true;
		}else{
			return false;
		}
	} else {
		throw new ApiError("template name is not found");
	}
};

const validateElectionStatus = async (req) => {  
    try {
	  const electionId = req.params.electionId;
	  // Since nomination payment has to be done first in nomination process 
	  // we can assium election has been used if there are any payments for that election
      const payments = await validationRepo.fetchPaymentsByElectionId( electionId );
     console.log("paymentspaymentspaymentspaymentspayments",payments);
      if(payments>0){
        throw new ApiError("Election has been used", HTTP_CODE_204);
      }
      return payments;
    }catch (e){
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  };

  const validateElectionTemplateStatus = async (req) => {  
    try {
	  const moduleId = req.params.moduleId;
      const res = await validationRepo.fetchTemplatesByModuleId( moduleId );
     console.log("paymentspaymentspaymentspaymentspayments",res);
      if(res>0){
        throw new ApiError("Election template has been used", HTTP_CODE_204);
      }
      return res;
    }catch (e){
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  };

  const validateNominationStatus = async (req) => {  
    try {
	  const nominationId = req.params.nominationId;
	  console.log("paymentspaymentspaymentspaymentspayments",nominationId);

      const res = await validationRepo.fetchNominationsByNominationId( nominationId );
     console.log("paymentspaymentspaymentspaymentspayments",res);
      if(res>0){
        throw new ApiError("Nomination has been approved", HTTP_CODE_204);
      }
      return res;
    }catch (e){
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  };

export default {
	validateElectionsByElectionName,
	validateTemplateByTemplateName,
	validateElectionStatus,
	validateElectionTemplateStatus,
	validateNominationStatus,
	validatePartyByPartyName
}