import _ from 'lodash';
import { ServerError , ApiError } from 'Errors';
import ObjectionRepo from '../repository/objection';
import { ObjectionManager }  from 'Managers';

const getObjectionCreatedByTeam = async (req) => {
    try {
        const objections = await ObjectionRepo.fetchObjectionCreatedByTeam(req.params.electionId, req.params.teamId);
        if (!_.isEmpty(objections)){
            return ObjectionManager.mapToObjectionModel(objections);
        } else {
            throw new ApiError("No objection found");
        }
    }catch (e){
        throw new ServerError("server error");
    }
}; 


export default {
    getObjectionCreatedByTeam,
}
