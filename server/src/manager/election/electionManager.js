import { Election, AllElection, ElectionWithStatus } from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';

const resultMaps = [
	{
		mapId: 'electionMap',
		idProperty: 'id',
		properties: ['id', 'name', 'module_id','nomination_start','nomination_end','objection_start','objection_end','payment_start','payment_end','approval_start','approval_end','module_name','approval_status','reviewNote'],
		collections: [
			{ name: 'config', mapId: 'configMap', columnPrefix: 'config_' }
		]
	},
	{
		mapId: 'configMap',
		idProperty: 'key',
		properties: ['value']
	},
	{
		mapId: 'allElectionMap',
		idProperty: 'id',
		properties: ['name', 'created_by',	'created_at', 'updated_at', 'module_id', 'status','last_modified']
	},
	{
		mapId: 'electionWithStatus',
		idProperty: 'id',
		properties: ['name', 'created_by',	'created_at', 'updated_at', 'module_id', 'status','last_modified']
	}
];

const mapToElectionModelWithTimeline = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'electionMap', 'election_');

	return Election({
		id: mappedElection[0].id,
		name: mappedElection[0].name,
		moduleId: mappedElection[0].module_id,
		nominationStart: mappedElection[0].nomination_start,
		nominationEnd: mappedElection[0].nomination_end,
		objectionStart: mappedElection[0].objection_start,
		objectionEnd: mappedElection[0].objection_end,
		paymentStart: mappedElection[0].payment_start,
		paymentEnd: mappedElection[0].payment_end,
		approvalStart: mappedElection[0].approval_start,
		approvalEnd: mappedElection[0].approval_end,
		moduleName: mappedElection[0].module_name,
		approval_status: mappedElection[0].approval_status,
		reviewNote: mappedElection[0].reviewNote,
		electionConfig: mappedElection[0].config,
	});
}

const mapToAllElection = (electionData) => {
	const mappedElection = joinjs.map(electionData, resultMaps, 'allElectionMap', 'election_');

	return _.reduce(mappedElection, (result, election) => {
        return result.push({
            id: election.id,
            name: election.name,
            createdBy: election.created_by,
			lastModified: election.last_modified,
			status: election.status,
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
			moduleId: election.module_id,
			createdBy:election.created_by,
			lastModified: election.last_modified,
			status: election.status,
		});
	}, List(ElectionWithStatus)());
}

export default {
	mapToElectionModelWithTimeline,
	mapToAllElection,
	mapToElectionWithStatus,
};
