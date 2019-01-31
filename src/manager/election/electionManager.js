
var joinjs = require('join-js').default;
import { Election, ElectionWithConfig, ElectionV2 } from 'Models';
import election from '../../repository/election';

const resultMaps = [
	{
		mapId: 'electionMap',
		idProperty: 'id',
		properties: ['id', 'name', 'module_id'],
		collections: [
			{ name: 'timeline', mapId: 'timelineMap', columnPrefix: 'timeline_' }
		]
	},
	{
		mapId: 'timelineMap',
		idProperty: 'key',
		properties: ['value']
	},
	{
		mapId: 'electionWithConfigMap',
		idProperty: 'id',
		properties: ['name', 'module_id'],
		collections: [ 
			{ name: 'config', mapId: 'keyValueMap', columnPrefix: 'config_' }
		]
	},
	{
		mapId: 'keyValueMap',
		idProperty: 'key',
		properties: ['value']
	},
	{
		mapId: 'electionWithAll',
		idProperty: 'id',
		properties: ['name', 'module_id', 'create_by', 'create_at', 'update_at'],
		collections: [ 
			{ name: 'config', mapId: 'keyValueMap', columnPrefix: 'config_' }
		],
		collections: [
			{ name: 'timeline', mapId: 'timelineMap', columnPrefix: 'timeline_' }
		]
	},
	{
		mapId: 'electionV2',
		idProperty: 'id',
		properties: ['name', 'module_id', 'created_by', 'created_at', 'updated_at']
	}
];

const mapToElectionModelWithTimeline = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'electionMap', 'election_');
	
	return Election({
		id: mappedElection[0].id,
		name: mappedElection[0].name,
		moduleId: mappedElection[0].module_id,
		electionTimeLine: mappedElection[0].timeline,
	});
}

const mapToElectionWithConfig = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'electionWithConfigMap', 'election_');
	
	return ElectionWithConfig({
		id: mappedElection[0].id,
		name: mappedElection[0].name,
		moduleId: mappedElection[0].module_id,
		electionConfig: mappedElection[0].config,
	});
}

// need to fix the output of the mapped data
const mapToElectionWithAll = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'electionWithAll', 'election_');

	return mappedElection;
}

const mapToElectionById = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'electionV2', 'election_');

	return ElectionV2({
		id: mappedElection[0].id,
		name: mappedElection[0].name,
		moduleId: mappedElection[0].module_id,
		createdBy: mappedElection[0].created_at,
		createdAt: mappedElection[0].created_at,
		updatedAt: mappedElection[0].updated_at
	});
}


export default{
	mapToElectionModelWithTimeline,
	mapToElectionWithConfig,
	mapToElectionWithAll,
	mapToElectionById
};
