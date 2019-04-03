import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import SupportDocRepo from '../repository/supportdoc';
import {SupportDocManager}  from 'Managers'
import {HTTP_CODE_404} from '../routes/constants/HttpCodes';
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
    await SupportDocRepo.saveSupportDocs( supportdocs,transaction );
    await SupportDocRepo.updateNominationStatus( nominationId,transaction );
    return true;
  }catch (e){
    console.log(e);
    throw new ServerError("server error");
  }
};

//Update support documents for a particuler nomination in Draft level
const updateSupportDocsByNominationId = async (req) => {
  try {
    return executeTransaction(async (transaction) => {
    const nominationId = req.params.nominationId;
    const supportDoc = await SupportDocRepo.updateSupportDocs(nominationId,transaction);
    if(!_.isEmpty(supportDoc)){
      return saveSupportDocsByNominationId(req,transaction);
    }else {
      throw false;
    }
  });
  }catch (e){
    throw new ServerError("server error");
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
          supportdocs[i] = {'id':uuid, 'filePath':filename,'originalName':originalname,'supportDocConfDataId':id,'nominationId':nominationId, 'candidateId':nominationId,'status':'NEW'};
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

export default {
  getsupportDocsByNominationId,
  saveSupportDocsByNominationId,
  updateSupportDocsByNominationId,
  getsupportDocsByCategory,
  saveCandidateSupportDocsByCandidateId
}