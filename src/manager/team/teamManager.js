import { Team }  from 'Models';
var joinjs = require('join-js').default;

const resultMaps = [
  {
    mapId: 'teamMap',
    idProperty: 'id',
    properties: ['id', 'name']
  }
];


const mapToTeamModel = (teams) => {
  const mappedTeams = joinjs.map(teams, resultMaps, 'teamMap', 'team_');

  return Team({
    id: mappedTeams[0].id,
    name: mappedTeams[0].name,
  });
};

export default {
  mapToTeamModel
};
