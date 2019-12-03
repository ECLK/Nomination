import { ServerError, ApiError } from 'Errors';
import FieldOptionsRepo from '../repository/fieldOptions';
import { ModuleManager } from 'Managers';
import _ from 'lodash';
const { base64decode } = require('nodejs-base64');
const uuidv4 = require('uuid/v4');



const getFieldOptions = async (fieldName) => {
	let modules = [];
	// filter diffrent types of supporting docs.
	if(fieldName === "candidate-configs"){
		modules = await FieldOptionsRepo.fetchCandidateConfig();
	}
	if(fieldName === "candidate-supporting-docs"){
		modules = await FieldOptionsRepo.fetchSupportingDocs('CANDIDATE');
	}
	if(fieldName === "nomination-supporting-docs"){
		modules = await FieldOptionsRepo.fetchSupportingDocs('NOMINATION');
	}
	if(fieldName === "objection-supporting-docs"){
		modules = await FieldOptionsRepo.fetchSupportingDocs('OBJECTION');
	}
	if(fieldName === "payment-supporting-docs"){
		modules = await FieldOptionsRepo.fetchSupportingDocs('PAYMENT');
	}
	
	if(fieldName === "electorates-divisions"){
		modules = await FieldOptionsRepo.fetchElectorates();
	}
	if (!_.isEmpty(modules)) {
		return modules;
	} else {
		throw new ApiError("Field is not found");
	}
};

const getCallElectionFieldOptions = async (fieldName,moduleId) => {
	let modules = [];
	
	if(fieldName === "electorates-divisions"){
		modules = await FieldOptionsRepo.fetchElectorates(moduleId);
	}
	if (!_.isEmpty(modules)) {
		return modules;
	} else {
		throw new ApiError("Field is not found");
	}
};

// const getPermissionsByUserRole = async (headers) => {
// 	let decoded = base64decode(headers); 
// 	if (!_.isEmpty(decoded)) {
// 		return decoded;
// 	} else {
// 		throw new ApiError("not found");
// 	}
// };


export default {
	getFieldOptions,
	getCallElectionFieldOptions,
	// getPermissionsByUserRole
}