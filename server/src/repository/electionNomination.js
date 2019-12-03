import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const ELECCTION_NOMINATION_SELECT_QUERY = `SELECT ID AS electionNomination_id, STATUS AS electionNomination_status, TEAM_ID AS electionNomination_team_id, ELECTION_ID AS electionNomination_election_id, ELECTION_ID AS electionNomination_division_condig_data_id FROM NOMINATION WHERE ID = :id`;
const ELECCTION_NOMINATION_INSERT_QUERY = `INSERT INTO NOMINATION (ID, NAME, STATUS, TEAM_ID, ELECTION_ID, DIVISION_CONFIG_DATA_ID) VALUES (:id, :status, :team_id, :election_id, :division_condig_data_id)`;
const ELECCTION_NOMINATION_INSERT_BASE_QUERY = `INSERT INTO NOMINATION VALUES `;
const ELECCTION_NOMINATION_COLUMN_ORDER = ['ID', 'NAME'];

const fetchElectionNominationById = (electionNominationId) => {
  const params = { id: electionNominationId };
  return DbConnection()
    .query(ELECCTION_NOMINATION_SELECT_QUERY,
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
const createElectionNomination = (id, status, team_id, election_id, division_condig_data_id) => {
  const params = { id: id, status: status, team_id: team_id, election_id: election_id, division_condig_data_id: division_condig_data_id};
  return DbConnection()
    .query(ELECCTION_NOMINATION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * Same can be used to insert single and multiple electionNomination too,
 * we should pass list of electionNominations(electionNomination) to insert multiple electionNominations
 * @param electionNominations :Array of electionNominations
 * @returns {Promise.<T>}
 */
const insertElectionNominations = (electionNominations) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(ELECCTION_NOMINATION_INSERT_BASE_QUERY, electionNominations),
    {
      replacements: formatDataToBulkInsert(electionNominations, ELECCTION_NOMINATION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};


export default {
  fetchElectionNominationById,
  createElectionNomination,
  insertElectionNominations,
}


