import { Election }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'electionMap',
    idProperty: 'id',
    properties: ['id', 'name', 'module_id']
  }
];


const mapToElectionModel = (election) => {
  const mappedElection = joinjs.map(election, resultMaps, 'electionMap', 'election_');

  //just an example how to convert row data object to Model
  return Election({
    id: mappedElection[0].id,
    name: mappedElection[0].name,
    module_id: mappedElection[0].module_id,
  });
};

export default {
  mapToElectionModel,
};
