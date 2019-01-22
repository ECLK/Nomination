import { Module }  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';


// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'moduleMap',
    idProperty: 'ID',
    properties: ['NAME', 'DIVISION_COMMON_NAME', 'CREATED_BY', 'STATUS']
  }
];


// const mapToModuleModel = (modules) => {
//   const mappedModules = joinjs.map(modules, resultMaps, 'moduleMap', 'module_');

//   //just an example how to convert row data object to Model
//   return Module({
//     id: mappedModules[0].id,
//     name: mappedModules[0].name,
//   });
// };

const mapToModuleModel = (modules) => {
  const mappedModules = joinjs.map(modules, resultMaps, 'moduleMap', 'MODULE_');

return _.reduce(mappedModules, function(result, modules) {
  return result.push({
    "id": modules.ID,
      "name": modules.NAME,
      "divisionCommonName": modules.DIVISION_COMMON_NAME,
      "createdBy": modules.CREATED_BY,
      "status": modules.STATUS
  });
},List(Module)());


};
export default {
  mapToModuleModel,
};
