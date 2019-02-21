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
