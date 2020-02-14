import _ from 'lodash';
import Nomination from '../repository/nomination';
import NominationRepo from '../repository/nomination';
import { NominationManager } from 'Managers';
import {NominationService} from 'Service';
import { ServerError, ApiError } from 'Errors';
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
import { executeTransaction } from '../repository/TransactionExecutor';
const uuidv4 = require('uuid/v4');


const getNominationByTeamId = async (req) => {
    const team_id = req.params.team_id;
    const election_id = req.params.election_id;
    return Nomination.fetchNominationByTeam(team_id, election_id);
};

const validateNominationId = async (req,transaction) => {  
    try {
      const nominationId = req;
      const nomination = await NominationRepo.fetchNominationByNominationId( nominationId,transaction );
     
      if(_.isEmpty(nomination)){
        throw new ApiError("Nomination not found", HTTP_CODE_204);
      }
      return nomination;
    }catch (e){
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  
  };

  
/**
 * Method to get list of nominations for particular team under particular election
 * @param {teamId, electionId, status} req 
 */
const getNominationByStatus = async (req) => {
    try {
        const team_id = req.params.teamId;
        const election_id = req.params.electionId;
        const status = String(req.params.status).toUpperCase();
        const nomination = await Nomination.fetchNominationByStatus(election_id, team_id, status);
        if(!_.isEmpty(nomination)){
            return NominationManager.mapToNominationModel(nomination);
        } else {
            throw new ApiError("Election not found", HTTP_CODE_204);
        }
    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
};

//Get second approve pending nomination list by electionId
const getPendingNominationsByElectionId = async (req) => {
    try {
      const electionId = req.params.electionId;
      const status = req.params.status;
      const teamId = req.params.teamId;
      const divisionId = req.params.divisionId;

      const params = {'electionId':electionId, "status":status, "teamId":teamId,"divisionId":divisionId }
      const nominations = await NominationRepo.fetchPendingNominationList( params );

      if(!_.isEmpty(nominations)){
        return NominationManager.mapToNominationModel(nominations)
      }else {
        // throw new ApiError("Nominations not found", HTTP_CODE_204);
        return [];
      }
    } catch (e){
      console.log(e);
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  };

  //approve nomination by nomination id
const saveApproveNominationByNominationId = async (req) => {
    try {
      return executeTransaction(async (transaction) => {
      const id = uuidv4();
      const createdBy = req.body.createdBy;
      const createdAt = req.body.createdAt;
      const updatedAt = req.body.updatedAt;
      const status = req.body.status;
      const reviewNote = req.body.reviewNote;;
      const nominationId = req.params.nominationId;
    //   const now = new Date(dateOfBirth).getTime();
      const nomination = await NominationService.validateNominationId( nominationId,transaction );
      if(!_.isEmpty(nomination)){
        const nominationData = {'id':id, 'createdBy':createdBy,'createdAt':createdAt,'updatedAt':updatedAt, 'status':status, 'reviewNote':reviewNote, 'nominationId':nominationId};
        return await NominationRepo.createNominationStatus(nominationId, nominationData,transaction );
          
      }else {
        throw new ApiError("Nomination not found", HTTP_CODE_204);
      }
    });
    }catch (error){
      console.log(error);
      throw new ServerError("Server error", HTTP_CODE_404);
    }
  };
//Get nomination payment status by electionId
const getNominationPaymentStatusByElectionId = async (req) => {
  try {
    const electionId = req.params.electionId;

    const params = {'electionId':electionId }
    const nominations = await NominationRepo.fetchNominationPaymentStatus( params );

    if(!_.isEmpty(nominations)){
      return nominations[0].payment_status;
    }else {
      return null;
    }
  } catch (e){
    console.log(e);
    throw new ServerError("Server error", HTTP_CODE_404);
  }
};

//Get nomination data for nomination payment by nomination id
const getNominationDataByNominationId = async (req) => {
  try {
    const nominationId = req.params.nominationId;
    const keyName = req.params.keyName;

    const params = {'nominationId':nominationId,'keyName':keyName }
    const nominations = await NominationRepo.fetchNominationData( params );

    if(!_.isEmpty(nominations)){
      return nominations;
    }else {
      return null;
    }
  } catch (e){
    console.log(e);
    throw new ServerError("Server error", HTTP_CODE_404);
  }
};

export default {
    getNominationByTeamId,
    getNominationByStatus,
    validateNominationId,
    getPendingNominationsByElectionId,
    saveApproveNominationByNominationId,
    getNominationPaymentStatusByElectionId,
    getNominationDataByNominationId
};
