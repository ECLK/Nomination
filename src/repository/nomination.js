import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const NOMINATION_SELECT_BY_TEAM_QUERY = `SELECT * FROM Nominations  where team_id = :team_id AND election_id = :election_id`;
const CANDIDATE_SELECT_BY_NOMINATION_QUERY = `SELECT * FROM Candidate  where nomination_id = :nomination_id`;


const FetchNominationByTeam = (team_id,election_id) => {
  const params = { team_id: team_id, election_id:election_id };
  return DbConnection()
    .query(NOMINATION_SELECT_BY_TEAM_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

const FetchNominationCandidateListByNominationId = (nomination_id) => {
  const params = {nomination_id: nomination_id};
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
    FetchNominationByTeam,
    FetchNominationCandidateListByNominationId
}