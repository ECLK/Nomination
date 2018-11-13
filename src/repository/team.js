import { DBError } from 'Errors';
import { DbConnection } from './dataSource';


const TEAM_DATA_SELECT_QUERY = `SELECT * FROM Teams WHERE team_id = :id`;

const fetchTeamById = (userId) => {
  const params = { id: userId };
  console.log("params",params);
  return DbConnection()
    .query(TEAM_DATA_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};


export default {
  fetchTeamById
}