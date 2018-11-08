import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const USER_SELECT_QUERY = `SELECT * FROM USER WHERE ID = :id`;

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


export default {
  fetchUserById
}