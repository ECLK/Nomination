import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import ElectionRepo from '../repository/Election';
import {ElectionManager}  from 'Managers';


// const getElectionById = async (req) => {
//     try {
//         const id = req.params.electionId;
//         const election = await ElectionRepo.fetchElectionById(id);
//         if (!_.isEmpty(election)){
//             return ElectionManager.mapToElectionModel(election);
//         } else {
//             throw new ApiError("Election not found");
//         }
//     } catch (error) {
//         throw error;
//     }
// }

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
        throw error;
    }
}

export default {
    // getElectionById,
    getElectionByIdWithTimelineData,
}
