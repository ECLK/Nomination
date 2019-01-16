import { ServerError , ApiError } from 'Errors';
import DivisionRepo from '../repository/division';
import {DivisionManager}  from 'Managers';
import _ from 'lodash';


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

export default {
  getDivisionByDivisionId,
  updateDivisionByDivisionId,
}