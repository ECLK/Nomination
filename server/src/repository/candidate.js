import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';
const uuidv4 = require('uuid/v4');


const CANDIDATE_BY_NOMINATION_SELECT_QUERY = `SELECT CD.ID AS CANDIDATE_ID,
												CD.CANDIDATE_CONFIG_ID AS CANDIDATE_CONFIG_ID,
												CD.VALUE AS CANDIDATE_VALUE,
												CC.KEY_NAME AS CANDIDATE_KEY_NAME
												FROM CANDIDATE_DATA CD
												RIGHT JOIN CANDIDATE_CONFIG CC ON CD.CANDIDATE_CONFIG_ID=CC.ID
												WHERE CD.NOMINATION_ID = :nomination_id ORDER BY CD.ID` ;

const CANDIDATE_BY_CANDIDATE_ID_SELECT_QUERY = `SELECT CD.ID AS CANDIDATE_ID,
												CD.CANDIDATE_CONFIG_ID AS CANDIDATE_CONFIG_ID,
												CD.VALUE AS CANDIDATE_VALUE,
												CC.KEY_NAME AS CANDIDATE_KEY_NAME
												FROM CANDIDATE_DATA CD
												RIGHT JOIN CANDIDATE_CONFIG CC ON CD.CANDIDATE_CONFIG_ID=CC.ID
												WHERE CD.NOMINATION_ID = :nominationId AND CD.ID = :candidateId`;

const CANDIDATE_INSERT_QUERY = `INSERT INTO CANDIDATE (ID, FULL_NAME, PREFERRED_NAME, NIC, DATE_OF_BIRTH, GENDER, ADDRESS, OCCUPATION, ELECTORAL_DIVISION_NAME, ELECTORAL_DIVISION_CODE, COUNSIL_NAME, NOMINATION_ID) 
							  VALUES (:id, :fullName,:preferredName, :nic, :dateOfBirth, :gender, :address,:occupation, :electoralDivisionName, :electoralDivisionCode, :counsilName , :nominationId)`;
					
const CANDIDATE_BY_CANDIDATE_ID_DELETE_QUERY = `DELETE FROM CANDIDATE_DATA WHERE ID = :candidateId`;
const NOMINATION_STATUS_UPDATE_QUERY = `UPDATE NOMINATION 
                                SET 
                                STATUS = "DRAFT"
                                WHERE 
                                ID = :nominationId`; 						  

const CANDIDATE_DELETE_QUERY = `DELETE FROM CANDIDATE_DATA WHERE ID = :candidateId`;
const CANDIDATE_DATA_INSERT_BASE_QUERY = `INSERT INTO CANDIDATE_DATA (ID,CANDIDATE_CONFIG_ID,VALUE,NOMINATION_ID) VALUES `
const CANDIDATE_DATA_COLUMN_ORDER = ['id', 'candidateConfigId','value','nominationId'];
															  

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

const fetchCandidateByNomination = (params) => {
	return DbConnection()
		.query(CANDIDATE_BY_CANDIDATE_ID_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
}

const deleteCandidate = (candidateId) => {
	const params = { candidateId: candidateId };
	return DbConnection()
		.query(CANDIDATE_BY_CANDIDATE_ID_DELETE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.DELETE,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
}

const createCandidate = (candidateData,transaction) => {
	console.log("candidateData",candidateData);
	const params = candidateData;
	return DbConnection()
		.query(CANDIDATE_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT,
				transaction
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

//Update nomination status to DRAFT if any candidate added
const updateNominationStatus = (nominationId,transaction) => {
	const params = { nominationId: nominationId };
	return DbConnection()
		.query(NOMINATION_STATUS_UPDATE_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.UPDATE,
				transaction
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};

/**
 * save candidate data
 * @returns {Promise.<T>}
 */
const saveCandidate = async (candidateId,nominationId,data,from, transaction) => {
	const params = {candidateId:candidateId};

	if(candidateId == undefined){
		console.log("from",from);
		if(from == "form"){
			var uuid2 = uuidv4();
			data = data.map((record) => {
				record.nominationId = nominationId;
				record.id = uuid2;
				return record;
			});
		}else{
			data = data.map((record) => {
				var uuid = uuidv4();
				record.map((val) => {
					val.id = uuid
					val.nominationId = nominationId;
				})
				return record;
			});
		}
	}else{
		data = data.map((record) => {
			record.nominationId = nominationId;
			record.id = candidateId
			return record;
		});
	}
	if(candidateId !== undefined){
		await  DbConnection()
		.query(CANDIDATE_DELETE_QUERY,
		  {
			replacements: params,
			type: DbConnection().QueryTypes.DELETE,
			transaction
		  }).catch((error) => {
			throw new DBError(error);
		  });
	}
	
	if( data instanceof Array && data.length > 0){
		try {
			if(candidateId){
					return DbConnection()
					.query(formatQueryToBulkInsert(CANDIDATE_DATA_INSERT_BASE_QUERY, data),
					  {
						replacements: formatDataToBulkInsert(data, CANDIDATE_DATA_COLUMN_ORDER),
						type: DbConnection().QueryTypes.INSERT,
						transaction,
					  }).catch((error) => {
						 throw new DBError(error);
					   });
			}else{
				if(from == "form"){
					return DbConnection()
					.query(formatQueryToBulkInsert(CANDIDATE_DATA_INSERT_BASE_QUERY, data),
					  {
						replacements: formatDataToBulkInsert(data, CANDIDATE_DATA_COLUMN_ORDER),
						type: DbConnection().QueryTypes.INSERT,
						transaction,
					  }).catch((error) => {
						 throw new DBError(error);
					   });
				}else{
					for(let i=0;i<data.length;i++){
						 DbConnection()
						.query(formatQueryToBulkInsert(CANDIDATE_DATA_INSERT_BASE_QUERY, data[i]),
						  {
							replacements: formatDataToBulkInsert(data[i], CANDIDATE_DATA_COLUMN_ORDER),
							type: DbConnection().QueryTypes.INSERT,
							transaction,
						  }).catch((error) => {
							 throw new DBError(error);
						   });
					}
				}	
			}
		
		}catch (e){
			console.log(e);
		}
	  }
  };

 
export default {
	getCandidateListByNomination,
	createCandidate,
	fetchCandidateByNomination,
	getCandidateById,
	updateCandidate,
	getCandidateConfigByModuleId,
	insertCandidateConfigByModuleId,
	deleteCandidate,
	updateNominationStatus,
	saveCandidate
}
