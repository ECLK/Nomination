import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const NOMINATION_BY_TEAM_SELECT_QUERY = `SELECT * FROM nomination WHERE team_id = :team_id AND election_id = :election_id`;
const NOMINATION_BY_NOMINATION_ID_SELECT_QUERY = `SELECT * FROM NOMINATION WHERE ID = :nominationId`;



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
  fetchNominationByNominationId,
}