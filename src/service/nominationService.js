import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import Nomination from '../repository/nomination';
import NominationRepo from '../repository/nomination';
import {HTTP_CODE_404} from '../routes/constants/HttpCodes';
import {NominationManager} from 'Managers';

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

const getNominationByStatusApprove = async (req) => {
    try {
        const team_id = req.params.teamId;
        const election_id = req.params.electionId;
        const nomination = Nomination.fetchNominationByStatusApprove(election_id, team_id);
        if(!_.isEmpty(nomination)){
            // TODO: incomplete
            return nomination;
        }
    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

export default {
    getNominationByTeamId,
    validateNominationId,
    getNominationByStatusApprove,
}