import { Election } from 'Models';
var joinjs = require('join-js').default;

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

export default {
	mapToElectionModelWithTimeline,
};
