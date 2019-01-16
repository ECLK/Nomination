import { Division }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'divisionMap',
    idProperty: 'id',
    properties: ['id', 'name', 'code', 'no_of_candidates', 'module_id']
  }
];



const mapToDivisionModel = (divisions) => {
  const mappedDivisions = joinjs.map(divisions, resultMaps, 'divisionMap', 'division_');

  //just an example how to convert row data object to Model
  return Division({
    id: mappedDivisions[0].id,
    name: mappedDivisions[0].name,
    code: mappedDivisions[0].code,
    no_of_candidates: mappedDivisions[0].no_of_candidates,
    namodule_idme: mappedDivisions[0].module_id,
  });
};

export default {
  mapToDivisionModel,
};
