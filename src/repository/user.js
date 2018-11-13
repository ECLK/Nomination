import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { exists } from 'fs';


const USER_SELECT_QUERY = `SELECT ID AS user_id, NAME AS user_name FROM USER WHERE ID = :id`;
const USER_INSERT_QUERY = `INSERT INTO USER (ID, NAME) VALUES (:id, :name)`;

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




export default {
  fetchUserById,
  createUser,
}