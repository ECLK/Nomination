import _ from 'lodash';
import { ServerError, ApiError } from 'Errors';
import CandidateRepo from '../repository/candidate';
import SupportDocRepo from '../repository/supportdoc';
import { CandidateManager } from 'Managers'
import { NominationService, SupportDocService, ModuleService } from 'Service';
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
import { executeTransaction } from '../repository/TransactionExecutor';

const uuidv4 = require('uuid/v4');


//Get candidate details for a particular nomination
const getCandidateListByNominationId = async (req) => {
	try {
		const nomination_id = req.params.nominationId;
		const nomination = await NominationService.validateNominationId(nomination_id);

		if (!_.isEmpty(nomination)) {
			const candidates = await CandidateRepo.getCandidateListByNomination(nomination_id);
		if (!_.isEmpty(candidates)) {
			return CandidateManager.mapToCandidateModel(candidates)
		} else {
			throw new ApiError("Candidates not found", HTTP_CODE_404);
		}
		} else {
			throw new ApiError("Nomination not found", HTTP_CODE_204);
		}
	} catch (e) {
		console.log(e);
		throw new ServerError("server error");
	}
};

//Get candidate for a particular nomination by candidateId and nominationId
const getCandidateByNominationId = async (req) => {
	try {
		const nominationId = req.params.nominationId;
		const candidateId = req.params.candidateId;
		const params = { 'nominationId': nominationId, "candidateId": candidateId }
		const candidates = await CandidateRepo.fetchCandidateByNomination(params);
		if (!_.isEmpty(candidates)) {
			return CandidateManager.mapToCandidateModel(candidates)
		} else {
			throw new ApiError("Candidates not found", HTTP_CODE_404);
		}
	} catch (e) {
		throw new ServerError("server error", HTTP_CODE_404);
	}
};


/**
 * update candidate data
 * @param {*} req 
 */
const updateCandidateDataById = async (req) => {
	console.log("kkkkkkkkkkkkkkkkkkkkk",req.body);
	try {
		const candidateData = req.body;
		const candidateId = req.params.candidateId;
		if (isCandidateExists(candidateId)) {
			const candidate = { 'id': candidateId, 'fullName': candidateData.fullName, 'preferredName': candidateData.preferredName, 'nic': candidateData.nic, 'dateOfBirth': candidateData.dateOfBirth, 'gender': candidateData.gender, 'address': candidateData.address, 'occupation': candidateData.occupation, 'electoralDivisionName': candidateData.electoralDivisionName, 'electoralDivisionCode': candidateData.electoralDivisionCode, 'counsilName': candidateData.counsilName };
			return await CandidateRepo.updateCandidate(candidate);
		}
	} catch (error) {
		console.log(error);
		throw new ServerError("server error", HTTP_CODE_404);
	}
}

/**
 * @description method to verify the certain candidate exists before we do an update.
 * @param {string} candidateId 
 * @returns boolean
 */
const isCandidateExists = async (candidateId) => {
	try {
		const candidate = await CandidateRepo.getCandidateById(candidateId);
		if (!_.isEmpty(candidate)) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}


//Delete candidate from particular nomination
	const deleteCandidateByCandidateId = async (req) => {
		try {
			const candidateId = req.params.candidateId;
			if (isCandidateExists(candidateId)) {
				return await CandidateRepo.deleteCandidate(candidateId);
			}
		} catch (error) {
			throw new ServerError("server error", HTTP_CODE_404);
		}
	}



//Save candidate by nomination id
const saveCandidateByNominationId_old = async (req) => {
	try {
		return executeTransaction(async (transaction) => {
		const id = uuidv4();
		const fullName = req.body.fullName;
		const preferredName = req.body.preferredName;
		const nic = req.body.nic;
		var dateOfBirth = req.body.dateOfBirth;
		const gender = req.body.gender;
		const address = req.body.address;
		const occupation = req.body.occupation;
		const electoralDivisionName = req.body.electoralDivisionName;
		const electoralDivisionCode = req.body.electoralDivisionCode;
		const counsilName = req.body.counsilName;
		const nominationId = req.body.nominationId;
		const nomination = await NominationService.validateNominationId(nominationId);
		if (!_.isEmpty(nomination)) {
			const candidateData = { 'id': id, 'fullName': fullName, 'preferredName': preferredName, 'nic': nic, 'dateOfBirth': dateOfBirth, 'gender': gender, 'address': address, 'occupation': occupation, 'electoralDivisionName': electoralDivisionName, 'electoralDivisionCode': electoralDivisionCode, 'counsilName': counsilName, 'nominationId': nominationId };
			await CandidateRepo.createCandidate(candidateData,transaction);
			await CandidateRepo.updateNominationStatus( nominationId,transaction );
			return true;
		} else {
			throw new ApiError("Nomination not found", HTTP_CODE_204);
		}
	});
	} catch (e) {
		throw new ServerError("server error", HTTP_CODE_404);
	}
};

//Save candidate support docs
const saveCandidateSupportDocsByCandidateId = async (req) => {
	try {
		const id = uuidv4();
		const filePath = req.body.filePath;
		const preferredName = req.body.preferredName;
		const nic = req.body.nic;
		const dateOfBirth = req.body.dateOfBirth;
		const gender = req.body.gender;
		const address = req.body.address;
		const occupation = req.body.occupation;
		const electoralDivisionName = req.body.electoralDivisionName;
		const electoralDivisionCode = req.body.electoralDivisionCode;
		const counsilName = req.body.counsilName;
		const nominationId = req.body.nominationId;
		const nomination = await NominationService.validateNominationId(nominationId);
		if (!_.isEmpty(nomination)) {
			const candidateData = { 'id': id, 'electoralDivisionCode': electoralDivisionCode, 'counsilName': counsilName, 'nominationId': nominationId };
			const candidates = await CandidateRepo.createCandidate(candidateData);
			if (candidates == 0) {
				return true;
			} else {
				return false;
			}
		} else {
			throw new ApiError("Nomination not found", HTTP_CODE_204);
		}
	} catch (e) {
		throw new ServerError("server error", HTTP_CODE_404);
	}
};

/**
 * @description to save candidate config details
 * @param {any} req 
 * @return boolean
 */
const saveCandidateConfig = async (req) => {
	let isValidModuleId;
	try {
		isValidModuleId = await ModuleService.validateModuleId(req.params.moduleId);
	} catch (error) {
		throw new ApiError("Module not found", HTTP_CODE_204);
	}
	try {
		if (isValidModuleId) {
			const moduleId = req.params.moduleId;
			const configReceivedData = req.body.candidateConfig;
			const configs = ["fullName", "preferredName", "nic", "dateOfBirth", "gender", "address", "occupation", "electoralDivisionName", "electoralDivisionCode", "counsilName"];

			// check if it is an INSERT or UPDATE
			const moduleExists = await isModuleExistAtCandidateConfig(moduleId);
			if (!moduleExists) { // INSERT
				const configData = await generateFullDatasetJsonObject(configs, configReceivedData);
				configData.id = uuidv4();
				configData.moduleId = moduleId;
				return CandidateRepo.insertCandidateConfigByModuleId(configData);
			}
		} else {
			throw new ApiError("Module not found", HTTP_CODE_204);
		}

	} catch (error) {
		throw new ServerError("server error", HTTP_CODE_404);
	}

}

/**
 * @description check if there's a record in candidate config to the given module_id
 * @param {string} moduleId 
 * @return boolean
 */
const isModuleExistAtCandidateConfig = async (moduleId) => {
	try {
		const configs = await CandidateRepo.getCandidateConfigByModuleId(moduleId);
		if (!_.isEmpty(configs)) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw new ApiError("Module not found", HTTP_CODE_204);
	}
}

/**
 * @description creating full data set with boolean values populated
 * @param { string[] } fullset 
 * @param { string[] } subset 
 * @returns JSON Object
 */
const generateFullDatasetJsonObject = async (fullset, subset) => {
	let jsonString = "{ ";
	fullset.forEach((fullsetItem) => {
		if (subset.find((subsetItem) => subsetItem == fullsetItem)) {
			jsonString += '"' + fullsetItem + '": true, ';
		} else {
			jsonString += '"' + fullsetItem + '": false, ';
		}
	});
	jsonString = jsonString.slice(0, -2);
	jsonString += " }";

	return JSON.parse(jsonString);
}


const saveCandidateSupportDocConfigData = async (req) => {
	let isValidModuleId;
	try {
		isValidModuleId = await ModuleService.validateModuleId(req.params.moduleId);
	} catch (error) {
		throw new ApiError("Module not found", HTTP_CODE_204);
	}
	try {
		if (isValidModuleId) {
			const moduleId = req.params.moduleId;
			const supportDocConfigReceivedData = req.body.supportDocConfigData;
			const val = { "params": { "category": "CANDIDATE" } };
			const candidateSupportDocConfig = await SupportDocService.getsupportDocsByCategory(val);

			const supportDocs = supportDocConfigReceivedData.map(data => {
				return ({
					"SUPPORT_DOC_CONFIG_ID": candidateSupportDocConfig.find(doc => _.camelCase(doc.keyName) === data).id, // filter data for requested docs
					"MODULE_ID": moduleId,
					"SELECT_FLAG": true
				});
			});

			return await SupportDocRepo.insertSupportDocConfigData(supportDocs);
		}
	} catch (error) {
		throw new ServerError("server error", HTTP_CODE_404);
	}
}


const saveCandidateByNominationId = async (req) => {
	try {
  return executeTransaction(async (transaction) => {
		let candidateId = req.params.candidateId;
	if(candidateId !== undefined){
		await CandidateRepo.saveCandidate(candidateId,req.body.nominationId,req.body.candidateData,req.body.from, transaction);
	}else{
		await CandidateRepo.saveCandidate(candidateId,req.body.nominationId,req.body.candidateData,req.body.from, transaction);
	}
	await CandidateRepo.updateNominationStatus( req.body.nominationId,transaction );

    return req.body.candidateData;
	});
}catch (e){
	console.log(e);
	throw new ServerError("server error");
}
};



export default {
	getCandidateListByNominationId,
	saveCandidateByNominationId,
	getCandidateByNominationId,
	saveCandidateSupportDocsByCandidateId,
	updateCandidateDataById,
	saveCandidateConfig,
	saveCandidateSupportDocConfigData,
	deleteCandidateByCandidateId,
	saveCandidateByNominationId_old
}
