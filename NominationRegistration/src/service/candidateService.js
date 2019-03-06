import _ from 'lodash';
import { ServerError, ApiError } from 'Errors';
import CandidateRepo from '../repository/candidate';
import { CandidateManager } from 'Managers'
import { NominationService } from 'Service';
import { HTTP_CODE_404, HTTP_CODE_204 } from '../routes/constants/HttpCodes';
const uuidv4 = require('uuid/v4');


//Get candidate details for a particular nomination
const getCandidateListByNominationId = async (req) => {
	try {
		const nomination_id = req.params.nominationId;
		const candidates = await CandidateRepo.getCandidateListByNomination(nomination_id);
		if (!_.isEmpty(candidates)) {
			return CandidateManager.mapToCandidateModel(candidates)
		} else {
			throw new ApiError("Candidates not found", HTTP_CODE_204);
		}
	} catch (error) {
		throw new ServerError("server error", HTTP_CODE_404);
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
			throw new ApiError("Candidates not found", HTTP_CODE_204);
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
	try {
		const candidateData = req.body;
		const candidateId = req.params.candidateId;
		if (isCandidateExists(candidateId)){
			const candidate = { 'id': candidateId, 'fullName': candidateData.fullName, 'preferredName': candidateData.preferredName, 'nic': candidateData.nic, 'dateOfBirth': candidateData.dateOfBirth, 'gender': candidateData.gender, 'address': candidateData.address, 'occupation': candidateData.occupation, 'electoralDivisionName': candidateData.electoralDivisionName, 'electoralDivisionCode': candidateData.electoralDivisionCode, 'counsilName': candidateData.counsilName };
			return await CandidateRepo.updateCandidate(candidate);
		}
	} catch (error) {
		throw new ServerError("server error", HTTP_CODE_404);
	}
}

/**
 * method to verify the certain candidate exists before we do an update.
 * @param {*} candidateId 
 */
const isCandidateExists = async (candidateId) => {
	try {
		const candidate = await CandidateRepo.getCandidateById(candidateId);
		if (!_.isEmpty(candidate)){
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}



//Save candidate
const saveCandidateByNominationId = async (req) => {
	try {
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
		const now = new Date(dateOfBirth).getTime();
		const nomination = await NominationService.validateNominationId(nominationId);
		if (!_.isEmpty(nomination)) {
			const candidateData = { 'id': id, 'fullName': fullName, 'preferredName': preferredName, 'nic': nic, 'dateOfBirth': now, 'gender': gender, 'address': address, 'occupation': occupation, 'electoralDivisionName': electoralDivisionName, 'electoralDivisionCode': electoralDivisionCode, 'counsilName': counsilName, 'nominationId': nominationId };
			return await CandidateRepo.createCandidate(candidateData);
		} else {
			throw new ApiError("Nomination not found", HTTP_CODE_204);
		}
	} catch (error) {
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
	} catch (error) {
		throw new ServerError("server error", HTTP_CODE_404);
	}
};



export default {
	getCandidateListByNominationId,
	saveCandidateByNominationId,
	getCandidateByNominationId,
	saveCandidateSupportDocsByCandidateId,
	updateCandidateDataById
}