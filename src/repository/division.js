import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const DIVISION_SELECT_QUERY = `SELECT ID AS division_id, NAME AS division_name, CODE AS division_code, NO_OF_CANDIDATES AS division_no_of_candidates, MODULE_ID AS division_module_id FROM DIVISION_CONFIG WHERE ID = :id`;
const DIVISION_INSERT_QUERY = `INSERT INTO DIVISION_CONFIG (ID, NAME, CODE, NO_OF_CANDIDATES, MODULE_ID) VALUES (:id, :name, :code, :no_of_candidates, :module_id)`;
const DIVISION_INSERT_BASE_QUERY = `INSERT INTO DIVISION_CONFIG VALUES `;
const DIVISION_COLUMN_ORDER = ['ID', 'NAME'];

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
	dcd.ELECTION_ID as division_election_id,
	dcd.DIVISION_CONFIG_ID as division_config_id,
	dcd.SELECT_FLAG as division_status
FROM
	DIVISION_CONFIG dc
	LEFT JOIN DIVISION_CONFIG_DATA dcd ON dcd.DIVISION_CONFIG_ID = dc.ID
WHERE
	dcd.ELECTION_ID = :id AND dcd.SELECT_FLAG = TRUE`;

/**
 * Get divisions with nomination data
 * tables: NOMINATION_ALLOWED_TEAM
 */
const DIVISIONS_WITH_NOMINATION_SELECT_QUERY = `SELECT
	nat.DIVISION_ID AS division_id,
	dc.NAME AS division_name,
	dc.CODE AS division_code,
	dc.NO_OF_CANDIDATES AS division_no_of_candidates,
	nat.ELECTION_ID AS division_election_id,
	nat.TEAM_ID AS division_team_id,
	n.ID AS nomination_id,
	n.STATUS AS nomination_status
FROM 
	NOMINATION_ALLOWED_TEAM nat
	INNER JOIN DIVISION_CONFIG dc ON dc.ID = nat.DIVISION_ID 
	INNER JOIN DIVISION_CONFIG_DATA dca ON dca.DIVISION_CONFIG_ID = dc.ID
	LEFT JOIN NOMINATION n ON n.DIVISION_CONFIG_DATA_ID = dca.DIVISION_CONFIG_ID
WHERE
	nat.ELECTION_ID = :election_id 
	AND nat.TEAM_ID = :team_id 
	AND nat.SELECT_FLAG = TRUE
	AND dca.SELECT_FLAG = TRUE`;


const fetchDivisionsByElectionId = (electionId) => {
	const params = { id: electionId};
	return DbConnection()
		.query(DIVISIONS_BY_ELECTION_ID_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			throw new DBError(error);
		});
};

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


const fetchDivisionsWithNomination = (electionId, teamId) => {
	const params = { election_id: electionId, team_id: teamId };
	return DbConnection()
		.query(DIVISIONS_WITH_NOMINATION_SELECT_QUERY, {
			replacements: params,
			type: DbConnection().QueryTypes.SELECT,
		}).catch((error) => {
			console.log(error);
			throw new DBError(error);
		});
}


export default {
  fetchDivisionById,
  createDivision,
	insertDivisions,
	fetchDivisionsByElectionId,
	fetchDivisionsWithNomination,
}

