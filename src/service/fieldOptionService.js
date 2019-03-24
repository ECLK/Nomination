import { ServerError, ApiError } from 'Errors';
import FieldOptionsRepo from '../repository/fieldOptions';
import { ModuleManager } from 'Managers';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');



const getFieldOptions = async (fieldName) => {
	let modules = [];
	// filter diffrent types of supporting docs.
	if(fieldName === "candidate-configs"){
		modules = await FieldOptionsRepo.fetchCandidateConfig();
	}
	if(fieldName === "candidate-supporting-docs"){
		modules = await FieldOptionsRepo.fetchCandidateSupportingDocs();
	}
	if (!_.isEmpty(modules)) {
		return modules;
	} else {
		throw new ApiError("Field is not found");
	}
};


export default {
	getFieldOptions
}