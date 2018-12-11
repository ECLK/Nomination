import { Election } from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

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


// const mapToElectionModel = (election) => {
// 	const mappedElection = joinjs.map(election, resultMaps, 'electionMap', 'election_');

// 	return Election({
// 		id: mappedElection[0].id,
// 		name: mappedElection[0].name,
// 		moduleId: mappedElection[0].module_id,
// 	});
// };

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
	// mapToElectionModel,
	mapToElectionModelWithTimeline,
};
