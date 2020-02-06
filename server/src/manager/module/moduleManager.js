import { Module,ModuleList,AllElectionTemplate,CandidateConfig }  from 'Models';
var joinjs = require('join-js').default;
import {List} from 'typed-immutable';
import _ from 'lodash';


// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'moduleMap',
    idProperty: 'ID',
    properties: ['NAME', 'DIVISION_COMMON_NAME', 'CREATED_BY', 'STATUS','LAST_MODIFIED','approval_status','reviewNote'],
    collections: [
        { name: 'election_config', mapId: 'electionConfigMap', columnPrefix: 'MODULE_' },
        { name: 'division_config', mapId: 'divisionConfigMap', columnPrefix: 'MODULE_' },
        { name: 'supporting_doc_config', mapId: 'supportingDocConfigMap', columnPrefix: 'MODULE_' },
        { name: 'candidate_config', mapId: 'candidateConfigMap', columnPrefix: 'MODULE_' },
        { name: 'eligibilityCheckList', mapId: 'eligibilityCheckList', columnPrefix: 'MODULE_' },
    ]
  },
  {
    mapId: 'electionConfigMap',
    idProperty: 'electionModuleConfigId',
    properties: ['value']
  },
  {
    mapId: 'divisionConfigMap',
    idProperty: 'divisionCode',
    properties: ['divisionName','noOfCandidates']
  },
  {
    mapId: 'supportingDocConfigMap',
    idProperty: 'supportDocConfigId',
    properties: []
  },
  {
    mapId: 'candidateConfigMap',
    idProperty: 'candidateConfigId',
    properties: []
  },
  {
    mapId: 'eligibilityCheckList',
    idProperty: 'eligibilityConfigId',
    properties: []
  },
  {
    mapId: 'moduleMapList',
    idProperty: 'ID',
    properties: ['NAME', 'DIVISION_COMMON_NAME', 'CREATED_BY', 'STATUS','LAST_MODIFIED']
  },
  {
		mapId: 'allElectionTemplateMap',
		idProperty: 'id',
		properties: ['name', 'created_by', 'module_id', 'status','last_modified']
  },
  {
		mapId: 'SeparateCandidateConfigMap',
		idProperty: 'id',
		properties: ['key_name', 'description', 'json_schema']
	},
];



const mapToModuleModel = (modules) => {
  const mappedModules = joinjs.map(modules, resultMaps, 'moduleMap', 'MODULE_');
  return Module({
    id: mappedModules[0].ID,
      name: mappedModules[0].NAME,
      divisionCommonName: mappedModules[0].DIVISION_COMMON_NAME,
      createdBy: mappedModules[0].CREATED_BY,
      status: mappedModules[0].STATUS,
      lastModified:mappedModules[0].LAST_MODIFIED,
      candidateFormConfiguration:mappedModules[0].candidate_config,
      supportingDocuments:mappedModules[0].supporting_doc_config,
      divisionConfig:mappedModules[0].division_config,
      electionConfig:mappedModules[0].election_config,
      eligibilityCheckList:mappedModules[0].eligibilityCheckList,
      approval_status:mappedModules[0].approval_status,
      reviewNote:mappedModules[0].reviewNote,
  });
};

const mapToModuleModelList = (modules) => {
    const mappedModules = joinjs.map(modules, resultMaps, 'moduleMapList', 'MODULE_');
  return _.reduce(mappedModules, function(result, modules) {
    return result.push({
      id: modules.ID,
        name: modules.NAME,
        divisionCommonName: modules.DIVISION_COMMON_NAME,
        createdBy: modules.CREATED_BY,
        status: modules.STATUS,
        lastModified: modules.LAST_MODIFIED
    });
  },List(ModuleList)());
  };

const resultMaps2 = [
    {
        mapId: 'moduleMap2',
        idProperty: 'ID',
        properties: ['NAME']
    }
];
var count=0;

const mapToCandidateConfigColumnNames = (modules) => {
    const mappedModules = joinjs.map(modules, resultMaps2, 'moduleMap2', 'COLUMN_');

    return _.reduce(mappedModules, function(result, modules) {
        return result.push({
            "id": count,
            "column_name": modules.COLUMN_NAME
        });
        count++;
    },List(Module)(),function () {
        count=0;
    });
};

const mapToAllElectionTemplate = (templates) => {
	const mappedElectionTemplate = joinjs.map(templates, resultMaps, 'allElectionTemplateMap', 'module_');
	return _.reduce(mappedElectionTemplate, (result, election) => {
        return result.push({
            id: election.id,
            name: election.name,
            createdBy: election.created_by,
            lastModified: election.last_modified,
            status: election.status,
        });
    }, List(AllElectionTemplate)());
}

// const mapToCandidateConfigModel = (modules) => {
//   console.log("mappedModmodulesules",modules);

//   const mappedModules = joinjs.map(modules, resultMaps, 'candidateConfigMap', 'candidate_config_');

//   console.log("mappedModules",mappedModules);
//   return CandidateConfig({
//     candidate_config_id: mappedModules[0].id,
//       key_name: mappedModules[0].key_name,
//       description: mappedModules[0].description
//   });
// };

const mapToCandidateConfigModel = (templates) => {
	const mappedElectionTemplate = joinjs.map(templates, resultMaps, 'SeparateCandidateConfigMap', 'candidate_config_');
	return _.reduce(mappedElectionTemplate, (result, election) => {
        return result.push({
          candidate_config_id: election.id,
          key_name: election.key_name,
          description: election.description,
          json_schema: election.json_schema
        });
    }, List(CandidateConfig)());
}

export default {
  mapToModuleModel,
  mapToCandidateConfigColumnNames,
  mapToModuleModelList,
  mapToAllElectionTemplate,
  mapToCandidateConfigModel
};
