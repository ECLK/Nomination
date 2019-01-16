import { Module }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'moduleMap',
    idProperty: 'id',
    properties: ['id', 'name']
  }
];


const mapToModuleModel = (modules) => {
  const mappedModules = joinjs.map(modules, resultMaps, 'moduleMap', 'module_');

  //just an example how to convert row data object to Model
  return Module({
    id: mappedModules[0].id,
    name: mappedModules[0].name,
  });
};

export default {
  mapToModuleModel,
};
