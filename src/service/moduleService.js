import { ServerError, ApiError } from 'Errors';
import ModuleRepo from '../repository/module';
import { ModuleManager } from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');
import { executeTransaction } from '../repository/TransactionExecutor';

// import ModuleTransactionService  from '../repository/moduleTransaction';




const updateModuleByModuleId = async (req) => {
	try {
		const id = req.body.id;
		const name = req.body.name;
		const modules = [{ 'ID': id, 'NAME': name }];
		return ModuleRepo.insertModules(modules);
	} catch (error) {
		throw new ServerError("server error");
	}
};

const getModuleByModuleId = async (req) => {
	const uid = req.params.moduleId;
	const modules = await ModuleRepo.fetchModuleById(uid);
	if (!_.isEmpty(modules)) {
		return ModuleManager.mapToModuleModel(modules);
	} else {
		throw new ApiError("Module not found");
	}
};

const getModulesByStatus = async (req) => {
	const status = req.params.status;
	const modules = await ModuleRepo.fetchModuleSByStatus(status);
	try {
		if (!_.isEmpty(modules)) {
			return ModuleManager.mapToModuleModel(modules);
		} else {
			throw new ApiError("Module7 not found");
		}
	} catch (error) {
		throw new ServerError("server error");
	}

};

/**
 * @description validator for module_id
 * @param {string} moduleId 
 * @returns boolean
 */
const validateModuleId = async (moduleId) => {
	const req = {"params": {"moduleId": moduleId }};
	const id = await getModuleByModuleId(req);
	if (!_.isEmpty(id)){
		return true;
	} else {
		return false;
	}
}

//Save Candidate Form Config data
const saveCandidateFormConfiguration = async (req) => {
	try {
		var candidateConfigData = req.body.candidateFormConfiguration;
		var moduleId = req.body.moduleId;
	  var i=0;
	  var candidateConfig = []; //TODO: yujith, validate candidateConfigId and moduleId 
		 for (var {candidateConfigId: candidateConfigId} of candidateConfigData) {
			const id = uuidv4();
			candidateConfig[i] = {'id':id,'candidateConfigId':candidateConfigId, 'moduleId':moduleId};
		   i++;
		 }
		 return candidateConfig;
	}catch (e){
	  throw new ServerError("server error");
	}
  };

//Save Candidate Supporting documents 
const saveSupportingDocuments = async (req) => {
	try {
		var supportDocData = req.body.supportingDocuments;
		var moduleId = req.body.moduleId;
	  var i=0;
	  var supportDocs = []; //TODO: yujith, validate candidateConfigId and moduleId 
		 for (var {supportDocConfigId: supportDocConfigId} of supportDocData) {
			const id = uuidv4();
			supportDocs[i] = {'id':id,'supportDocConfigId':supportDocConfigId, 'moduleId':moduleId};
		   i++;
		 }
		 return supportDocs;
	}catch (e){
	  throw new ServerError("server error");
	}
  };

//Save Division config 
const saveDivisionConfig = async (req) => {
	try {
		var divisionConfData = req.body.divisionConfig;
		var moduleId = req.body.moduleId;
	  var i=0;
	  var divisionConf = []; //TODO: yujith, validate candidateConfigId and moduleId 
		 for (var {divisionName: divisionName ,divisionCode: divisionCode,noOfCandidates: noOfCandidates} of divisionConfData) {
			const id = uuidv4();
			divisionConf[i] = {'id':id,'divisionName':divisionName, 'divisionCode':divisionCode,'noOfCandidates':noOfCandidates, 'moduleId':moduleId};
		   i++;
		 }
		 return divisionConf;
	}catch (e){
	  throw new ServerError("server error");
	}
  };

//Save Election config 
const saveElectionConfig = async (req) => {
	try {
		var electionConfData = req.body.electionConfig;
		var moduleId = req.body.moduleId;
	  var i=0;
	  var electionConf = []; //TODO: yujith, validate candidateConfigId and moduleId 
		 for (var {electionModuleConfigId: electionModuleConfigId ,value: value} of electionConfData) {
			const id = uuidv4();
			electionConf[i] = {'id':id,'electionModuleConfigId':electionModuleConfigId, 'value':value, 'moduleId':moduleId};
		   i++;
		 }
		// electionConf = electionConfData.map(el => { el.id = uuidv4(); return el; });
		// use this insted of for loop 
		 return electionConf;
	}catch (e){
	  throw new ServerError("server error");
	}
  };

const saveElectionModule = async (req) => {

  return executeTransaction(async (transaction) => {
		let moduleId = req.body.moduleId;
	if(moduleId != undefined){
		const name = req.body.name;
		const divisionCommonName = req.body.divisionCommonName;
		const createdBy = req.body.createdBy;
		const createdAt = req.body.createdAt;
		const updatedAt = req.body.updatedAt;
		const params = {'id':moduleId, "name":name, "divisionCommonName":divisionCommonName, "createdBy":createdBy, "createdAt":createdAt, "updatedAt":updatedAt }
	await ModuleRepo.updateElectionModule(params,transaction);
	}else{
		moduleId = uuidv4();
		const name = req.body.name;
		const divisionCommonName = req.body.divisionCommonName;
		const createdBy = req.body.createdBy;
		const createdAt = req.body.createdAt;
		const updatedAt = req.body.updatedAt;
		const params = {'id':moduleId, "name":name, "divisionCommonName":divisionCommonName, "createdBy":createdBy, "createdAt":createdAt, "updatedAt":updatedAt }
	await	ModuleRepo.insertElectionModule(params,transaction);	
	}
		if(req.body.candidateFormConfiguration.length !== 0){
			const saveCandidateFormConfigurationData = await saveCandidateFormConfiguration(req);
			await ModuleRepo.saveCandidateConf(moduleId,saveCandidateFormConfigurationData, transaction);
		}
		if(req.body.supportingDocuments.length !== 0){
			const saveSupportingDocumentsData =  await saveSupportingDocuments(req);
			await ModuleRepo.saveSupportDocs(moduleId,saveSupportingDocumentsData, transaction);
		}
		if(req.body.divisionConfig.length !== 0){
			const saveDivisionConfigData =  await saveDivisionConfig(req);
			await ModuleRepo.saveDivisionConf(moduleId,saveDivisionConfigData, transaction);
		}
		if(req.body.electionConfig.length !== 0){
			const saveElectionConfigData =  await saveElectionConfig(req);
			await ModuleRepo.saveElectionConfig(moduleId,saveElectionConfigData, transaction);
		}
    return true;
  });
};

export default {
	getModuleByModuleId,
	updateModuleByModuleId,
	getModulesByStatus,
	validateModuleId,
	saveElectionModule
}
