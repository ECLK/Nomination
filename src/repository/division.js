import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

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
	fetchDivisionsByElectionId,
	fetchDivisionsWithNomination,
}