
var joinjs = require('join-js').default;
import { Election, ElectionWithConfig } from 'Models';

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
		config: mappedElection[0].config, // does not properly get mapped here
	});
}

export default{
	mapToElectionModelWithTimeline,
	mapToElectionWithConfig,
};
