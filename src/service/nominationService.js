import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import Nomination from '../repository/nomination';
import {NominationManager} from 'Managers';

const getNominationByTeamId = async (req) => {
    const team_id = req.params.team_id;
    const election_id = req.params.election_id;
    return Nomination.fetchNominationByTeam(team_id, election_id);
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
    getNominationByStatusApprove,
}