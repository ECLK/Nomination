import { ServerError, ApiError } from 'Errors';
import validationRepo from '../repository/validation';
import { ModuleManager } from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');





const validateElectionsByElectionName = async (req) => {
	let exist = '';

	if(req.params.electionName){
		exist = await validationRepo.fetchElectionCount(req.params.electionName);
	}
	if (!_.isEmpty(exist)) {
		if(exist[0].COUNT>0){
			return true;
		}else{
			return false;
		}
	} else {
		throw new ApiError("election name is not found");
	}
};

const validateTemplateByTemplateName = async (req) => {

	let exist = '';
	if(req.params.templateName){
		exist = await validationRepo.fetchTemplateCount(req.params.templateName);
	}
	if (!_.isEmpty(exist)) {
		if(exist[0].COUNT>0){
			return true;
		}else{
			return false;
		}
	} else {
		throw new ApiError("template name is not found");
	}
};


export default {
	validateElectionsByElectionName,
	validateTemplateByTemplateName
}