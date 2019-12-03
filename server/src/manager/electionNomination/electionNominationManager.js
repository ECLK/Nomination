import { ElectionNomination }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'electionNominationMap',
    idProperty: 'id',
    properties: ['id', 'status', 'team_id', 'election_id', 'division_config_data_id']
  }
];

const mapToElectionNominationModel = (electionNominations) => {
  const mappedElectionNominations = joinjs.map(electionNominations, resultMaps, 'electionNominationMap', 'electionNomination_');

  //just an example how to convert row data object to Model
  return ElectionNomination({
    id: mappedElectionNominations[0].id,
    status: mappedElectionNominations[0].status,
    team_id: mappedElectionNominations[0].team_id,
    election_id: mappedElectionNominations[0].election_id,
    division_config_data_id: mappedElectionNominations[0].division_config_data_id,
  });
};

export default {
  mapToElectionNominationModel,
};
