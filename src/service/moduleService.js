import { ServerError, ApiError } from 'Errors';
import ModuleRepo from '../repository/module';
import { ModuleManager } from 'Managers';
import _ from 'lodash';


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
	const id = await getModuleByModuleId(moduleId);
	if (!_.isEmpty(id)){ // when promise is sent, this will not work. need to refine.
		return true;
	} else {
		return false;
	}
}


export default {
	getModuleByModuleId,
	updateModuleByModuleId,
	getModulesByStatus,
	validateModuleId
}
