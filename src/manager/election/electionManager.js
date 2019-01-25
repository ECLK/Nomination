import { Election, AllElection, ElectionWithStatus } from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';

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
		mapId: 'allElectionMap',
		idProperty: 'id',
		properties: ['name', 'created_by',	'created_at', 'updated_at', 'module_id']
	},
	{
		mapId: 'electionWithStatus',
		idProperty: 'id',
		properties: ['name', 'created_by',	'created_at', 'updated_at', 'module_id', 'status']
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

const mapToAllElection = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'allElectionMap', 'election_');

	return _.reduce(mappedElection, (result, election) => {
        return result.push({
            id: election.id,
            name: election.name,
            createdBy: election.created_by,
			createdAt: election.created_at,
			updatedAt: election.updated_at,
			moduleId: election.module_id,
        });
    }, List(AllElection)());
}

const mapToElectionWithStatus = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'electionWithStatus', 'election_');

	return _.reduce(mappedElection, (result, election) => {
		return result.push({
			id: election.id,
            name: election.name,
            createdBy: election.created_by,
			createdAt: election.created_at,
			updatedAt: election.updated_at,
			moduleId: election.module_id,
			status: election.status,
		});
	}, List(ElectionWithStatus)());
}

export default {
	mapToElectionModelWithTimeline,
	mapToAllElection,
	mapToElectionWithStatus,
};
