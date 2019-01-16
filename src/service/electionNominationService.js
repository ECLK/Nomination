import { ServerError , ApiError } from 'Errors';
import ElectionNominationRepo from '../repository/electionNomination';
import {ElectionNominationManager}  from 'Managers';
import _ from 'lodash';


const updateElectionNominationByElectionNominationId = async (req) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    const team_id = req.body.team_id;
    const election_id = req.body.election_id;
    const division_config_data_id = req.body.division_config_data_id;

    const electionNominations = [{'ID':id, 'STATUS':status, 'TEAM_ID':team_id, 'ELECTION_ID':election_id, 'DIVISION_CONFIG_DATA_ID': division_condig_data_id}];
    return ElectionNominationRepo.insertElectionNominations(electionNominations);
  }catch (e){
    throw new ServerError("server error");
  }
};

const getElectionNominationByElectionNominationId = async (req) => {
  const uid = req.params.electionNominationId;
  const electionNominations = await ElectionNominationRepo.fetchElectionNominationById( uid );
  if(!_.isEmpty(electionNominations)){
    return ElectionNominationManager.mapToElectionNominationModel(electionNominations);
  }else {
    throw new ApiError("ElectionNomination not found");
  }
};

export default {
  getElectionNominationByElectionNominationId,
  updateElectionNominationByElectionNominationId,
}