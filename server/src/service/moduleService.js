import { ServerError, ApiError, ValidationError } from 'Errors';
import ModuleRepo from '../repository/module';
import { ModuleManager } from 'Managers';
import { ValidationService } from 'Service';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');
import { executeTransaction } from '../repository/TransactionExecutor';
import { HTTP_CODE_404, HTTP_CODE_204 ,HTTP_CODE_400} from '../routes/constants/HttpCodes';
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
	try {
		const uid = req.params.moduleId;
	const modules = await ModuleRepo.fetchModuleById(uid);
	if (!_.isEmpty(modules)) {
		return ModuleManager.mapToModuleModel(modules);
	} else {
		throw new ApiError("Module not found");
	}
	} catch (error) {
		console.log(error);
		throw new ServerError("server error");
	}
};

const getModulesByStatus = async (req) => {
	const status = req.params.status;
	const modules = await ModuleRepo.fetchModuleSByStatus(status);
	try {
		if (!_.isEmpty(modules)) {
			return ModuleManager.mapToModuleModelList(modules);
		} else {
			return [];
			// throw new ApiError("Module7 not found");
		}
	} catch (error) {
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

		let param ={}
		let params ={}
	if(moduleId !== undefined){
		const name = req.body.name;
		const divisionCommonName = req.body.divisionCommonName;
		const createdBy = req.body.createdBy;
		const updatedAt = Date.parse(new Date());
		 param = {'id':moduleId, "name":name, "divisionCommonName":divisionCommonName, "updatedAt":updatedAt, "createdBy":createdBy  }
		await ModuleRepo.updateElectionModule(param,transaction);
		const approvalParams = {'updatedAt':updatedAt, 'status':'PENDING','moduleId':moduleId,'reviewNote':''};
		 await ModuleRepo.updateTemplateStatus( approvalParams );
	}else{
		moduleId = uuidv4();
		const name = req.body.name;
		const divisionCommonName = req.body.divisionCommonName;
		// Following should be set from the server.
		const createdBy = req.body.createdBy;
		const createdAt = Date.parse(new Date());
		const updatedAt = Date.parse(new Date());
		 param = {'id':moduleId, "name":name, "divisionCommonName":divisionCommonName, "createdBy":createdBy, "createdAt":createdAt, "updatedAt":updatedAt }
		await	ModuleRepo.insertElectionModule(param,transaction);
		params = {'moduleId':moduleId, id: uuidv4(), "createdBy":createdBy}
		await	ModuleRepo.approveElectionModule(params,transaction);	
	}
			await ModuleRepo.saveCandidateConf(moduleId,req.body.candidateFormConfiguration, transaction);
		
			await ModuleRepo.saveSupportDocs(moduleId,req.body.supportingDocuments, transaction);
		
			await ModuleRepo.saveDivisionConf(moduleId,req.body.divisionConfig, transaction);
		
			await ModuleRepo.saveElectionConfig(moduleId,req.body.electionConfig, transaction);

			await ModuleRepo.saveEligibilityConfig(moduleId,req.body.eligibilityCheckList, transaction);

    return param;
	});
}catch (e){
	console.log(e);
	throw new ServerError("server error");
}
};

const deleteModuleByModuleId = async (req) => {
	try {
  return executeTransaction(async (transaction) => {
		let moduleId = req.params.moduleId;
	
			await ModuleRepo.deleteCandidateConf(moduleId,transaction);
		
			await ModuleRepo.deleteSupportDocConf(moduleId, transaction);
		
			await ModuleRepo.deleteDivisionConf(moduleId, transaction);
		
			await ModuleRepo.deleteElectionConf(moduleId, transaction);

			await ModuleRepo.deleteEligibilityConf(moduleId, transaction);

			await ModuleRepo.deleteElectionModuleApproval(moduleId, transaction);

			await ModuleRepo.deleteElectionModule(moduleId, transaction);

	return true;
	});
}catch (e){
	console.log(e);
	throw new ServerError("server error");
}
};

const getAllElectionTemplates = async () => {
    try {
        const templates = await ModuleRepo.fetchAllElectionTemplates();
        if(!_.isEmpty(templates)){
            return ModuleManager.mapToAllElectionTemplate(templates);
        } else {
            // throw new ApiError("No Election found");
            return [];
        }
    } catch (error) {
        throw new ServerError("Server error", HTTP_CODE_404);
    }
}

//approve election template by template id
const ApproveElectionTemplateByModuleId = async (req) => {
	try {
	  const updatedAt = req.body.updatedAt;
	  const status = req.body.status;
	  const reviewNote = req.body.reviewNote;
	  const moduleId = req.params.moduleId;
		const electionData = {'updatedAt':updatedAt, 'status':status,'moduleId':moduleId,'reviewNote':reviewNote};
		const templateUsage = await ValidationService.validateElectionTemplateStatus(req);
		if (templateUsage[0].COUNT===0) {
			return await ModuleRepo.updateTemplateStatus( electionData );
		  } else {
			throw new ApiError("This election template already in use",HTTP_CODE_400);
		  }
	}catch (error){
	  console.log(error);
	  throw new ApiError(error.message,HTTP_CODE_400);
	}
  };

  const getCandidateFormConfigByModuleId = async (req) => {
	try {
		const uid = req.params.moduleId;
	const modules = await ModuleRepo.fetchCandidateFormConfigById(uid);
	if (!_.isEmpty(modules)) {
		return ModuleManager.mapToCandidateConfigModel(modules);
	} else {
		throw new ApiError("Module not found");
	}
	} catch (error) {
		console.log(error);
		throw new ServerError("server error");
	}
};

export default {
	getModuleByModuleId,
	updateModuleByModuleId,
	getModulesByStatus,
	validateModuleId,
	saveElectionModule,
	deleteModuleByModuleId,
	getAllElectionTemplates,
	ApproveElectionTemplateByModuleId,
	getCandidateFormConfigByModuleId
}
