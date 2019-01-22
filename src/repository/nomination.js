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



const NOMINATION_BY_STATUS_SELECT_QUERY =`SELECT
ID AS nomination_id,
STATUS as nomination_status,
TEAM_ID as nomination_team_id,
ELECTION_ID as nomination_election_id,
DIVISION_CONFIG_DATA_ID as nomination_division_config_data_id
FROM 
	NOMINATION
WHERE
	STATUS = :status AND TEAM_ID = :team_id AND ELECTION_ID = :election_id`;

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



const NOMINATION_BY_NOMINATION_ID_SELECT_QUERY = `SELECT * FROM NOMINATION WHERE ID = :nominationId`;

const fetchNominationByNominationId = (nominationId) => {
  const params = { nominationId: nominationId };
  return DbConnection()
    .query(NOMINATION_BY_NOMINATION_ID_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
};

export default {
	fetchNominationByTeam,
	fetchNominationByStatus,
  fetchNominationByNominationId,
}
