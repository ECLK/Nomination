import { Team } from 'Models';
var joinjs = require('join-js').default;

const resultMaps = [

	{
		mapId: 'teamMap',
		idProperty: 'id',
		properties: ['id', 'name', 'symbol', 'fax', 'name_of_authorized_member', 'address_of_authorized_member'],
		collections: [
			{ name: 'contacts', mapId: 'contactMap', columnPrefix: 'contact_' }
		]
	},
	{
		mapId: 'contactMap',
		idProperty: 'id',
		properties: ['number']
	}
];

const mapToTeamModel = (teams) => {
	const mappedTeams = joinjs.map(teams, resultMaps, 'teamMap', 'team_');

	return Team({
		id: mappedTeams[0].id,
		name: mappedTeams[0].name,
		symbol: mappedTeams[0].symbol,
		fax: mappedTeams[0].fax,
		nameOfAuthorizedMember: mappedTeams[0].name_of_authorized_member,
		addressOfAuthorizedMember: mappedTeams[0].address_of_authorized_member,
		contactNumber: mappedTeams[0].contacts,
	});
};

export default {
	mapToTeamModel
};
