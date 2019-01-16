import { ServerError , ApiError } from 'Errors';
import ActiveElectionRepo from '../repository/activeElection';
import {ActiveElectionManager}  from 'Managers';
import _ from 'lodash';


const updateActiveElectionByActiveElectionId = async (req) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const module_id = req.body.module_id;
    const activeElections = [{'ID':id, 'NAME':name}];
    return ActiveElectionRepo.insertActiveElections(activeElections);
  }catch (e){
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