import { ServerError , ApiError } from 'Errors';
import ActiveElectionRepo from '../repository/activeElection';
import {ActiveElectionManager}  from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');



const updateActiveElectionByActiveElectionId = async (req) => {

  try {
    const id = uuidv4();
    const name = req.body.name;
    const module_id = req.body.module_id;
    const created_by = req.body.created_by;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    const activeElections = [{'ID':id, 'NAME':name, 'CREATED_BY':created_by, 'CREATED_AT':created_at, 'UPDATED_AT':updated_at, 'MODULE_ID':module_id}];
    return ActiveElectionRepo.insertActiveElections(activeElections);
  }catch (e){
    console.log("==========",e);
    throw new ServerError("server error");
  }
};

const getActiveElectionByActiveElectionId = async (req) => {
  const uid = req.params.activeElectionId;
  const activeElections = await ActiveElectionRepo.fetchActiveElectionById( uid );
  if(!_.isEmpty(activeElections)){
    return ActiveElectionManager.mapToActiveElectionModel(activeElections);
  }else {
    throw new ApiError("ActiveElection not found");
  }
};

export default {
  getActiveElectionByActiveElectionId,
  updateActiveElectionByActiveElectionId,
}