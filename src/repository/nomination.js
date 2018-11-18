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

export default {
  fetchNominationByTeam,
}