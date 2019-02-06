import { ActiveElection }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'activeElectionMap',
    idProperty: 'id',
    properties: ['id', 'name', 'module_id']
  }
];


const mapToActiveElectionModel = (activeElections) => {
  const mappedActiveElections = joinjs.map(activeElections, resultMaps, 'activeElectionMap', 'activeElection_');

  //just an example how to convert row data object to Model
  return ActiveElection({
    id: mappedActiveElections[0].id,
    name: mappedActiveElections[0].name,
    module_id: mappedActiveElections[0].module_id,
  });
};

export default {
  mapToActiveElectionModel,
};
