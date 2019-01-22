import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const USER_SELECT_QUERY = `SELECT ID AS user_id, NAME AS user_name FROM USER WHERE ID = :id`;
const USER_INSERT_QUERY = `INSERT INTO USER (ID, NAME) VALUES (:id, :name)`;
const USER_INSERT_BASE_QUERY = `INSERT INTO USER VALUES `;
const USER_COLUMN_ORDER = ['ID', 'NAME'];

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

/**
 *
 * @param id : Bigint
 * @param name : String
 * @returns {Promise.<T>}
 */
const createUser = (id, name) => {
  const params = { id: id, name : name};
  return DbConnection()
    .query(USER_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * Same can be used to insert single and multiple user too,
 * we should pass list of users(user) to insert multiple users
 * @param users :Array of users
 * @returns {Promise.<T>}
 */
const insertUsers = (users) => {
  return DbConnection()
  .query(formatQueryToBulkInsert(USER_INSERT_BASE_QUERY, users),
    {
      replacements: formatDataToBulkInsert(users, USER_COLUMN_ORDER),
      type: DbConnection().QueryTypes.INSERT,
    }).catch((error) => {
    throw new DBError(error);
  });
};


export default {
  fetchUserById,
  createUser,
  insertUsers,
}