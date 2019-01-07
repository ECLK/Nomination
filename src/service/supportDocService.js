import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import SupportDocRepo from '../repository/supportdoc';
import {SupportDocManager}  from 'Managers'
import {HTTP_CODE_404} from '../routes/constants/HttpCodes';
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
      throw new ServerError("server error");
    }
    
  };

//Save support documents for a particuler nomination
const saveSupportDocsByNominationId = async (req) => {
  try {
    var supportDocsData = req.body.candidateSupportDocs;
    var i=0;
    var supportdocs = []; //TODO: yujith, validate supportDocConfDataId and nominationId and filePath
       for (var {supportDocConfDataId: supportDocConfDataId, filePath: filePath,nominationId: nominationId} of supportDocsData) {
          const id = uuidv4();
          supportdocs[i] = {'id':id, 'filePath':filePath,'supportDocConfDataId':supportDocConfDataId,'status':"NEW", 'nominationId':nominationId};
         i++;
       }
   return await SupportDocRepo.saveSupportDocs( supportdocs );
  }catch (e){
    throw new ServerError("server error");
  }
};

//Update support documents for a particuler nomination in Draft level
const updateSupportDocsByNominationId = async (req) => {
  try {
    const nominationId = req.params.nominationId;
    var supportDocsData = req.body.candidateSupportDocs;
    var i=0;
    var supportdocs = []; //TODO: yujith, validate supportDocConfDataId and nominationId and filePath
       for (var {supportDocConfDataId: supportDocConfDataId, filePath: filePath,nominationId: nominationId} of supportDocsData) {
          // const id = uuidv4();
          supportdocs[i] = {'filePath':filePath,'supportDocConfDataId':supportDocConfDataId, 'nominationId':nominationId};
         i++;
       }
    const supportDoc = await SupportDocRepo.updateSupportDocs(nominationId);
    if(!_.isEmpty(supportDoc)){
      return saveSupportDocsByNominationId(req);
    }else {
      throw false;
    }
  }catch (e){
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
  updateSupportDocsByNominationId
}