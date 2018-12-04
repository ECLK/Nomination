import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { exists } from 'fs';
// const uuidv4 = require('uuid/v4');
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const USER_SELECT_QUERY = `SELECT ID AS user_id, NAME AS user_name FROM USER WHERE ID = :id`;
const NOMINATION_INSERT_BASE_QUERY = `INSERT INTO nomination (nomination_id, team_id, election_id, division_id, status) VALUES `;
const NOMINATION_COLUMN_ORDER = ['nomination_id', 'team_id', 'election_id', 'division_id', 'status'];


const fetchUserById = (userId) => {
  const params = { id: userId };
  return DbConnection()
    .query(USER_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
}; 



const createNominationRows = (nominations) => { 
  console.log("--jjjjjjjjjjjjjjjj->",nominations);

  return DbConnection()
  .query(formatQueryToBulkInsert(NOMINATION_INSERT_BASE_QUERY, nominations),
    {
      replacements: formatDataToBulkInsert(nominations, NOMINATION_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};


export default {
  fetchUserById,
  createNominationRows,
}