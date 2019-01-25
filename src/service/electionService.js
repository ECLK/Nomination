import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import ElectionRepo from '../repository/election';
import { HTTP_CODE_404 } from '../routes/constants/HttpCodes';
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
}

const getAllElections = async () => {
    try {
        const elections = await ElectionRepo.fetchAllElections();
        if(!_.isEmpty(elections)){
            return ElectionManager.mapToAllElection(elections);
        } else {
            throw new ApiError("No Election found");
        }
    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

const getElectionsByStatus = async (req) => {
    try {
        const status = req.params.status;
        const elections = await ElectionRepo.fetchElectionsByStatus(status);
        if(!_.isEmpty(elections)){
            return ElectionManager.mapToElectionWithStatus(elections);
        } else {
            throw new ApiError("No Election found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

export default {
    getElectionByIdWithTimelineData,
    getAllElections,
    getElectionsByStatus,
}
