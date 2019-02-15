import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const CANDIDATE_BY_NOMINATION_SELECT_QUERY = `SELECT ID AS CANDIDATE_ID,
                                              FULL_NAME AS CANDIDATE_FULL_NAME,
                                              PREFERRED_NAME AS CANDIDATE_PREFERRED_NAME,
                                              OCCUPATION AS CANDIDATE_OCCUPATION,
                                              NIC AS CANDIDATE_NIC,
                                              DATE_OF_BIRTH AS CANDIDATE_DATE_OF_BIRTH,
                                              GENDER AS CANDIDATE_GENDER,
                                              ADDRESS AS CANDIDATE_ADDRESS,
                                              ELECTORAL_DIVISION_NAME AS CANDIDATE_ELECTORAL_DIVISION_NAME,
                                              ELECTORAL_DIVISION_CODE AS CANDIDATE_ELECTORAL_DIVISION_CODE,
                                              COUNSIL_NAME AS CANDIDATE_COUNSIL_NAME,
                                              NOMINATION_ID AS CANDIDATE_NOMINATION_ID
                                             FROM CANDIDATE WHERE NOMINATION_ID = :nomination_id`;

const CANDIDATE_BY_CANDIDATE_ID_SELECT_QUERY = `SELECT ID AS CANDIDATE_ID,
                                              FULL_NAME AS CANDIDATE_FULL_NAME,
                                              PREFERRED_NAME AS CANDIDATE_PREFERRED_NAME,
                                              OCCUPATION AS CANDIDATE_OCCUPATION,
                                              NIC AS CANDIDATE_NIC,
                                              DATE_OF_BIRTH AS CANDIDATE_DATE_OF_BIRTH,
                                              GENDER AS CANDIDATE_GENDER,
                                              ADDRESS AS CANDIDATE_ADDRESS,
                                              ELECTORAL_DIVISION_NAME AS CANDIDATE_ELECTORAL_DIVISION_NAME,
                                              ELECTORAL_DIVISION_CODE AS CANDIDATE_ELECTORAL_DIVISION_CODE,
                                              COUNSIL_NAME AS CANDIDATE_COUNSIL_NAME,
                                              NOMINATION_ID AS CANDIDATE_NOMINATION_ID
                                             FROM CANDIDATE WHERE NOMINATION_ID = :nominationId AND ID = :candidateId`;

const CANDIDATE_INSERT_QUERY = `INSERT INTO CANDIDATE (ID, FULL_NAME, PREFERRED_NAME, NIC, DATE_OF_BIRTH, GENDER, ADDRESS, OCCUPATION, ELECTORAL_DIVISION_NAME, ELECTORAL_DIVISION_CODE, COUNSIL_NAME, NOMINATION_ID) 
							  VALUES (:id, :fullName,:preferredName, :nic, :dateOfBirth, :gender, :address,:occupation, :electoralDivisionName, :electoralDivisionCode, :counsilName , :nominationId)`;
							  


const getCandidateListByNomination = (nomination_id) => {
	const params = { nomination_id: nomination_id };
	return DbConnection()
		.query(CANDIDATE_BY_NOMINATION_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
}

const getCandidateByNomination = (params) => {
	return DbConnection()
		.query(CANDIDATE_BY_CANDIDATE_ID_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
}

const createCandidate = (candidateData) => {
	const params = candidateData;
	return DbConnection()
		.query(CANDIDATE_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};


const CANDIDATE_BY_ID_UPDATE_QUERY = `UPDATE CANDIDATE
SET 
	FULL_NAME = :fullName,
	PREFERRED_NAME = :preferredName,
	NIC = :nic,
	DATE_OF_BIRTH = :dateOfBirth,
	GENDER = :gender,
	ADDRESS = :address,
	OCCUPATION = :occupation, 
	ELECTORAL_DIVISION_NAME = :electoralDivisionName,
	ELECTORAL_DIVISION_CODE = :electoralDivisionCode,
	COUNSIL_NAME = :counsilName
WHERE ID = :id`;
const updateCandidate = (candidateData) => {
	const params = candidateData;
	return DbConnection()
		.query(CANDIDATE_BY_ID_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.UPDATE
			}).then(() => {
				return candidateData;
			}).catch((error) => {
				throw new DBError(error);
			});
}

const CANDIDATE_BY_ID_SELECT_QUERY = `SELECT * FROM CANDIDATE WHERE ID = :id`;
const getCandidateById = (candidateId) => {
	const params = { id: candidateId };
	return DbConnection()
		.query(CANDIDATE_BY_ID_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT
			}).catch((error) => {
				throw new DBError(error);
			})
}

const CANDIDATE_CONFIG_BY_MODULE_ID_SELECT_QUERY = `SELECT * FROM CANDIDATE_CONFIG WHERE MODULE_ID = :moduleId`;
const getCandidateConfigByModuleId = (moduleId) => {
	const params = { moduleId: moduleId };
	return DbConnection()
		.query(CANDIDATE_CONFIG_BY_MODULE_ID_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT
			}).catch((error) => {
				throw new DBError(error);
			});
}

const CANDIDATE_CONFIG_INSERT_QUERY = `INSERT INTO CANDIDATE_CONFIG
	(ID, FULL_NAME, PREFERRED_NAME, NIC, DATE_OF_BIRTH, GENDER, ADDRESS, OCCUPATION, ELECTORAL_DIVISION_NAME, ELECTORAL_DIVISION_CODE, COUNSIL_NAME, MODULE_ID)
VALUES
	(:id, :fullName, :preferredName, :nic, :dateOfBirth, :gender, :address, :occupation, :electoralDivisionName, :electoralDivisionCode, :counsilName, :moduleId)`;
const insertCandidateConfigByModuleId = (configData) => {
	const params = configData;
	return DbConnection()
		.query(CANDIDATE_CONFIG_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT
			}).then(() => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
}

export default {
	getCandidateListByNomination,
	createCandidate,
	getCandidateByNomination,
	getCandidateById,
	updateCandidate,
	getCandidateConfigByModuleId,
	insertCandidateConfigByModuleId
}
