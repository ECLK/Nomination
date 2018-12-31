import { Team }  from 'Models';
var joinjs = require('join-js').default;

const resultMaps = [
  {
    mapId: 'teamMap',
    idProperty: 'id',
    properties: ['ID', 'NAME', 'SYMBOL', 'TELEPHONE', 'FAX', 'NAME_OF_AUTHORIZED_MEMBER', 'ADDRESS_OF_AUTHORIZED_MEMBER']
  }
];

const mapToTeamModel = (teams) => {
  console.log("rrrrrrrr",teams);
  const mappedTeams = joinjs.map(teams, resultMaps, 'teamMap', 'TEAM_');
  console.log("rrrrrrggggggrr",mappedTeams);
  return Team({
    id: mappedTeams[0].ID,
    name: mappedTeams[0].NAME,
    symbol: mappedTeams[0].SYMBOL,
    telephone: mappedTeams[0].TELEPHONE,
    fax: mappedTeams[0].FAX,
    nameOfAuthorozedMember: mappedTeams[0].NAME_OF_AUTHORIZED_MEMBER,
    addressOfAuthorozedMember: mappedTeams[0].ADDRESS_OF_AUTHORIZED_MEMBER,
  });
};

export default {
  mapToTeamModel
};
