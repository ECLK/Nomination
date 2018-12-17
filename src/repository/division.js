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

export default {
    fetchDivisionsByElectionId,
}