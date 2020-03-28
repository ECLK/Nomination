import { ActiveElection,CallElection,electoratesData,eligibilityData }  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'activeElectionMap',
    idProperty: 'id',
    properties: ['id', 'name', 'module_id']
  },
  {
		mapId: 'electionMap',
		idProperty: 'module_id',
		properties: ['name','status','created_by','created_at','updated_at'],
		collections: [
      { name: 'timeLine', mapId: 'timeLineMap', columnPrefix: 'election_' },
      { name: 'division', mapId: 'divisionMap', columnPrefix: 'election_' }
		]
  },
  {
		mapId: 'timeLineMap',
		idProperty: 'electionId',
		properties: ['nominationStart','nominationEnd','objectionStart','objectionEnd','paymentStart','paymentEnd','approvalStart','approvalEnd']
  },
  {
		mapId: 'divisionMap',
		idProperty: ['team_id','division_id'],
		properties: ['team_id','division_id']
  },
  {
		mapId: 'eligibilityMap',
		idProperty: ['eligibility_config_id','description'],
		properties: ['eligibility_config_id','description']
	},
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


const mapToElectionModel = (activeElections) => {
  const mappedElections = joinjs.map(activeElections, resultMaps, 'electionMap', 'election_');

// console.log("mappedElections",mappedElections);
  return CallElection({
    name: mappedElections[0].name,
    module_id: mappedElections[0].module_id,
    status: mappedElections[0].status,
    created_by: mappedElections[0].created_by,
    created_at: mappedElections[0].created_at,
    updated_at: mappedElections[0].updated_at,

    // TODO handle the timeline array empty case.
    timeLineData: mappedElections[0].timeLine[0],

    rowData: mappedElections[0].division,
    rowDataIg: mappedElections[0].division,
  });
};

const mapToElectoratesModel = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'divisionMap', 'election_');

	return _.reduce(mappedElection, (result, election) => {
        return result.push({
            team_id: election.team_id,
            division_id: election.division_id
        });
    }, List(electoratesData)());
}

const mapToEligibilitiesModel = (electionData) => {
  console.log("electionDataelectionDataelectionData",electionData);
	const mappedElection = joinjs.map(electionData, resultMaps, 'eligibilityMap', 'election_');
  console.log("mappedElectionmappedElectionmappedElection",mappedElection);

	return _.reduce(mappedElection, (result, election) => {
        return result.push({
            eligibility_config_id: election.eligibility_config_id,
            description: election.description
        });
    }, List(eligibilityData)());
}

export default {
  mapToActiveElectionModel,
  mapToElectionModel,
  mapToElectoratesModel,
  mapToEligibilitiesModel
};
