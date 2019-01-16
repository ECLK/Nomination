import { Objection }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'objectionMap',
    idProperty: 'id',
    properties: ['id', 'description', 'created_date', 'created_by', 'created_by_team_id', 'nomination_id' ]
  }
];


const mapToObjectionModel = (objections) => {
  const mappedObjections = joinjs.map(objections, resultMaps, 'objectionMap', 'objection_');

  //just an example how to convert row data object to Model
  return Objection({
    id: mappedObjections[0].id,
    description: mappedObjections[0].description,
    created_date: mappedObjections[0].created_date,
    created_by: mappedObjections[0].created_by,
    created_by_team_id: mappedObjections[0].created_by_team_id,
    nomination_id: mappedObjections[0].nomination_id,
  });
};

export default {
  mapToObjectionModel,
};

