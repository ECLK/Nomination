import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import SupportDocRepo from '../repository/supportdoc';
import {SupportDocManager}  from 'Managers'
const uuidv4 = require('uuid/v4');



//Get support documents for a particuler nomination for Draft level
const getsupportDocsByNominationId = async (req) => {
    try {
      const nominationId = req.params.nominationId;
      const supportDocs = await SupportDocRepo.getSupportDocByNomination( nominationId );

      if(!_.isEmpty(supportDocs)){
        return SupportDocManager.mapToSupportDocModel(supportDocs)
      }else {
        throw new ApiError("Support Documents found");
      }
    }catch (e){
      throw new ServerError("server error");
    }
    
  };

//Save support documents for a particuler nomination
const saveSupportDocsByNominationId = async (req) => {
  try {
    const id = uuidv4();
    const supportDocConfDataId = req.body.supportDocConfDataId;
    const filePath = req.body.filePath;
    const nominationId = req.body.nominationId;
    const supportDocsData = {'id':id, 'supportDocConfDataId':supportDocConfDataId, 'filePath':filePath, 'nominationId':nominationId};
    supportDocs = await SupportDocRepo.saveSupportDocs( supportDocsData );
    // if(!_.isEmpty(payments)){
    //   return "Payment Succesfull!"
    // }else {
    //   throw new ApiError("Payment Unsuccesfull!");
    // }
  }catch (e){
    throw new ServerError("server error");
  }

};

//Update support documents for a particuler nomination in Draft level
const updateSupportDocsByNominationId = async (req) => {
  try {
    const supportDocConfDataId = req.body.supportDocConfDataId;
    const filePath = req.body.filePath;
    const nominationId = req.params.nominationId;
    const supportDocsData = {'supportDocConfDataId':supportDocConfDataId, 'filePath':filePath, 'nominationId':nominationId};
    const supportDocs = SupportDocRepo.updateSupportDocs(supportDocsData);
    if(!_.isEmpty(supportDocs)){
      return "Update Succesfull!"
    }else {
      throw new ApiError("Update Unsuccesfull!");
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