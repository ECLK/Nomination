import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const ACTIVE_ELECTION_SELECT_QUERY = `SELECT ID AS activeElection_id, NAME AS activeElection_name, MODULE_ID as activeElection_module_id FROM ELECTION WHERE ID = :id`;
const ACTIVE_ELECTION_INSERT_QUERY = `INSERT INTO ELECTION (ID, NAME) VALUES (:id, :name, :module_id)`;
const ACTIVE_ELECTION_INSERT_BASE_QUERY = `INSERT INTO ELECTION VALUES `;
const ACTIVE_ELECTION_COLUMN_ORDER = ['ID', 'NAME', 'MODULE_ID'];

const fetchActiveElectionById = (activeElectionId) => {
  const params = { id: activeElectionId };
  return DbConnection()
    .query(ACTIVE_ELECTION_SELECT_QUERY,
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
const createActiveElection = (id, name) => {
  const params = { id: id, name : name, mudule_id: module_id};
  return DbConnection()
    .query(ACTIVE_ELECTION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * Same can be used to insert single and multiple activeElection too,
 * we should pass list of activeElections(activeElection) to insert multiple activeElections
 * @param activeElections :Array of activeElections
 * @returns {Promise.<T>}
 */

const insertActiveElections = (activeElections) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(ACTIVE_ELECTION_INSERT_BASE_QUERY, activeElections),
    {
      replacements: formatDataToBulkInsert(activeElections, ACTIVE_ELECTION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};


export default {
  fetchActiveElectionById,
  createActiveElection,
  insertActiveElections,
}