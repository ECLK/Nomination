import _ from 'lodash';
import Nomination from '../repository/nomination';
import { NominationManager } from 'Managers';
import { ServerError, ApiError } from 'Errors';

const getNominationByTeamId = async (req) => {
    const team_id = req.params.team_id;
    const election_id = req.params.election_id;
    return Nomination.fetchNominationByTeam(team_id, election_id);
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
            throw new ApiError("Election not found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}


// const getNominationsByElectionId = async (req) => 


export default {
    getNominationByTeamId,
    getNominationByStatus,
};