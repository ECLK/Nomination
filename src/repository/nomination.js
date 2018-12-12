import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const NOMINATION_BY_TEAM_SELECT_QUERY = `SELECT * FROM nomination WHERE team_id = :team_id AND election_id = :election_id`;


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

const NOMINATION_BY_STATUS_APPROVE_SELECT_QUERY =`SELECT
n.ID as nomination_id,
n.STATUS as nomination_status,
n.TEAM_ID as nomination_team_id,
n.ELECTION_ID as nomination_election_id,
dc.NAME as division_name,
dc.CODE as division_code,
dc.NO_OF_CANDIDATES as division_no_of_candidates
FROM NOMINATION n
	LEFT JOIN DIVISION_CONFIG_DATA dcd ON n.DIVISION_CONFIG_DATA_ID = dcd.DIVISION_CONFIG_ID
	LEFT JOIN DIVISION_CONFIG dc ON dc.ID = dcd.DIVISION_CONFIG_ID
WHERE
	n.STATUS = 'APPROVE' AND n.TEAM_ID = :team_id AND dcd.SELECT_FLAG = TRUE AND n.ELECTION_ID = :election_id`;

const fetchNominationByStatusApprove = (election_id, team_id) => {
	const params = { election_id: election_id, team_id: team_id };
	return DbConnection()
		.query(NOMINATION_BY_STATUS_APPROVE_SELECT_QUERY, {
				replacements: params,
				type: DbConnection().QueryTypes.SELECT,
			}).catch((error) => {
				throw new DBError(error);
			});
};

export default {
	fetchNominationByTeam,
	fetchNominationByStatusApprove,
}