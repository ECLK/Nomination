import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import ElectionRepo from '../repository/election';
import { ElectionManager }  from 'Managers';
import {HTTP_CODE_404,HTTP_CODE_201,HTTP_CODE_200} from '../routes/constants/HttpCodes';

const getElectionByIdWithTimelineData = async (req) => {
    try {
        const meta = req.query.meta;
        const id = req.params.electionId;

        if(!_.isEmpty(meta)){

            if(meta == 'config'){
                const election = await ElectionRepo.fetchElectionByIdWithConfig(id);
                if(!_.isEmpty(election)){
                    return ElectionManager.mapToElectionWithConfig(election);
                } else {
                    throw new ApiError("Election not found");
                }
            } else if (meta == 'timeline'){
                const election = await ElectionRepo.fetchElectionByIdWithTimelineData(id);
                if(!_.isEmpty(election)){
                    return ElectionManager.mapToElectionModelWithTimeline(election);
                } else {
                    throw new ApiError("Election not found");
                }
            } else if (meta == 'config,timeline'){
                const election = await ElectionRepo.fetchElectionWithAllData(id);
                if(!_.isEmpty(election)){
                    return ElectionManager.mapToElectionWithAll(election);
                } else {
                    throw new ApiError("Election not found");
                }
            }
            
        } else {
            const election = await ElectionRepo.fetchElectionById(id);
            if(!_.isEmpty(election)){
                return ElectionManager.mapToElectionById(election);
            } else {
                throw new ApiError("Election not found");
            }
        }

    } catch (error) {
        console.log(error);
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

export default {
    getElectionByIdWithTimelineData,
}
