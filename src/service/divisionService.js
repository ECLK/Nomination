import _ from 'lodash';
import { ServerError } from 'Errors';
import DivisionRepo from '../repository/Division';
import { DivisionManager } from 'Managers';


const getDivisionsByElectionId = async(req) => {
    try {
        const electionId = req.params.electionId;
        const divisions = await DivisionRepo.fetchDivisionsByElectionId(electionId);
        if (!_.isEmpty(divisions)){
            return DivisionManager.mapToDivisionModel(divisions);
            // return divisions;
        } else {
            throw new ApiError("Divisions not found");
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server Error", HTTP_CODE_404);
    }
}

export default {
    getDivisionsByElectionId,
}