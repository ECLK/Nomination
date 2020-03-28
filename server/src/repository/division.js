import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';

// common query
const DIVISION_INSERT_BASE_QUERY = `INSERT INTO DIVISION_CONFIG VALUES `;
const DIVISION_COLUMN_ORDER = ['ID', 'NAME', 'CODE', 'NO_OF_CANDIDATES', 'MODULE_ID'];

/**
 * Get divisions by electon-id.
 * tables: 'DIVISION_CONFIG', 'DIVISION_CONFIG_DATA'
 * @param {id} electionId 
 */

const DIVISIONS_BY_ELECTION_ID_SELECT_QUERY = `SELECT
	dc.ID as division_id,
	dc.NAME as division_name,
	dc.CODE as division_code,
	dc.NO_OF_CANDIDATES as division_no_of_candidates,
	dc.MODULE_ID as division_module_id,
	e.ID as division_election_id,
	dc.ID as division_config_id
FROM
	DIVISION_CONFIG dc
	LEFT JOIN ELECTION e ON dc.MODULE_ID = e.MODULE_ID
WHERE
	e.ID = :id`;

const fetchDivisionsByElectionId = (electionId) => {
	const params = { id: electionId };
	return DbConnection()
		.query(DIVISIONS_BY_ELECTION_ID_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			throw new DBError(error);
		});
};

const DIVISION_DATA_BY_DIVISION_ID_SELECT_QUERY = `SELECT 
DC.ID AS DIVISION_ID,
DC.NAME AS DIVISION_NAME,
N.TEAM_ID AS PARTY_id,
IF(CD.CANDIDATE_CONFIG_ID="2",CD.ID,NULL) AS CANDIDATE_id,
IF(CD.CANDIDATE_CONFIG_ID="2",CD.VALUE,NULL) AS CANDIDATE_name
FROM DIVISION_CONFIG DC 
LEFT JOIN NOMINATION N ON DC.ID = N.DIVISION_CONFIG_ID
LEFT JOIN CANDIDATE_DATA CD ON N.ID = CD.NOMINATION_ID
 WHERE DC.ID = :id
 AND CD.CANDIDATE_CONFIG_ID = "2"`;

const fetchDivisionDataByDivisionId = (divisionId) => {
	const params = { id: divisionId };
	return DbConnection()
		.query(DIVISION_DATA_BY_DIVISION_ID_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			throw new DBError(error);
		});
};


const DIVISION_INSERT_QUERY = `INSERT INTO DIVISION_CONFIG 
	(ID, NAME, CODE, NO_OF_CANDIDATES, MODULE_ID) 
VALUES 
	(:id, :name, :code, :no_of_candidates, :module_id)`;
/**
 *
 * @param id : Bigint
 * @param name : String
 * @returns {Promise.<T>}
 */
const createDivision = (id, name, code, no_of_candidates, module_id) => {
  const params = { id: id, name: name, code: code, no_of_candidates: no_of_candidates, module_id: module_id};
  return DbConnection()
    .query(DIVISION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};



/**
 * Same can be used to insert single and multiple division too,
 * we should pass list of divisions(division) to insert multiple divisions
 * @param divisions :Array of divisions
 * @returns {Promise.<T>}
 */
const insertDivisions = (divisions) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(DIVISION_INSERT_BASE_QUERY, divisions),
    {
      replacements: formatDataToBulkInsert(divisions, DIVISION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};


const DIVISION_SELECT_QUERY = `SELECT 
	ID AS division_id, 
	NAME AS division_name, 
	CODE AS division_code, 
	NO_OF_CANDIDATES AS division_no_of_candidates, 
	MODULE_ID AS division_module_id 
FROM 
	DIVISION_CONFIG 
WHERE 
	ID = :id`;
const fetchDivisionById = (divisionId) => {
  const params = { id: divisionId };
  return DbConnection()
    .query(DIVISION_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};


/**
 * Get divisions with nomination data
 * 
 */
const DIVISIONS_WITH_NOMINATION_SELECT_QUERY = `SELECT 
N.DIVISION_CONFIG_ID AS division_id,
DC.NAME AS division_name,
DC.CODE AS division_code,
DC.NO_OF_CANDIDATES AS division_no_of_candidates,
N.ELECTION_ID AS division_election_id,
N.TEAM_ID AS division_team_id,
N.ID AS nomination_id,
N.STATUS AS nomination_status,
P.STATUS AS nomination_paymentStatus,
IF(CC.ID<>' ',COUNT(C.ID),0) AS division_current_candidate_count
FROM NOMINATION N LEFT JOIN DIVISION_CONFIG DC ON N.DIVISION_CONFIG_ID=DC.ID
LEFT JOIN CANDIDATE_DATA C ON N.ID=C.NOMINATION_ID
LEFT JOIN CANDIDATE_CONFIG CC ON C.CANDIDATE_CONFIG_ID = CC.ID
LEFT JOIN PAYMENT P ON N.ID=P.NOMINATION_ID
WHERE N.ELECTION_ID=:election_id  AND N.TEAM_ID=:team_id AND N.DIVISION_CONFIG_ID=:divisionId GROUP BY N.ID,CC.ID`;

const DIVISIONS_WITH_NOMINATION_SELECT_QUERY_ALL = `SELECT 
N.DIVISION_CONFIG_ID AS division_id,
DC.NAME AS division_name,
DC.CODE AS division_code,
DC.NO_OF_CANDIDATES AS division_no_of_candidates,
N.ELECTION_ID AS division_election_id,
N.TEAM_ID AS division_team_id,
N.ID AS nomination_id,
N.STATUS AS nomination_status,
P.STATUS AS nomination_paymentStatus,
IF(CC.ID<>' ',COUNT(C.ID),0) AS division_current_candidate_count
FROM NOMINATION N LEFT JOIN DIVISION_CONFIG DC ON N.DIVISION_CONFIG_ID=DC.ID
LEFT JOIN CANDIDATE_DATA C ON N.ID=C.NOMINATION_ID
LEFT JOIN CANDIDATE_CONFIG CC ON C.CANDIDATE_CONFIG_ID = CC.ID
LEFT JOIN PAYMENT P ON N.ID=P.NOMINATION_ID
WHERE N.ELECTION_ID=:election_id  AND N.TEAM_ID=:team_id GROUP BY N.ID,CC.ID`;

const fetchDivisionsWithNomination = (electionId, teamId,divisionId) => {
	const params = { election_id: electionId, team_id: teamId,divisionId: divisionId };
	if(params.divisionId==='all'){
		return DbConnection()
		.query(DIVISIONS_WITH_NOMINATION_SELECT_QUERY_ALL, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			console.log(error);
			throw new DBError(error);
		});
	}else{
		return DbConnection()
		.query(DIVISIONS_WITH_NOMINATION_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			console.log(error);
			throw new DBError(error);
		});
	}
	
}


const insertDivisionsByModuleId = (divisions) => {
	return DbConnection()
		.query(formatQueryToBulkInsert(DIVISION_INSERT_BASE_QUERY, divisions),
			{
				replacements: formatDataToBulkInsert(divisions, DIVISION_COLUMN_ORDER),
				type: DbConnection().QueryTypes.INSERT,
			}).then(() => {
				return divisions;
			}).catch((error) => {
				throw new DBError(error);
			});
};



export default {
  fetchDivisionById,
  createDivision,
	insertDivisions,
	fetchDivisionsByElectionId,
	fetchDivisionsWithNomination,
	insertDivisionsByModuleId,
	fetchDivisionDataByDivisionId
}


