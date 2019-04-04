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
			return [];
			// throw new ApiError("Module7 not found");
		}
	} catch (error) {
		console.log(error);
		throw new ServerError("server error");
	}
};

const InsertTodivisionConfig = async (req) => {
    try {
        await ModuleRepo.UpdateElectionModule(req.body.Division_Comman_Name,req.body.MODULE_ID);
        var list = [];
        var array=req.body.data;
        for(var i=0;i<req.body.data.length;i++){
            list[i]={'ID':uuidv4(), 'NAME':array[i].Division_name, 'CODE':array[i].Division_code, 'NO_OF_CANDIDATES':array[i].no_of_candidate, 'MODULE_ID':req.body.MODULE_ID}
        }
        console.log(list);
        await ModuleRepo.InsertTodivisionConfig(list);
    } catch (e) {
        console.log(e);
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

const saveElectionModule = async (req) => {
	try {
  return executeTransaction(async (transaction) => {
		let moduleId = req.params.moduleId;
	if(moduleId !== undefined){
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
		// Following should be set from the server.
		const createdBy = req.body.createdBy;
		const createdAt = req.body.createdAt;
		const updatedAt = req.body.updatedAt;
		let params = {'id':moduleId, "name":name, "divisionCommonName":divisionCommonName, "createdBy":createdBy, "createdAt":createdAt, "updatedAt":updatedAt }
		await	ModuleRepo.insertElectionModule(params,transaction);
		params = {'moduleId':moduleId, id: uuidv4(), "createdBy":createdBy}
		await	ModuleRepo.approveElectionModule(params,transaction);	
	}
			await ModuleRepo.saveCandidateConf(moduleId,req.body.candidateFormConfiguration, transaction);
		
			await ModuleRepo.saveSupportDocs(moduleId,req.body.supportingDocuments, transaction);
		
			await ModuleRepo.saveDivisionConf(moduleId,req.body.divisionConfig, transaction);
		
			await ModuleRepo.saveElectionConfig(moduleId,req.body.electionConfig, transaction);
		
    return true;
	});
}catch (e){
	throw new ServerError("server error");
}
};

export default {
	getModuleByModuleId,
	updateModuleByModuleId,
	getModulesByStatus,
	validateModuleId,
	saveElectionModule
}
