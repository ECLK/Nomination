import _ from 'lodash';
import Nomination from '../repository/nomination';
import NominationRepo from '../repository/nomination';
import { HTTP_CODE_404 } from '../routes/constants/HttpCodes';
import { NominationManager } from 'Managers';
import {NominationService} from 'Service';
import { ServerError, ApiError } from 'Errors';
const uuidv4 = require('uuid/v4');


const getNominationByTeamId = async (req) => {
    const team_id = req.params.team_id;
    const election_id = req.params.election_id;
    return Nomination.fetchNominationByTeam(team_id, election_id);
};

const validateNominationId = async (req) => {  
    try {
      const nominationId = req;
      const nomination = await NominationRepo.fetchNominationByNominationId( nominationId );
     
      if(_.isEmpty(nomination)){
        throw new ApiError("Nomination not found");
      }
      return nomination;
    }catch (e){
      throw new ServerError("server error");
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
        console.log("rffffffffffe");
        if(!_.isEmpty(nomination)){
            return NominationManager.mapToNominationModel(nomination);
        } else {
            throw new ApiError("Election not found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

//Get second approve pending nomination list by electionId
const getPendingNominationsByElectionId = async (req) => {
    try {
      const electionId = req.params.electionId;
      const status = req.params.status;
      const params = {'electionId':electionId, "status":status }
      const nominations = await NominationRepo.fetchPendingNominationList( params );
      console.log("params",nominations);

      if(!_.isEmpty(nominations)){
        return NominationManager.mapToNominationModel(nominations)
      }else {
        throw new ApiError("Nominations not found",HTTP_CODE_404);
      }
    } catch (e){
      throw new ServerError("server error");
    }
  };

  //approve nomination by nomination id
const saveApproveNominationByNominationId = async (req) => {
    try {
      const id = uuidv4();
      const createdBy = req.body.createdBy;
      const createdAt = req.body.createdAt;
      const updatedAt = req.body.updatedAt;
      const status = req.body.status;
      const reviewNote = req.body.reviewNote;;
      const nominationId = req.params.nominationId;
    //   const now = new Date(dateOfBirth).getTime();
      const nomination = await NominationService.validateNominationId( nominationId );
      if(!_.isEmpty(nomination)){
        const nominationData = {'id':id, 'createdBy':createdBy,'createdAt':createdAt,'updatedAt':updatedAt, 'status':status, 'reviewNote':reviewNote, 'nominationId':nominationId};
        return await NominationRepo.createNominationStatus( nominationData );
      }else {
        throw new ApiError("Nomination not found");//TODO: error code will be added later
      }
    }catch (e){
      console.log(e);
      throw new ServerError("server error");
    }
  };


export default {
    getNominationByTeamId,
    getNominationByStatus,
    validateNominationId,
    getPendingNominationsByElectionId,
    saveApproveNominationByNominationId
};
