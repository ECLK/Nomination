import { Team } from 'Models';
var joinjs = require('join-js').default;

const resultMaps = [
	{
		mapId: 'teamMap',
		idProperty: 'id',
		properties: ['id', 'name', 'abbreviation', 'type', 'title', 'secretary_name', 'phone', 'fax', 'address', 'approved_symbol', 'file_name', 'file_path', 'file_original_name'],
		
	}
];

const mapToTeamModel = (teams) => {
	const mappedTeams = joinjs.map(teams, resultMaps, 'teamMap', 'team_');

	return Team({
		partyId: mappedTeams[0].id,
		partyName: mappedTeams[0].name,
		abbreviation: mappedTeams[0].abbreviation,
		partyType: mappedTeams[0].type,
		title: mappedTeams[0].title,
		secretaryName: mappedTeams[0].secretary_name,
		phone: mappedTeams[0].phone,
		address: mappedTeams[0].address,
		fax: mappedTeams[0].fax,
		approvedSymbol: mappedTeams[0].approved_symbol,
		fileName: mappedTeams[0].file_name,
		filePath: mappedTeams[0].file_path,
		originalName: mappedTeams[0].file_original_name,
	});
};

export default {
	mapToTeamModel
};
