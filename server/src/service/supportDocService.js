import _ from 'lodash';
import { ServerError , ApiError ,ValidationError} from 'Errors';
import SupportDocRepo from '../repository/supportdoc';
import { ValidationService } from 'Service';
import {SupportDocManager}  from 'Managers'
import {HTTP_CODE_404,HTTP_CODE_400} from '../routes/constants/HttpCodes';
import { executeTransaction } from '../repository/TransactionExecutor';
const uuidv4 = require('uuid/v4');



//Get support documents for a particuler nomination for Draft level
const getsupportDocsByNominationId = async (req) => {
    try {
      const nominationId = req.params.nominationId;
      const supportDocs = await SupportDocRepo.getSupportDocByNomination( nominationId );
      if(!_.isEmpty(supportDocs)){
        return SupportDocManager.mapToSupportDocModel(supportDocs)
      }else {
        throw new ApiError("Support Documents not found",HTTP_CODE_404);
      }
    }catch (e){
      console.log(e);
      throw new ServerError("server error");
    }
    
  };

  //Get support documents for a particuler candidate
const getsupportDocsByCandidateId = async (req) => {
  try {
    const candidateId = req.params.candidateId;
    const supportDocs = await SupportDocRepo.getSupportDocByCandidate( candidateId );
    if(!_.isEmpty(supportDocs)){
      return SupportDocManager.mapToCandidateSupportDocDataModel(supportDocs)
    }else {
      throw new ApiError("Support Documents not found",HTTP_CODE_404);
    }
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
  
};

  //Get support documents by category
const getsupportDocsByCategory = async (req) => {
  try {
    const category = req.params.category;
    const supportDocs = await SupportDocRepo.fetchSupportDocByCategory( category );
    if(!_.isEmpty(supportDocs)){
      return SupportDocManager.mapToCandidateSupportDocModel(supportDocs)
    }else {
      throw new ApiError("Support Documents not found",HTTP_CODE_404);
    }
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
  
};

//Save support documents for a particuler nomination
const saveSupportDocsByNominationId = async (req,transaction) => {
  try {
    var supportDocsData = req.body.candidateSupportDocs;
    var nominationId = req.body.nominationId;
    var i=0;
    var supportdocs = []; //TODO: yujith, validate supportDocConfDataId and nominationId and filePath
       for (var {id: id, filename: filename, originalname: originalname} of supportDocsData) {
          const uuid = uuidv4();
          supportdocs[i] = {'id':uuid, 'filePath':filename,'originalName':originalname,'supportDocConfDataId':id,'status':"NEW", 'nominationId':nominationId};
         i++;
       }
       if(supportdocs.length !== 0){
        await SupportDocRepo.saveSupportDocs( supportdocs,transaction );
        return true;
       }else{
        throw new ValidationError("Attachment unavailable!",HTTP_CODE_400);
       }
  }catch (e){
    throw new ValidationError(e.message,HTTP_CODE_400);
  }
};

//Update nomination status for a particuler nomination
const updateNominationStatusByNominationId = async (req) => {
  try {
    var nominationId = req.params.nominationId;
    const nominationUsage = await ValidationService.validateNominationStatus(req);
		if (nominationUsage[0].COUNT===0) {
			return await SupportDocRepo.updateNominationStatus( nominationId );
		  } else {
			throw new ValidationError("Nomination has been already approved!",HTTP_CODE_400);
		  }
  }catch (e){
	  throw new ValidationError(e.message,HTTP_CODE_400);
  }
};

//Update support documents for a particuler nomination in Draft level
const updateSupportDocsByNominationId = async (req) => {
  try {
    return executeTransaction(async (transaction) => {
    const nominationId = req.params.nominationId;
    const nominationUsage = await ValidationService.validateNominationStatus(req);
		if (nominationUsage[0].COUNT===0) {
      const supportDoc = await SupportDocRepo.updateSupportDocs(nominationId,transaction);
      if(!_.isEmpty(supportDoc)){
        return saveSupportDocsByNominationId(req,transaction);
      }else {
        throw false;
      }
		  } else {
			throw new ValidationError("Nomination has been already approved!",HTTP_CODE_400);
      }
   
  });
  }catch (e){
    throw new ValidationError(e.message,HTTP_CODE_400);
  }

};

//Save support documents for a particuler Candidate
const saveCandidateSupportDocsByCandidateId = async (req) => {
  try {
    return executeTransaction(async (transaction) => {
    var supportDocsData = req.body.candidateSupportDocs;
    var nominationId = req.body.nominationId;
    var candidateId = req.body.candidateId;

    var i=0;
    var supportdocs = []; //TODO: yujith, validate supportDocConfDataId and nominationId and filePath
       for (var {id: id, filename: filename, originalname: originalname} of supportDocsData) {
          const uuid = uuidv4();
          supportdocs[i] = {'id':uuid, 'filePath':filename,'originalName':originalname,'supportDocConfDataId':id,'nominationId':nominationId, 'candidateId':candidateId,'status':'NEW'};
         i++;
       }
    await SupportDocRepo.updateCandidateSupportingDocs( candidateId,transaction );
    await SupportDocRepo.saveCandidateSupportDocs( supportdocs,transaction );
    return true;
      });
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
};

const validateSupportDocId = async (req) => {  
  try {
    const supportDocId = req;
    const nomination = await NominationRepo.fetchSupportDocId( supportDocId );
    if(_.isEmpty(nomination)){
      throw new ApiError("Nomination not found");
    }
  }catch (e){
    throw new ServerError("server error");
  }

};

//Save support documents for a particuler nomination
const saveSupportDocsByPaymentId = async (req,transaction) => {
  try {
    const filename = req.filePath;
    const paymentId = req.id;
    const originalname = req.originalName;
     //TODO: yujith, validate  and paymentId and filePath
          const uuid = uuidv4();
         const supportdocs = {'id':uuid,'originalName':originalname, 'filePath':filename, 'paymentId':paymentId,'status':"NEW"};
       if(supportdocs !== 0 || supportdocs !== null){
        await SupportDocRepo.savePaymentSupportDocs( supportdocs,transaction );
        return true;
       }else{     
        throw new ValidationError("Attachment unavailable!",HTTP_CODE_400);
       }
  }catch (e){
    throw e;
    throw new ValidationError(e.message,HTTP_CODE_400);
  }
};

//Save support documents for a particuler nomination
const updateSupportDocsByPaymentId = async (req,transaction) => {
  try {
    const filename = req.filePath;
    const paymentId = req.id;
    const originalname = req.originalName;
    const paymentSdocId = req.paymentSdocId;
     //TODO: yujith, validate  and paymentId and filePath
          const uuid = uuidv4();
         const supportdocs = {'id':uuid,'originalName':originalname, 'filePath':filename, 'paymentId':paymentId,'status':"NEW"};
       if(supportdocs !== 0 || supportdocs !== null){
        await SupportDocRepo.updatePaymentSupportDocs( paymentSdocId,supportdocs,transaction );
        return true;
       }else{     
        throw new ValidationError("Attachment unavailable!",HTTP_CODE_400);
       }
  }catch (e){
    throw new ValidationError(e.message,HTTP_CODE_400);
  }
};


//Get support documents for a particular payment
const getSupportDocsByPaymentId = async (req) => {
    try {
        const paymentId = req.params.paymentId;
        const supportDocs = await SupportDocRepo.getSupportDocByPayment(paymentId);
        if(!_.isEmpty(supportDocs)){
            return supportDocs
        }else {
            throw new ApiError("Support Documents not found",HTTP_CODE_404);
        }
    }catch (e){
        throw new ServerError("server error");
    }

};


//Get support documents for a particular candidate by document id
const getSupportDocsByCandidateIdAndDocId = async (req) => {
    try {
        const documentId = req.params.documentId;
        const candidateId = req.params.candidateId;
        const supportDocs = await SupportDocRepo.getSupportDocByCandidateIdAndDocId(documentId, candidateId);
        if(!_.isEmpty(supportDocs)){
            return supportDocs
        }else {
            throw new ApiError("Support Documents not found",HTTP_CODE_404);
        }
    }catch (e){
        throw new ServerError("server error");
    }

};

//Get support documents for a particular nomination by document id
const getSupportDocByNominationIdAndDocId = async (req) => {
    try {
        const documentId = req.params.documentId;
        const nominationId = req.params.nominationId;
        const supportDocs = await SupportDocRepo.getSupportDocByNominationIdAndDocId(documentId, nominationId);
        if(!_.isEmpty(supportDocs)){
            return supportDocs
        }else {
            throw new ApiError("Support Documents not found",HTTP_CODE_404);
        }
    }catch (e){
        throw new ServerError("server error");
    }

};

export default {
  getsupportDocsByNominationId,
  saveSupportDocsByNominationId,
  updateSupportDocsByNominationId,
  getsupportDocsByCategory,
  saveCandidateSupportDocsByCandidateId,
  getsupportDocsByCandidateId,
  updateNominationStatusByNominationId,
  saveSupportDocsByPaymentId,
  updateSupportDocsByPaymentId,
    getSupportDocsByPaymentId,
    getSupportDocsByCandidateIdAndDocId,
    getSupportDocByNominationIdAndDocId,
}