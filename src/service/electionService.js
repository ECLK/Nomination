import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import ElectionRepo from '../repository/election';
import {ElectionManager}  from 'Managers';

const getElectionByIdWithTimelineData = async (req) => {
    try {
        const id = req.params.electionId;
        const election = await ElectionRepo.fetchElectionByIdWithTimelineData(id);
        if(!_.isEmpty(election)){
            return ElectionManager.mapToElectionModelWithTimeline(election);
        } else {
            throw new ApiError("Election not found");
        }
    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
};





const insertElectionApproval = async (req) => {
    try {

        return ElectionRepo.insertElectionApproval(req);
    }catch (e){
        throw new ServerError("server error");
    }
};

export default {
    getElectionByIdWithTimelineData,
    insertElectionApproval

}
