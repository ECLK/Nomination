import { ServerError , ApiError } from 'Errors';
import DivisionRepo from '../repository/division';
import {DivisionManager}  from 'Managers';
import _ from 'lodash';
import {
    DIVISION_NOT_FOUND_CODE,
} from '../errors/ErrorCodes';

//******************* Start of Admin Endpoints ********************************

const updateDivisionByDivisionId = async (req) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const code = req.body.code;
    const no_of_candidates = req.body.no_of_candidates;
    const module_id = req.body.module_id;
    
    const divisions = [{'ID':id, 'NAME':name, 'CODE':code, 'NO_OF_CANDIDATES':no_of_candidates, 'MODULE_ID': module_id}];
    return DivisionRepo.insertDivisions(divisions);
  }catch (e){
    throw new ServerError("server error");
  }
};

const getDivisionByDivisionId = async (req) => {
  const uid = req.params.divisionId;
  const divisions = await DivisionRepo.fetchDivisionById( uid );
  if(!_.isEmpty(divisions)){
    return DivisionManager.mapToDivisionModel(divisions);
  }else {
    throw new ApiError("Division not found");
  }
};

//******************* Start of User Endpoints ********************************

/**
 * Get division list by election 
 * @param {*} req 
 */
const getDivisionsByElectionId = async (req) => {
    try {
        const electionId = req.params.electionId;
        const divisions = await DivisionRepo.fetchDivisionsByElectionId(electionId);
        if (!_.isEmpty(divisions)) {
            return DivisionManager.mapToDivisionModel(divisions);
        } else {
            throw new ApiError("Divisions not found", DIVISION_NOT_FOUND_CODE);
        }
    } catch (error) {
        throw new ServerError("Server Error", HTTP_CODE_404);
    }
}

/**
 * Get eligible division list with nominations for particular election and team
 * @param {*} req 
 */
const getDivisionsWithNomination = async (req) => {
    try {
        const electionId = req.params.electionId;
        const teamId = req.params.teamId;
        const divisions = await DivisionRepo.fetchDivisionsWithNomination(electionId, teamId);
        if (!_.isEmpty(divisions)) {
            return DivisionManager.mapToDivisionModelWithNominations(divisions);
        } else {
            throw new ApiError("Divisions not found", DIVISION_NOT_FOUND_CODE);
        }
    } catch (error) {
        console.log(error);
        throw new ServerError("Server Error", HTTP_CODE_404);
    }
}

export default {
  getDivisionByDivisionId,
  updateDivisionByDivisionId,
  getDivisionsByElectionId,
  getDivisionsWithNomination,
}