import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const NOMINATION_BY_TEAM_SELECT_QUERY = `SELECT * FROM nomination WHERE team_id = :team_id AND election_id = :election_id`;

const NOMINATION_BY_NOMINATION_ID_SELECT_QUERY = `SELECT * FROM NOMINATION WHERE ID = :nominationId`;


const NOMINATION_BY_STATUS_SELECT_QUERY =`SELECT
																					N.ID AS nomination_id,
																					NA.STATUS AS nomination_status,
																					N.TEAM_ID AS nomination_team_id,
																					N.ELECTION_ID AS nomination_election_id,
																					N.DIVISION_CONFIG_DATA_ID AS nomination_division_config_data_id
																					FROM 
																						NOMINATION N LEFT JOIN NOMINATION_APPROVAL NA ON N.ID=NA.NOMINATION_ID
																					WHERE
																						NA.STATUS = :status AND N.TEAM_ID = :team_id AND N.ELECTION_ID = :election_id`;
const PENDING_NOMINATION_SELECT_QUERY_ALL = `SELECT 
																				N.ID AS nomination_id,
																				DC.NAME AS nomination_division_name,
																				N.TEAM_ID AS nomination_party,
																				C.ID AS candidate_id,
																				C.FULL_NAME AS candidate_name,
																				C.NIC AS candidate_nic,
																				C.OCCUPATION AS candidate_occupation,
																				C.ADDRESS AS candidate_address,
																				P.STATUS AS nomination_payment_status,
																				OBR.STATUS AS nomination_objection_status,
																				NA.STATUS AS nomination_approval_status,
																				NA.REVIEW_NOTE AS nomination_review_note
																				FROM NOMINATION N LEFT JOIN DIVISION_CONFIG DC ON N.DIVISION_CONFIG_ID = DC.ID
																				LEFT JOIN CANDIDATE C ON  N.ID = C.NOMINATION_ID 
																				LEFT JOIN PAYMENT P ON N.ID = P.NOMINATION_ID
																				LEFT JOIN OBJECTION O ON N.ID = O.NOMINATION_ID
																				LEFT JOIN OBJECTION_REVIEW  OBR ON O.ID = OBR.OBJECTION_ID
																				LEFT JOIN NOMINATION_APPROVAL NA ON N.ID = NA.NOMINATION_ID
																				WHERE ELECTION_ID=:electionId
																				AND N.STATUS=:status`;
const PENDING_NOMINATION_SELECT_QUERY = `SELECT 
																				N.ID AS nomination_id,
																				DC.NAME AS nomination_division_name,
																				N.TEAM_ID AS nomination_party,
																				C.ID AS candidate_id,
																				C.FULL_NAME AS candidate_name,
																				C.NIC AS candidate_nic,
																				C.OCCUPATION AS candidate_occupation,
																				C.ADDRESS AS candidate_address,
																				P.STATUS AS nomination_payment_status,
																				OBR.STATUS AS nomination_objection_status,
																				NA.STATUS AS nomination_approval_status,
																				NA.REVIEW_NOTE AS nomination_review_note
																				FROM NOMINATION N LEFT JOIN DIVISION_CONFIG DC ON N.DIVISION_CONFIG_ID = DC.ID
																				LEFT JOIN CANDIDATE C ON  N.ID = C.NOMINATION_ID 
																				LEFT JOIN PAYMENT P ON N.ID = P.NOMINATION_ID
																				LEFT JOIN OBJECTION O ON N.ID = O.NOMINATION_ID
																				LEFT JOIN OBJECTION_REVIEW  OBR ON O.ID = OBR.OBJECTION_ID
																				LEFT JOIN NOMINATION_APPROVAL NA ON N.ID = NA.NOMINATION_ID
																				WHERE ELECTION_ID=:electionId
																				AND N.STATUS=:status AND N.TEAM_ID = :teamId`;

const NOMINATION_STATUS_INSERT_QUERY = `INSERT INTO NOMINATION_APPROVAL (ID, APPROVED_BY, APPROVED_AT, UPDATED_AT, STATUS, REVIEW_NOTE, NOMINATION_ID) 
                              					VALUES (:id, :createdBy,:createdAt, :updatedAt, :status, :reviewNote, :nominationId)`;
const NOMINATION_APPROVE_DELETE_QUERY = `DELETE FROM NOMINATION_APPROVAL WHERE NOMINATION_ID = :nominationId AND STATUS='1ST-APPROVE' OR STATUS='REJECT' OR STATUS='2ND-APPROVE'`;
const PAYMENT_STATUS_SELECT_QUERY = `SELECT 
																			emcd.VALUE AS payment_status
																			FROM ELECTION e 
																			LEFT JOIN ELECTION_MODULE em ON em.ID=e.MODULE_ID
																			LEFT JOIN ELECTION_MODULE_CONFIG_DATA emcd ON em.ID=emcd.MODULE_ID
																			LEFT JOIN ELECTION_MODULE_CONFIG emc ON emc.ID=emcd.ELECTION_MODULE_CONFIG_ID
																			WHERE e.ID=:electionId AND emc.KEY_NAME='pay allowed rpp'`;
// uncomment this if something wrong with below code																			
// const NOMINATION_DATA_SELECT_QUERY = `SELECT N.ID AS nomination_id ,DC.NO_OF_CANDIDATES AS noOfCandidates,DC.NAME AS division_name,DC.ID AS division_id
// 																			FROM NOMINATION N 
// 																			LEFT JOIN DIVISION_CONFIG DC ON N.DIVISION_CONFIG_ID=DC.ID
// 																			WHERE 
// 																			N.ID=:nominationId`;
const NOMINATION_DATA_SELECT_QUERY = `SELECT N.ID AS nomination_id ,DC.NO_OF_CANDIDATES AS noOfCandidates,DC.NAME AS division_name,DC.ID AS division_id,EMCD.VALUE AS payPerCandidate
																			FROM NOMINATION N 
																			LEFT JOIN DIVISION_CONFIG DC ON N.DIVISION_CONFIG_ID=DC.ID 
																			LEFT JOIN ELECTION E ON N.ELECTION_ID=E.ID
																			LEFT JOIN ELECTION_MODULE EM ON E.MODULE_ID=EM.ID
																			LEFT JOIN ELECTION_MODULE_CONFIG_DATA EMCD ON EM.ID=EMCD.MODULE_ID
																			LEFT JOIN ELECTION_MODULE_CONFIG EMC  ON EMCD.ELECTION_MODULE_CONFIG_ID=EMC.ID
																			WHERE 
																			N.ID=:nominationId AND EMC.KEY_NAME=:keyName
																			GROUP BY EM.ID`;																			
																			
																			
const fetchNominationByTeam = (team_id, election_id) => {
	const params = { team_id: team_id, election_id: election_id };
	return DbConnection()
		.query(NOMINATION_BY_TEAM_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
};





const fetchNominationByStatus = (election_id, team_id, status) => {
	const params = { election_id: election_id, team_id: team_id, status: status };
	return DbConnection()
		.query(NOMINATION_BY_STATUS_SELECT_QUERY, {
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
};




const fetchNominationByNominationId = (nominationId,transaction) => {
  const params = { nominationId: nominationId };
  return DbConnection()
    .query(NOMINATION_BY_NOMINATION_ID_SELECT_QUERY,
      {
        replacements: params,
				type: DbConnection().QueryTypes.SELECT,
				transaction
      }).catch((error) => {
        throw new DBError(error);
      });
};

const fetchPendingNominationList = (params) => {
	if(params.teamId === 'All'){
		return DbConnection()
    .query(PENDING_NOMINATION_SELECT_QUERY_ALL,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
	}else{
		return DbConnection()
    .query(PENDING_NOMINATION_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });	}
  
}

const fetchNominationPaymentStatus = (params) => {
	
		return DbConnection()
    .query(PAYMENT_STATUS_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
			});	
		}

	const fetchNominationData = (params) => {

		return DbConnection()
		.query(NOMINATION_DATA_SELECT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});	
		}
		

	const createNominationStatus = async (nominationId, nominationData, transaction) => {
	const params = {nominationId:nominationId};
	await  DbConnection()
	.query(NOMINATION_APPROVE_DELETE_QUERY,
	{
	replacements: params,
	type: DbConnection().QueryTypes.DELETE,
	transaction
	}).catch((error) => {
	console.log(error);
	throw new DBError(error);
	});
	return DbConnection()
	.query(NOMINATION_STATUS_INSERT_QUERY,
	{
		replacements: nominationData,
		type: DbConnection().QueryTypes.INSERT,
		transaction
	}).then((results) => {
		return nominationData ;
	}).catch((error) => {
		throw new DBError(error);
	});
	};

export default {
	fetchNominationByTeam,
	fetchNominationByStatus,
	fetchNominationByNominationId,
	fetchPendingNominationList,
	createNominationStatus,
	fetchNominationPaymentStatus,
	fetchNominationData
}
