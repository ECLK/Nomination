import { DBError } from 'Errors';
import { DbConnection } from './dataSource';

const NOMINATION_BY_TEAM_SELECT_QUERY = `SELECT * FROM nomination WHERE team_id = :team_id AND election_id = :election_id`;
const CANDIDATE_SELECT_BY_NOMINATION_QUERY = `SELECT * FROM Candidate  where nomination_id = :nomination_id`;


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

const FetchNominationCandidateListByNominationId = (nomination_id) => {
  const params = { nomination_id: nomination_id };
  return DbConnection()
    .query(CANDIDATE_SELECT_BY_NOMINATION_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
        throw new DBError(error);
      });
}

export default {
  fetchNominationByTeam,
  FetchNominationCandidateListByNominationId
}